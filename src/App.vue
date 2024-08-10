<template>
  <div id="app">

    <!-- Router View -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartCount: 0
    };
  },
  methods: {
    // You can add methods here that are applicable across the app
  }
}
</script>

<style>
/* Global styles can be placed here */
@import './styles.css';
</style>
