<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="username" placeholder="Username" />
      <div class="password-field">
        <input :type="passwordFieldType" v-model="password" placeholder="Password" />
        <button type="button" @click="togglePasswordVisibility">
          {{ passwordVisible ? 'Hide' : 'Show' }} Password
        </button>
      </div>
      <button type="submit" :disabled="!username || !password">Login</button>
    </form>
    <div v-if="loading" class="loading">Logging in...</div>
    <div v-if="error" class="error">{{ error }}</div>
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
        // Ensure token is set before redirecting
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
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.password-field {
  display: flex;
  align-items: center;
  margin-top: 1em;
}

.password-field input {
  flex: 1;
}

.password-field button {
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1em;
}

.loading {
  color: blue;
  margin-top: 1em;
}
</style>
