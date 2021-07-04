<template>
  <div id="app">
    
    <Header v-if="this.$store.state.token" />
    <router-view/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'

export default {
  data: function () {
    return {
      isLogged: false
    }
  },
  components: {
    Header
    
  }
}
</script>

<style>
#app {
  text-align: center;
}



</style>
