<template>
  <div class="page-wrapper">
    <div class="top-menu">
      <template v-if="!confirmed">
        <div class="club-wrapper">
          <img class="club-icon" src="@/assets/images/bjk.png" alt="">
          <h2 class="club-name">Beşiktaş JK</h2>
        </div>
        <div class="options-wrapper">
          <Button big :disabled="selectedPlayerIds.length < 11" @click="confirm">Confirm</Button>
        </div>
      </template>
      <template v-else>
        <div class="confirmed-wrapper">
          <img class="confirmed-image" src="@/assets/images/confirmed.png" alt="">
          <h2 class="confirmed-text">Squad saved successfully</h2>
        </div>
      </template>
    </div>
    <div class="page-content">
      <div class="row">
        <div class="col-md-4 mt-3">
          <ShadowBox :title="!confirmed ? 'All Players' : ''" :empty="!loading && players.length == 0" emptyText="There are no players in this club">
            <template v-if="confirmed">
              <div class="confirmed-box">
                <img class="club-icon" src="@/assets/images/bjk.png" alt="">
                <h2 class="club-name">Beşiktaş JK</h2>
              </div>
            </template>
            <template v-else>
              <Player v-for="player in players" :key="player.id" :data="player" pickable @pick="onPlayerPicked($event)" @unpick="onPlayerUnPicked($event)" :picked="isPlayerPicked(player.id)" />
            </template>
          </ShadowBox>
        </div>
        <div class="col-md-4 mt-3">
          <ShadowBox title="Lineup" :empty="selectedPlayerIds.length == 0" emptyText="You haven’t selected any player for lineup yet.">
            <Player v-for="id in selectedPlayerIds" :substitution="getSubstitutionByPlayerId(id) ? 'out' : ''" :minute="getSubstitutionByPlayerId(id)?.minute" :key="id" :data="getPlayerById(id)" />
          </ShadowBox>
        </div>
        <div class="col-md-4 mt-3">
          <ShadowBox title="Substitutes" :empty="selectedPlayerIds.length < 11" emptyText="Please pick 11 players for lineup before creating any substitutions">
            <Player v-for="substitution in substitutions" substitution="in" :minute="substitution.minute" :key="substitution" :data="getPlayerById(substitution.inPlayer)" />
            <span class="add-substitution" v-if="selectedPlayerIds.length >= 11 && substitutions.length < 3 && !confirmed" @click="addSubstitution">+ Add Substitution</span>
          </ShadowBox>
          </div>
      </div>
    </div>
  </div>
  <AddSubstitution />
</template>

<script>
import { toRefs, onMounted, reactive } from 'vue'
import Button from '@/components/Button'
import ShadowBox from '@/components/ShadowBox'
import Player from '@/components/Player'
import AddSubstitution from '@/components/AddSubstitution'
import axios from 'axios'
import emitter from '@/helpers/eventHub'

export default {
  name: 'Home',
  components: {
    Button,
    ShadowBox,
    Player,
    AddSubstitution
  },
  setup() {
    const state = reactive({
      loading: false,
      players: [],
      selectedPlayerIds: [],
      substitutions: [],
      confirmed: false
    })

    onMounted(() => {
      state.loading = true;
      emitter.on('add.substitution', ({outPlayer, inPlayer, minute}) => {
        state.substitutions.push({ id: Math.random().toString(36).substring(7), outPlayer, inPlayer, minute})
      })
      axios.get('https://api.scoutium.com/api/clubs/4029/players?count=100')
        .then((res)=> {
          state.players = res.data.players
        }).finally(() => {
          state.loading = false
        })
    })

    const getPlayerById = (playerId) => {
      const player = state.players.find((p) => p.id == playerId)
      return player
    }

    const onPlayerPicked = (playerId) => {
      if(state.selectedPlayerIds.length >= 11) {
        alert('You can not select more than 11 players.')
        return null
      }
      state.selectedPlayerIds.push(playerId)
    }

    const onPlayerUnPicked = (playerId) => {
      const substitution = getSubstitutionByPlayerId(playerId);
      if(substitution) {
        state.substitutions = state.substitutions.filter((subst) => subst.id != substitution.id)
      }
      state.selectedPlayerIds = state.selectedPlayerIds.filter((a) => a !== playerId)
    }

    const isPlayerPicked = (playerId) => {
      return state.selectedPlayerIds.includes(playerId)
    }

    const addSubstitution = () => {
      const lineup = state.selectedPlayerIds.filter((id) => !getSubstitutionByPlayerId(id)).map((id) => getPlayerById(id))
      const availablePlayers = state.players.filter((player) => !isPlayerPicked(player.id) && !getSubstitutionByPlayerId(player.id))
      emitter.emit('open.substitution', {lineup, availablePlayers})
    }

    const getSubstitutionByPlayerId = (id) => {
      const subst = state.substitutions.find((subst) => subst.outPlayer == id || subst.inPlayer == id)
      return subst
    }
    
    const confirm = () => {
      state.confirmed = true
    }

    return {
      ...toRefs(state),
      getPlayerById,
      onPlayerPicked,
      onPlayerUnPicked,
      isPlayerPicked,
      emitter,
      addSubstitution,
      getSubstitutionByPlayerId,
      confirm
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  padding: 18px;
  .top-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .club-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      .club-icon {
        width: 32px;
        height: 32px;
      }
      .club-name {
        margin: 0;
        padding: 0;
        font-family: SofiaPro;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: $night-blue;
        margin-left: 8px;
      }
    }
    .confirmed-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      .confirmed-image {
        object-fit: contain;
        width: 40px;
        height: 40px;
      }
      .confirmed-text {
        padding: 0;
        margin: 0;
        font-family: SofiaPro;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: left;
        color: $night-blue;
        margin-left: 10px;
      }
    }
  }

  .confirmed-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .club-icon {
      width: 64px;
      height: 64px;
      margin: 0 17px 8px;
      object-fit: contain;
    }
    .club-name {
      font-family: SofiaPro;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: $night-blue;
    }
  }
  .add-substitution {
    font-family: SofiaPro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: $aqua-green;
    cursor: pointer;
  }
}
</style>