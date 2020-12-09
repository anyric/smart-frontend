<template>
    <v-app id="inspire" class="blue lighten-5">
        <v-content >
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar color="text-white text-center secondary" flat>
                                <v-toolbar-title>User Login</v-toolbar-title>
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
                                <v-btn color="secondary" @click="home()">
                                    Home
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="loginUser()" :disabled="!(form.mobile && form.password)">
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
        </v-content>
    </v-app>
</template>

<script>
import Form from "@/services/Form";
import { EventBus } from "@/services/bus";
import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                overlay: false,
                showPassword: false,
                form: new Form({
                    mobile: '',
                    password: ''
                }),
                loginError: '',
            };
        },

        computed: {
            ...mapGetters({isLoggedIn: "IS_LOGGED_IN"}),
        },

        mounted() {
            if(this.isLoggedIn){
                this.$router.push({name: 'dashboard'});
            }
        },

        watch: {
            overlay (val) {
                val && setTimeout(() => {
                    this.overlay = false
                }, 5000)
            },
        },

        methods: {
            loginUser() {
                this.overlay = true;
                this.$store.dispatch('LOGIN', {
                    username: this.form.mobile,
                    password: this.form.password,
                });

                EventBus.$emit("show-snackbar", {
                    text: "You've successfully logged in!",
                    color: "success",
                });
            },
            home() {
                this.$router.push({name: 'indexpage'});
            }
        }
    }
</script>