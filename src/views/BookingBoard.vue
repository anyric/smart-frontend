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
                                <li><a href="" class="text-white" @click="indexPage">Home</a></li>
                                <li><a href="#about-us" class="text-white" @click="aboutUs">About</a></li>
                                <li><a href="#services" class="text-white" @click="services">Services</a></li>
                                <li><a href="" class="text-white" @click="booking">Booking</a></li>	
                                <li><a href="#about-us" class="text-white" @click="aboutUs">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <v-row class="container justify-center mt-100">
            <div class="my-5 py-3 ml-2 px-0">
                <h5 class="pb-5 text-dark">
                    Select your travel route to view the sitting arrangement and pick your seat.
                </h5>
            </div>
        </v-row>
        <div class="container px-0">
            <v-simple-table
                fixed-header
                height="300px"
                style="width: 90%"
                class="table-responsive container px-0"
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                            Date
                            </th>
                            <th class="text-left">
                            Route
                            </th>
                            <th class="text-left">
                            Trip
                            </th>
                            <th class="text-left">
                            View Seat
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in schedule"
                            :key="item.id"
                        >
                            <td>{{ item.trip_start_date }} ({{ item.departure_time }})</td>
                            <td>{{ item.route_name }}</td>
                            <td>{{ item.fleet_type }}</td>
                            <td>
                                <v-btn 
                                    color="warning"
                                    elevation="0"
                                    small
                                    @click="viewSchedule(item)"
                                    >
                                        View Seats
                                        <v-icon small>mdi-eye</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
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
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data: () => ({
        items: [],
        pickUpPoints: []
    }),

    computed: {
        ...mapGetters({
            routes: 'ROUTES',
            locations: 'LOCATIONS',
            schedule: "TRIP_SCHEDULE"
		}),
    },
    mounted() {
        this.$store.dispatch('GET_LOCATIONS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_TRIP_SCHEDULE');
    },

    
    methods: {
        login() {
            this.$router.push({name: 'login'});
        },

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

        viewSchedule(trip) {
            const route = this.routes.filter(item => item.name === trip.route_name)
            this.locations.filter(item =>  {
                if (route[0].stopage_points.includes(item.id)) {
                    this.pickUpPoints.push({'id': item.id, 'name': item.name});
                }
            });
            trip['pick_up_points'] = this.pickUpPoints
            this.$store.dispatch('STORE_TRIP', trip)
            this.$router.push({name: 'schedule', params: { scheduleId: trip.id }});
        }
    }
}
</script>