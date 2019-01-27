<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs6 md4>
        <div class="white elevation-4">

          <v-toolbar flat dense dark class="blue-grey darken-3">
            <v-toolbar-title justify-center>Registration</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-4 pb-4 blue-grey lighten-4">
            <v-form>
              <v-layout row xs12 md12>
                <v-flex xs2 md1 pt-4 pr-4 pl-1>
                  <v-icon>fa fa-user-ninja</v-icon>
                </v-flex>
                <v-flex xs10 md10 pr-1 pl-2>
                  <v-text-field
                    :rules="usernameRules"
                    :counter="15"
                    placeholder="username"
                    v-model="username"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row xs12 md12>
                <v-flex xs2 md1 pt-4 pr-4 pl-1>
                  <v-icon>fa fa-envelope</v-icon>
                </v-flex>
                <v-flex xs10 md10 pr-1 pl-2>
                  <v-text-field
                    :rules="emailRules"
                    label="email"
                    placeholder="email"
                    v-model="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row xs12 md12>
                <v-flex xs2 md1 pt-4 pr-4 pl-1>
                  <v-icon>fa fa-key</v-icon>
                </v-flex>
                <v-flex xs10 md10 pr-1 pl-2>
                  <v-text-field
                    :rules="passwordRules"
                    :counter="30"
                    label="password"
                    placeholder="password"
                    v-model="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="error" justify-center>
                <v-flex>
                  <span>
                    <v-icon>fa fa-skull-crossbones</v-icon>
                  </span>
                  <span
                    class="err"
                    v-html="error"
                  ></span>
                  <span>
                    <v-icon>fa fa-skull-crossbones</v-icon>
                  </span>
                </v-flex>
              </v-layout>


              <div>
                <v-btn
                  class="blue-grey darken-3"
                  dark
                  @click="register">Register
                  <v-icon dark right>fa fa-check-circle</v-icon>
                </v-btn>
              </div>
            </v-form>
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
        error: null,
        valid: false,
        // logic below from vuetify
        usernameRules: [
          user => !!user || 'Name is required',
          user => user.length <= 15 || 'Username must be 15 characters or less',
          user => user.length >= 4 || 'Username must be 4 characters or more'
        ],
        emailRules: [
          email => !!email || 'E-mail is required',
          email => /.+@.+/.test(email) || 'E-mail must be valid'
        ],
        passwordRules: [
          pass => !!pass || 'Password is required',
          pass => pass.length <= 30 || 'Password must be 30 characters or less',
          pass => pass.length >= 7 || 'Password must be 7 characters or more'
        ]
      }
    },
    methods: {
      async register() {
        try {
          const response = await AuthenticationService.register({
            username: this.username,
            email: this.email,
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
  .err {
    color: red;
  }

</style>
