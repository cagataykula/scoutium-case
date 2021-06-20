<template>
  <div class="page-wrapper">
    <div class="top-menu">
      <div class="club-wrapper">
        <img class="club-icon" src="@/assets/images/bjk.png" alt="">
        <h2 class="club-name">Beşiktaş JK</h2>
      </div>
      <div class="options-wrapper">
        <Button>Confirm</Button>
      </div>
    </div>
    <div class="page-content">
      <div class="row">
        <div class="col-md-4 mt-3">
          <ShadowBox title="All Players" :empty="!loading && players.length == 0" emptyText="There are no players in this club">
            <Player v-for="player in players" :key="player.id" :data="player" pickable @pick="onPlayerPicked($event)" @unpick="onPlayerUnPicked($event)" :picked="isPlayerPicked(player.id)" />
          </ShadowBox>
        </div>
        <div class="col-md-4 mt-3">
          <ShadowBox title="Lineup" :empty="selectedPlayerIds.length == 0" emptyText="You haven’t selected any player for lineup yet.">
            <Player v-for="id in selectedPlayerIds" :key="id" :data="getPlayerById(id)" />
          </ShadowBox>
        </div>
        <div class="col-md-4 mt-3">
          <ShadowBox title="Substitutes" :empty="selectedPlayerIds.length < 11" emptyText="Please pick 11 players for lineup before creating any substitutions">
            <span class="add-substitution" v-if="selectedPlayerIds.length >= 11">+ Add Substitution</span>
          </ShadowBox>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, onMounted, reactive } from 'vue'
import Button from '@/components/Button'
import ShadowBox from '@/components/ShadowBox'
import Player from '@/components/Player'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Button,
    ShadowBox,
    Player
  },
  setup() {
    const state = reactive({
      loading: false,
      players: [],
      selectedPlayerIds: []
    })

    onMounted(() => {
      state.loading = true;
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
      state.selectedPlayerIds = state.selectedPlayerIds.filter((a) => a !== playerId)
    }

    const isPlayerPicked = (playerId) => {
      return state.selectedPlayerIds.includes(playerId)
    }

    return {
      ...toRefs(state),
      getPlayerById,
      onPlayerPicked,
      onPlayerUnPicked,
      isPlayerPicked
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