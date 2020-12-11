<template>
    <div>
        <header id="header">
            <div class="header-top pt-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between mx-10">
                        <div class="header-top-left">
                            <div class="header-social">
                                <a href="#" class="text-warning"><i class="fa fa-phone"></i> Call Toll-Free: +256-700-000-000</a>
                                <a href="#" class="text-warning"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="text-warning"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="header-top-right">
                            <a href="" class="text-warning" @click="login()">LogIn</a>
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
                                <li><a href="#" class="text-white">Home</a></li>
                                <li><a href="#about-us" class="text-white">About</a></li>
                                <li><a href="#services" class="text-white">Services</a></li>
                                <li><a href="" class="text-white" @click="Booking()">Booking</a></li>	
                                <li><a href="#about-us" class="text-white">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <!-- start banner Area -->
        <div class="row">
            <section class="banner-area relative">
                <div class="overlay overlay-bg"></div>
                <div class="d-md-flex flex-md-equal w-100 pl-5 pt-5 mt-99">
                    <div class="ml-md-4 pt-5 px-3 pt-md-5 px-md-5 mt-150 overflow-hidden">
                        <div class="my-5 pt-5 ml-2 px-0">
                            <h1 class="text-dark pt-10">Your Travel Partner</h1>
                        </div>
                        <div class="my-5 py-3 ml-2 px-0">
                            <h5 class="pb-5 text-secondary">
                                Brings you secure and convinient booking services at your doorstep.
                            </h5>
                            <a href="" @click="Booking()" class="primary-btn text-uppercase">Book Now</a>
                        </div>
                    </div>
                    <div class="text-center overflow-hidden pt-3 pl-5">
                        <img class="d-block" src="../assets/img/bus.jpg" style="width: 775px; height: 637px;" alt="Landing page" />
                    </div>
                </div>
            </section>
        </div>
        <!-- End banner Area -->
        <!-- Start popular-destination Area -->
        <section class="popular-destination-area section-gap">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="menu-content pb-70 col-lg-8">
                        <div class="title text-center">
                            <h1 class="mb-10">Our Major Destinations</h1>
                            <p>Find us at our offices in these majar destination towns and cities.</p>
                        </div>
                    </div>
                </div>						
                <div class="row">
                    <div class="col-lg-4">
                        <div class="single-destination relative">
                            <div class="thumb relative">
                                <div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="../assets/img/d1.jpg" alt="">
                            </div>
                            <div class="desc">	
                                <!-- <a href="#" class="price-btn">$150</a>			 -->
                                <h4>Kampala</h4>
                                <!-- <p>Paraguay</p>			 -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="single-destination relative">
                            <div class="thumb relative">
                                <div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="../assets/img/d2.jpg" alt="">
                            </div>
                            <div class="desc">	
                                <!-- <a href="#" class="price-btn">$250</a>			 -->
                                <h4>Arua City</h4>
                                <!-- <p>Paris</p>			 -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 pr-0">
                        <div class="single-destination relative">
                            <div class="thumb relative">
                                <div class="overlay overlay-bg"></div>
                                <img class="img-fluid" src="../assets/img/d3.jpg" alt="">
                            </div>
                            <div class="desc">	
                                <!-- <a href="#" class="price-btn">$350</a>			 -->
                                <h4>Moyo</h4>
                                <!-- <p>Sri Lanka</p>			 -->
                            </div>
                        </div>
                    </div>												
                </div>
            </div>	
        </section>
        <!-- End popular-destination Area -->
        <!-- Start price Area -->
        <section id= "services" class="price-area section-gap pt-0">
            <div class="container">
                <div class="row d-flex justify-content-center my-0">
                    <div class="menu-content py-0 col-lg-8">
                        <div class="title text-center">
                            <h1 class="mb-10">As your travel partner;</h1>
                            <p>We offer you transport services at a competitive price that meets your business needs.</p>
                        </div>
                    </div>
                </div>						
                <div class="row">
                    <div class="col-lg-6">
                        <div class="single-price">
                            <h4>Universal Packages</h4>
                            <ul class="price-list" v-for="(item, i) in fares" :key="i">
                                <li v-if="item.fleet_type == 'Universal Day'" class="d-flex justify-content-between align-items-center">
                                    <span>{{ item.trip_route }}</span>
                                    <span>UGX {{ item.price_per_person}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="single-price">
                            <h4>Premium Packages</h4>
                            <ul class="price-list" v-for="(item, i) in fares" :key="i">
                                <li v-if="item.fleet_type == 'Premium Day'" class="d-flex justify-content-between align-items-center">
                                    <span>{{ item.trip_route }}</span>
                                    <span>UGX {{ item.price_per_person}}</span>
                                </li>
                            </ul>
                        </div>
                        <div> <a href="" @click="Booking()" class="primary-btn text-uppercase">Book Now</a></div>
                    </div>												
                </div>
            </div>	
        </section>
        <!-- End price Area -->
        <!-- start footer Area -->
        <div id="about-us" class="row">	
            <footer class="footer-area section-gap bg-dark">
                <div class="container">
                    <div class="row mx-10 justify-content-between pr-0">
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>About Zawadi</h6>
                                <p>
                                    The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point 
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>Navigation Links</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#about-us">About</a></li>
                                            <li><a href="#services">Services</a></li>
                                            <li><a href="#" @click="Booking()">Booking</a></li>
                                            <li><a href="#about-us">Contact</a></li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>Contact Us</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul>
                                            <li>Kampala: +256700000000</li>
                                            <li>Adjumani: +256700000000</li>
                                            <li>Moyo: +256700000000</li>
                                            <li>Yumbe: +256700000000</li>
                                            <li>Arua: +256700000000</li>
                                            <li>Lira: +256700000000</li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                    </div>

                    <div class="row footer-bottom d-flex justify-content-between align-items-center mx-10">
                        <p class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">
                        &copy; Zawadi Bus Services 2020, All Rights Reserved.</p>
                        <p class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">Powered by: Smart Traveller Limited.</p>
                        <div class="col-lg-4 col-sm-12 footer-social text-center">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>	
        <!-- End footer Area -->
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import { idToName } from "@/services/helper";
    export default {
        data: () => ({
            overlay: false,
            isOpen: false,
        }),

        computed: {
            ...mapGetters({
                fleetTypes: "FLEET_TYPES",
                routes: "ROUTES",
                fares: "FARES",
                isLoggedIn: "IS_LOGGED_IN"
            }),
        },

        watch: {
            overlay (val) {
                val && setTimeout(() => {
                    this.overlay = false
                }, 5000)
            },
        },

        mounted() {
            if(this.isLoggedIn){
                this.$router.push({name: 'dashboard'});
            }
            this.overlay = true;
            this.$store.dispatch("GET_FLEET_TYPES");
            this.$store.dispatch("GET_ROUTES");
            this.$store.dispatch("GET_FARES");
        },

        updated() {
            idToName(this.fleetTypes, this.routes, this.fares);
        },

        methods: {
            login() {
                this.$router.push({name: 'login'});
            },

            Booking(){
                this.$router.push({name: 'bookingboard'});
            },
        }
    };
</script>