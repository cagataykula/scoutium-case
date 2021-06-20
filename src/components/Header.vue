<template>
  <header>
    <div class="container p-0">
      <div class="logo-wrapper">
        <img class="logo" src="@/assets/images/logo.png" alt="Scoutium">
      </div>
      <div class="user-avatar-wrapper">
        <img class="avatar" src="@/assets/images/avatar.png" alt="John Doe">
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 60px;
  background-color: $night-blue;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .logo-wrapper .logo {
      width: 132px;
      height: 18px;
      object-fit: contain;
    }
    .user-avatar-wrapper .avatar {
      width: 36px;
      height: 36px;
      object-fit: contain;
    }
  }
}
</style>