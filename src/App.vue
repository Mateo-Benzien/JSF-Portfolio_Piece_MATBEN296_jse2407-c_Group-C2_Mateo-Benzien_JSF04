<template>
  <div id="app">
    <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
    <!-- Router View -->
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
  },
  watch: {
    $route(to) {
      if (to.matched.some(record => record.meta.requiresAuth) && !this.isAuthenticated) {
        this.$router.push({ name: 'Login', query: { redirect: to.fullPath } });
      }
    },
  },
};
</script>

<style>
/* Global styles can be placed here */

body {
  font-family: Arial, sans-serif;
}

button {
  font-family: inherit;
}

/* Add more global styles as needed */
</style>
