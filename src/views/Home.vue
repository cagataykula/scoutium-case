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
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  name: 'Home',
  components: {
    Button
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
}
</style>