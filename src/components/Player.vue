<template>
  <div class="player-wrapper">
    <div class="player-information">
      <div class="player-image">
        <img :src="data.image_url" alt="">
      </div>
      <div class="player-text">
        <div class="name">{{data.display_name}}</div>
        <div class="position">{{data.position?.name ? data.position?.name : 'Unknown'}}</div>
      </div>
    </div>
    <div class="options">
      <template v-if="pickable">
        <span v-if="!picked" class="pick" @click="$emit('pick', data.id)">PICK</span>
        <span v-else class="pick red" @click="$emit('unpick', data.id)">UNPICK</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object
    },
    pickable: {
      required: false,
      default: false,
      type: Boolean
    },
    picked: {
      required: false,
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>
  .player-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
    .player-information {
      display: flex;
      .player-image {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          // -webkit-filter: blur(10.8px);
          // filter: blur(10.8px);
        }
      }
      .player-text {
        margin-left: 8px;
        .name {
          font-family: SofiaPro;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.19;
          letter-spacing: normal;
          text-align: left;
          color: $night-blue;
          white-space: nowrap;
          overflow: hidden;
        }
        .position {
          font-family: SofiaPro;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.29;
          letter-spacing: normal;
          text-align: left;
          color: rgba(17, 50, 96, 0.7);
        }
      }
    }
    .options {
      .pick {
        font-family: SofiaPro;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.17;
        letter-spacing: normal;
        text-align: left;
        color: $light-royal-blue;
        cursor: pointer;
      }
      .red {
        color: $faded-red;
      }
    }
  }
</style>