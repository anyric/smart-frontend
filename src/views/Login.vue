<template>
    <v-app id="inspire" class="blue lighten-5">
        <v-content >
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar color="teal darken-1" dark flat>
                                <v-toolbar-title>Account Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert dense outlined text v-if="loginError" type="error">{{loginError}}</v-alert>
                                <v-form>
                                    <v-text-field
                                        label="Mobile"
                                        v-model="form.mobile"
                                        type="text"
                                        prepend-icon="fas fa-user"
                                    ></v-text-field>
                                    <v-text-field
                                        :type="showPassword ? 'text' : 'password'"
                                        label="Password"
                                        v-model="form.password"
                                        prepend-icon="fas fa-lock"
                                        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        @click:append="showPassword = !showPassword"
                                        @keyup.enter="loginUser()"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="loginUser()" :disabled="!(form.mobile && form.password)">
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Form from "@/service/Form";

    export default {
        data() {
            return {
                showPassword: false,
                form: new Form({
                    mobile: '',
                    password: ''
                }),
                loginError: '',
            };
        },
        methods: {
            async loginUser() {
                await this.$store.dispatch('LOGIN', {
                    username: this.form.mobile,
                    password: this.form.password,
                });
            }
        }
    }
</script>

<style scoped>

</style>
