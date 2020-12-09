<template>
    <div>
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
        <v-row class="container d-flex  justify-center mb-5 mt-150">
            <div class="row justify-center mb-10 ml-1">
                <v-card class="mx-0" id="ticket">
                    <v-card-subtitle class="mb-0 pb-0">
                        <v-container class="px-0" style="width: 100%">
                            <v-row no-gutters>
                                <v-col cols="9" class="sm12 font-weight-bold py-1">
                                    <i class="fas fa-bus-alt mr-1"></i>ZAWADI BUS SERVICES
                                </v-col>
                                <v-col cols="3" class="sm12 py-1 text-right ">
                                </v-col>
                            </v-row>
                            <v-row class="mt-0 mb-0">
                                <v-col cols="6" class="sm12 py-1">
                                    <div class="ml-0 pl-0">P.O.Box 770 Arua</div>
                                </v-col>
                                <v-col cols="6" class="sm12 pb-0 pt-1 text-right">
                                    <small> SEAT NO. <strong> {{ ticket.seat}} </strong></small>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-subtitle>

                    <v-card-text class="mt-0 pt-0">
                        <v-container class="px-0">
                            <v-row no-gutters cols="12" sm="6">
                                <v-col cols="4" class="sm12 py-1"> 
                                    <small> BUS NO.<strong> {{ trip.registration_no }} </strong></small>
                                </v-col>
                                <v-col cols="8" class="sm12 pb-0 pt-1 text-right">
                                    <small> RECEIPT NO. <strong> {{ ticket.ticket_no }} </strong></small>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="7" class="sm12 pt-2">
                                    <strong> NAME OF PASSENGER:  </strong> <br />{{ ticket.passenger_name }}
                                </v-col>
                                <v-col cols="5" class="sm12 pt-2">
                                    <strong> JOURNEY: </strong> <br />{{ trip.route_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="sm12 pt-0 ">
                                    <strong> BOOKING DATE: </strong>
                                </v-col>
                                <v-col cols="3" class="sm12 pt-0 pl-0">
                                    {{  ticket.trip_start_date }}
                                </v-col>
                                <v-col cols="5" class="sm12 pt-0">
                                    <strong> BUS TYPE: </strong> <br />{{ trip.fleet_type }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="sm12 pt-0">
                                    <strong> TRAVEL DATE: </strong> <br />
                                </v-col>
                                <v-col cols="3" class="sm12 pt-0 pl-0">
                                    {{  ticket.trip_start_date }}
                                </v-col>
                                <v-col cols="5" class="sm12 pt-0">
                                    <strong> BOOKING CLERK: </strong> <br />{{ trip.full_name }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="sm12 pt-0">
                                    <strong> REPORTING TIME: </strong> <br />
                                </v-col>
                                <v-col cols="3" class="sm12 pt-0 pl-0">
                                    {{  ticket.departure_time }}
                                </v-col>
                                <v-col cols="5" class="sm12 pt-0">
                                    <strong> FARE: </strong>
                                    {{ ticket.price }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="sm12 pt-0">
                                    <strong> DEPARTURE TIME: </strong>
                                </v-col>
                                <v-col cols="4" class="sm12 pt-0 pl-0">
                                    {{  ticket.departure_time }}
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <small><b> Valid Only For The Date of Travel</b></small>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            text
                            rounded
                            small
                            @click="printTicket()"
                        >
                            <i class="fa fa-print" aria-hidden="true"></i> Print
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-row>
        <!-- start footer Area -->
        <div id="about-us" class="row">	
            <footer class="footer-area section-gap bg-dark">
                <div class="container">
                    <div class="row mx-10 justify-content-between pr-0">
                        <div class="col-lg-6 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>About Zawadi</h6>
                                <p>
                                    The world has become so fast paced that people don’t want to go booking manually at the terminal, they would much rather access such services on their mobile anytime anywhere. Zawadi bus services is honoured to bring you just that. 
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
import VueCookie from 'vue-cookie';
export default {
    data: () => ({
        ticket: {},
        user: {}
    }),

    computed: {
		...mapGetters({
                trip: "TRIP",
                users: "USERS",
                tickets: 'TICKETS'
            })
    },

    mounted() {
        document.getElementById('ticket').focus();
        this.$store.dispatch('GET_USERS')
        this.$store.dispatch("GET_TICKETS");
        if(this.trip === {}){
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
        }

        // if back button is pressed
        window.onpopstate = () => {
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
            this.$store.dispatch('GET_USERS')
            this.$store.dispatch("GET_TICKETS"); 
        };

        if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
            this.$store.dispatch('GET_USERS')
            this.$store.dispatch("GET_TICKETS");
        }
        if(this.trip !== {}){
            this.ticket = this.tickets.filter(item => item.mobile === this.trip.mobile)[0];
        }
        // this.user = this.users.filter(item => item.mobile === '0783018864')[0];
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

        changeColor(obj) {
            if (document.getElementById(obj).className === "text-warning"){
                document.getElementById(obj).className = "text-white"
            }else {
                document.getElementById(obj).className = 'text-warning'
            }
        },

        printTicket() {
            this.user = this.users.filter(item => item.mobile === '0783018864')[0];
            console.log(this.ticket);
            console.log(this.user);
            let printTime = 'Print Time: ' + (new Date()).toLocaleTimeString();
            let ticketwindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
            ticketwindow.document.write('<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}')
            ticketwindow.document.write('td {border: 0px solid #dddddd;text-align: left;padding: 8px;}')
            ticketwindow.document.write('tr:nth-child(even) {background-color: #dddddd;}')
            ticketwindow.document.write('th {border-top: 2px solid #dddddd;text-align: left;padding: 8px;}</style>')
            ticketwindow.document.write('</head><body>')
            ticketwindow.document.write('<table style="width:60%; border-bottom: 2px solid #dddddd;" id="data">')
            ticketwindow.document.write('<caption><span style="text-transform:uppercase"><strong>Passenger Ticket<strong></span></caption>')
            ticketwindow.document.write(`<tr><th colspan=2><i class='fas fa-bus-alt mr-1'></i>ZAWADI BUS SERVICES</th></tr>`)
            ticketwindow.document.write(`<tr><td><small>P.O.Box 770 Arua</small></td><td><small>SEAT NO. <strong> ${ this.ticket.seat} </strong></small></td></tr>`)
            ticketwindow.document.write(`<tr><td><small>BUS NO.<strong> <br> ${ this.trip.registration_no }
                                            </strong></small></td><td><small>RECEIPT NO. <strong> <br>
                                            ${ this.ticket.ticket_no } </strong></small></td></tr>`)
            ticketwindow.document.write(`<tr><td colspan=2><hr></td></tr>`)
            ticketwindow.document.write(`<tr><td>
                                            <strong>NAME OF PASSENGER </strong> <br />
                                            ${ this.ticket.passenger_name }</td>
                                            <td><strong> JOURNEY: </strong>
                                            <br />
                                            ${ this.trip.route_name }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> BOOKING DATE: </strong> <br>
                                            ${ this.ticket.trip_start_date}</td>
                                            <td><strong> BUS TYPE: </strong>
                                            <br />
                                            ${ this.trip.fleet_type }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> TRAVEL DATE: </strong> <br />
                                            ${ this.ticket.trip_start_date }</td>
                                            <td><strong> BOOKING CLERK: </strong>
                                            <br />
                                            ${ this.user.username }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> REPORTING TIME: </strong> <br />
                                            ${ this.ticket.departure_time }</td>
                                            <td><strong> FARE: </strong><br />
                                            ${ this.ticket.price }</td></tr>`)
            ticketwindow.document.write(`<tr><td colspan=2>
                                            <strong> DEPARTURE TIME: </strong><br>
                                            ${  this.ticket.departure_time }</td></tr>`)
            ticketwindow.document.write(`<tr><td colspan=2>
                                            <small><b> Valid Only For The Date of Travel</b></small></td></tr>`)
            ticketwindow.document.writeln(printTime + '<br><br>')
            ticketwindow.document.write('</body></html>')
            ticketwindow.document.close();
            ticketwindow.focus();
            ticketwindow.print();
            ticketwindow.close();

            return true;
        }
    }
}
</script>