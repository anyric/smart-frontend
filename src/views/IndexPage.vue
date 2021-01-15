<template>
    <div>
        <!-- start of Navbar -->
        <main-navbar></main-navbar>
        <!-- end of Navbar -->
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
                            <a href="" @click="booking" class="primary-btn text-uppercase">Book Now</a>
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
                                <h4>Kampala</h4>
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
                                <h4>Arua City</h4>
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
                                <h4>Moyo</h4>
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
                    <div class="col-lg-4">
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
                    <div class="col-lg-4">
                        <div class="single-price">
                            <h4>Premium Packages</h4>
                            <ul class="price-list" v-for="(item, i) in fares" :key="i">
                                <li v-if="item.fleet_type == 'Premium Day'" class="d-flex justify-content-between align-items-center">
                                    <span>{{ item.trip_route }}</span>
                                    <span>UGX {{ item.price_per_person}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="single-price">
                            <h4>Cargo/Parcel Packages</h4>
                            <p>These are charged based on the sizes and destinations.</p>
                        </div>
                    </div>												
                </div>
                <div class="row d-flex justify-content-center my-0">
                    <div class="menu-content py-0 col-lg-8">
                        <div class="text-center">
                            <a href="/bookingboard" @click="booking" class="primary-btn text-uppercase">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End price Area -->
        <!-- start footer Area -->
        <main-footer></main-footer>	
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
            booking(){
                this.$router.push({name: 'bookingboard'});
            },
        }
    };
</script>