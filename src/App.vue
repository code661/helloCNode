<template>
  <div id="app">
    <navbar></navbar>
    <router-view name="main"></router-view>
    <router-view name="sidebar"></router-view>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
</style>
