<template>
  <div>
    <h1>REGISTER</h1>

    <div>
      <div>
        <label for="username">Username</label>
        <input type="text"
          name="username"
          placeholder="Username"
          v-model="username"
        >
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="password"
          v-model="password"
        >
      </div>

      <div>
        <button
          @click="register"
        >Register</button>
      </div>
    </div>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async register() {
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password
        })
        console.log(response.data);
      }
    }
  }
</script>

<style>


</style>
