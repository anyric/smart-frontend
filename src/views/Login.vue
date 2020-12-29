<template>
    <v-app id="inspire">
        <header id="header">
            <div class="header-top pt-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between mx-10">
                        <div class="header-top-left">
                            <div class="header-social">
                                <a href="#" class="text-warning"><i color="#F57C00" class="fa fa-phone"></i> Call Toll-Free: +256-700-000-000</a>
                                <a href="#" class="text-warning"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="text-warning"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="header-top-right">
                            <a href="" class="text-warning font-weight-bold" @click="login()">LogIn</a>
                        </div>
                    </div>			  					
                </div>
            </div>
            <nav class="navbar navbar-expand-md header-top navbar-dark px-6 pb-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div id="logo">
                            <a href="index.html">
                                <div class="float-left"><img style="width: 40px; height: 40px" src="../assets/logo.png" alt="" title="" /></div>
                                <div class="text-white text-uppercase font-weight-bold d-flex float-right pt-1 pl-1" style="font-size: 20px;"> Zawadi Bus Services</div>
                            </a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="col-lg-6 collapse navbar-collapse header-top-right" id="collapsibleNavbar">
                            <ul class="nav-menu">
                                <li><a href="" id="indexpage" class="text-white"
                                        @mouseover="changeColor('indexpage')"
                                        @mouseout="changeColor('indexpage')"
                                        @click="indexPage">Home</a></li>
                                <li><a href="#about-us" id="about" class="text-white"
                                        @mouseover="changeColor('about')"
                                        @mouseout="changeColor('about')"
                                        @click="aboutUs">About</a></li>
                                <li><a href="#services" id="services" class="text-white"
                                        @mouseover="changeColor('services')"
                                        @mouseout="changeColor('services')"
                                        @click="services">Services</a></li>
                                <li><a href="" class="text-white" id="booking"
                                        @mouseover="changeColor('booking')"
                                        @mouseout="changeColor('booking')"
                                        @click="booking">Booking</a></li>	
                                <li><a href="#about-us" class="text-white" id="contact"
                                        @mouseover="changeColor('contact')"
                                        @mouseout="changeColor('contact')"
                                        @click="aboutUs">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <v-content >
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
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
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="loginUser()" :disabled="!(form.mobile && form.password)">
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-card>
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
            // login() {
            // this.$router.push({name: 'login'});
            // },

            booking(){
                this.$router.push({name: 'bookingboard'});
            },

            indexPage() {
                this.$router.push({name: 'indexpage'});
            },

            aboutUs() {
                this.$router.push({name: 'indexpage#about-us'});
            },

            services() {
                this.$router.push({name: 'indexpage#services'});
            },

            changeColor(obj) {
                if (document.getElementById(obj).className === "text-warning"){
                    document.getElementById(obj).className = "text-white"
                }else {
                    document.getElementById(obj).className = 'text-warning'
                }
            }
        }
    }
</script>