<template>
    <div class="modal fade bd-example-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-title">
          Add Substition
        </div>
        <div class="modal-body">
          <div class="substition out">
            <div class="title">
              OUT PLAYER
            </div>
            <Multiselect
              class="input radius"
              v-model="outPlayer"
              label="display_name"
              trackBy="display_name"
              :options="lineup"
              searchable
              placeholder="Enter player name"
              valueProp="id"
            />
          </div>
          <div class="substition in">
            <div class="title">
              IN PLAYER
            </div>
            <Multiselect
              class="input radius"
              v-model="inPlayer"
              label="display_name"
              trackBy="display_name"
              :options="availablePlayers"
              searchable
              placeholder="Enter player name"
              valueProp="id"
            />
          </div>
          <div class="substition minute">
            <div class="title">
              SUBSTITUTION MINUTE
            </div>
            <input v-model="minute" placeholder="Enter minute of substitution" type="number" min="0" class="input radius minuteInput">
          </div>
          <div class="buttons">
            <Button class="cancelBtn" @click="btnClick('cancel')">Cancel</Button>
            <Button class="addBtn" :disabled="isAddDisabled" @click="btnClick('add')">Add</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import Button from '@/components/Button'
import emitter from '@/helpers/eventHub'

export default {
  components: {
    Multiselect,
    Button
  },
  setup() {
    const state = reactive({
      inPlayer: null,
      outPlayer: null,
      minute: null,
      lineup: [],
      availablePlayers: []
    })

    const myChangeEvent = (val) => {
        console.log(val);
    }
    const mySelectEvent = ({id, text}) => {
        console.log({id, text})
    }

    onMounted(() => {
      emitter.on('open.substitution', ({lineup, availablePlayers}) => {
        console.log({lineup, availablePlayers})
        state.lineup = lineup
        state.availablePlayers = availablePlayers
        // eslint-disable-next-line no-undef
        $('#myModal').modal('show');
      })
    })

    const btnClick = (type) => {
      console.log(type)
      if(type == 'cancel') {
        // eslint-disable-next-line no-undef
        $('#myModal').modal('hide');
      } else if (type == 'add') {
        emitter.emit('add.substitution', {inPlayer: state.inPlayer, outPlayer: state.outPlayer, minute: state.minute})
        // eslint-disable-next-line no-undef
        $('#myModal').modal('hide');
      }
      state.inPlayer = null
      state.outPlayer = null
      state.minute = null
    }

    const isAddDisabled = computed(() => {
      return !(state.inPlayer && state.outPlayer && state.minute)
    })

    return {
      ...toRefs(state),
      myChangeEvent,
      mySelectEvent,
      btnClick,
      isAddDisabled
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss" scoped>

  .modal-content {
    width: 375px;
    height: 360px;
    padding: 20px;
    border-radius: 8px;
    border: solid 1px #707070;
    background-color: $white;
    .modal-title {
      font-family: SofiaPro;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.19;
      letter-spacing: normal;
      text-align: left;
      color: $night-blue;
    }
    .modal-body {
      padding: 0;
      margin-top: 16px;
      .substition {
        &.in, &.minute {
          margin-top: 16px;
        }

        .title {
          font-family: SofiaPro;
          font-size: 12px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.17;
          letter-spacing: 1px;
          text-align: left;
          color: $slate-blue;
        }
        .input {
          padding-left: 24px;
          &.radius {
            border-radius: 8px;
          }
          width: 100%;
          margin-top: 8px;
          height: 48px;
          border: solid 1px $bluey-grey;
          background-color: $white;
          // overflow: hidden;
        }
      }
      .buttons {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        margin-top: 16px;
        .addBtn {
          margin-left: 5px;
        }
        .cancelBtn {
          background: $white;
          font-family: SofiaPro;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.17;
          letter-spacing: normal;
          text-align: center;
          color: $faded-red !important;
        }
      }
    }
  }
</style>

<style lang="scss">
  .multiselect-search {
    outline: none !important;
    border-radius: 8px;
  }
  .multiselect-placeholder, .minuteInput::placeholder {
    font-family: SofiaPro;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: $bluey-grey;
  }

  .multiselect-placeholder {
    padding-left: 24px;
  }

  .multiselect-search, .multiselect-single-label, .minuteInput, .multiselect-option > span {
    padding-left: 24px;
    font-family: SofiaPro;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: $marine-blue;
  }

  .multiselect.is-active {
    box-shadow: none;
  }
</style>