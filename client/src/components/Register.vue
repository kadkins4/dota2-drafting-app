<template>
  <v-container>
    <v-layout>
      <v-flex xs-6>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <div>
              <label for="username">Username</label>
              <input type="text"
                name="username"
                placeholder="Username"
                v-model="username"
              >
            </div>
            <div>
              <label for="email">Email</label>
              <input type="text"
                name="email"
                placeholder="Email"
                v-model="email"
              >
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                v-model="password"
              >
            </div>
            <div
              class="error"
              v-html="error"
            ></div>
            <div>
              <v-btn
                class="cyan"
                @click="register"
              >Register</v-btn>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        error: null
      }
    },
    methods: {
      async register() {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            password: this.password
          })
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
  }

</style>
