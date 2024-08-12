<template>
  <div id="app">
    <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
    <!-- Router View -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
    };
  },
  methods: {
    handleLogout() {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      // Redirect to the login page
      this.$router.push({ name: 'Login' });
    },
  },
  watch: {
    $route(to, from) {
      // Check for protected routes and redirect if not authenticated
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