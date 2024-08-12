<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="username" placeholder="Username" />
      <input :type="passwordFieldType" v-model="password" placeholder="Password" />
      <button type="button" @click="togglePasswordVisibility">
        {{ passwordVisible ? 'Hide' : 'Show' }} Password
      </button>
      <button type="submit">Login</button>
    </form>
    <div v-if="loading">Logging in...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: '',
      passwordVisible: false
    };
  },
  computed: {
    passwordFieldType() {
      return this.passwordVisible ? 'text' : 'password';
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async handleSubmit() {
      if (!this.username || !this.password) {
        this.error = 'Please enter both username and password.';
        return;
      }

      this.loading = true;
      this.error = '';

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Login failed: ' + (await response.text()));
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.$router.push(this.$route.query.redirect || '/');
      } catch (err) {
        this.error = 'Error: ' + err.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Add styles specific to this component here */
.login {
  /* Your styles */
}

.password-field {
  display: flex;
  align-items: center;
}

.password-field input {
  flex: 1;
}

.password-field button {
  margin-left: 8px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}

.loading {
  color: blue;
  margin-top: 10px;
}
</style>