<template>
  <div class="shadow-box">
    <div v-if="title && title != ''" class="title">{{title}}</div>
    <div v-if="empty" class="empty-text">
      <span>
        {{emptyText}}
      </span>
    </div>
    <div v-else class="list">
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  props: {
    title: {
      required: false,
      default: '',
      type: String
    },
    empty: {
      required: false,
      default: false,
      type: Boolean
    },
    emptyText: {
      required: false,
      default: '',
      type: String
    }
  },
  setup(context, props) {
    onMounted(() => {
      // TODO: Delete this later.
      console.log('TEST', props.title)
    })
  }
}
</script>

<style lang="scss" scoped>
.shadow-box {
  padding-bottom: 0;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: $white;
  height: 552px;
  .list {
    padding: 20px;
    padding-top: 0;
    margin-top: 10px;
    padding-bottom: 10px;
    overflow-y: scroll;
    height: 89%;
  }
  .title {
    padding: 20px;
    padding-bottom: 0;
    font-family: SofiaPro;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: $night-blue;
  }
  .empty-text {
    padding: 20px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 89%;
    font-family: SofiaPro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    color: $slate-blue;

  }
}
</style>