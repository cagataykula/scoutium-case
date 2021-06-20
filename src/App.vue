<template>
  <Header />
  <div class="container page-content p-0">
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
html, #app {
  background-color: $silver;
}

.page-content {
  margin-top: 30px;
  border-radius: 12px;
  background-color: $white;
}
</style>