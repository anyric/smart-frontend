<template>
    <div>
        <main-navbar v-if="!isLoggedIn"></main-navbar>
        <v-row class="container d-flex  justify-center mb-5 mt-150">
            <div class="row justify-center mb-10 ml-1">
                <v-card class="mx-0" id="ticket" v-if="tickets">
                    <v-card-subtitle class="mb-0 pb-0">
                        <v-container class="px-0" style="width: 100%">
                            <v-row no-gutters>
                                <v-col cols="9" class="sm12 font-weight-bold py-1">
                                    <div class="float-left"><img class="mr-1 py-0" style="width: 20px; height: 20px" :src="company[0].logo" alt="Logo" title="" /></div>
                                    {{ company[0].name }}
                                </v-col>
                                <v-col cols="3" class="sm12 py-1 text-right ">
                                </v-col>
                            </v-row>
                            <v-row class="mt-0 mb-0">
                                <v-col cols="6" class="sm12 py-1">
                                    <div class="ml-0 pl-0">P.O.Box 770 Arua</div>
                                </v-col>
                                <v-col cols="6" class="sm12 pb-0 pt-1 text-right">
                                    <small> SEAT NO. <strong> {{ ticket.seat }} </strong></small>
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
                                    <strong> MOBILE: </strong> <br />{{ trip.mobile }}
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
                                    <strong> JOURNEY: </strong> <br />{{ trip.pick_up_point }} - {{ trip.stop_point }}
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
                                    <strong> BUS TRIP: </strong> <br />{{ trip.fleet_type }}
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
                                    <strong> BOOKING CLERK: </strong> <br />{{trip.clerk }}
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" class="sm12 pt-0">
                                    <strong> DEPARTURE TIME: </strong>
                                </v-col>
                                <v-col cols="3" class="sm12 pt-0 pl-0">
                                    {{  ticket.departure_time }}
                                </v-col>
                                <v-col cols="5" class="sm12 pt-0">
                                    <strong> FARE: </strong>{{ trip.fare }}
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
        <main-footer v-if="!isLoggedIn"></main-footer>
        <!-- End footer Area -->
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueCookie from 'vue-cookie';
export default {
    data: () => ({
        overlay: false,
        ticket: {},
        user: {},
    }),

    computed: {
		...mapGetters({
                trip: "TRIP",
                users: "USERS",
                tickets: 'TICKETS',
                company: 'COMPANY',
                isLoggedIn: "IS_LOGGED_IN"
            })
    },

    mounted() {
        this.overlay = true;
        document.getElementById('ticket').focus();
        this.$store.dispatch('GET_USERS')
        this.$store.dispatch("GET_TICKETS");
        this.$store.dispatch("GET_COMPANY");
        if(this.trip === {}){
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
        }

        // if back button is pressed
        window.onpopstate = () => {
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
            this.$store.dispatch('GET_USERS')
            this.$store.dispatch("GET_TICKETS"); 
        };
        // if page is refreshed
        if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
            this.$store.dispatch('STORE_TRIP', JSON.parse(VueCookie.get('trip')));
            this.$store.dispatch('GET_USERS')
            this.$store.dispatch("GET_TICKETS");
        }
    },

    watch: {
        overlay (val) {
            val && setTimeout(() => {
                if(this.trip !== {}){
                    // query this by the newly created user mobile number
                    this.ticket = this.tickets.filter(item => item.mobile === this.trip.mobile )[0];
                }
                this.overlay = false
            }, 5000)
        },
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
            // query this by the newly created user mobile number
            this.user = this.users.filter(item => item.mobile === this.trip.mobile )[0];
            let printTime = 'Print Time: ' + (new Date()).toLocaleTimeString();
            let ticketwindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
            ticketwindow.document.write('<style> table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}')
            ticketwindow.document.write('td {border: 0px solid #dddddd;text-align: left;padding: 8px;}')
            ticketwindow.document.write('tr:nth-child(even) {background-color: #dddddd;}')
            ticketwindow.document.write('th {border-top: 2px solid #dddddd;text-align: left;padding: 8px;}</style>')
            ticketwindow.document.write('</head><body>')
            ticketwindow.document.write('<table style="width:60%; border-bottom: 2px solid #dddddd;" id="data">')
            ticketwindow.document.write('<caption><span style="text-transform:uppercase"><strong>Passenger Ticket<strong></span></caption>')
            ticketwindow.document.write(`<tr><th colspan=2>
                                            <img class="mr-1 py-0" style="width: 20px; height: 20px" src="${ this.company[0].logo }" alt="Logo" title="" />
                                            <small class="py-0"> ${ this.company[0].name } </small></th></tr>`)
            ticketwindow.document.write(`<tr><td><small>P.O.Box 770 Arua</small></td><td><small>SEAT NO. <strong> ${ this.ticket.seat} </strong></small></td></tr>`)
            ticketwindow.document.write(`<tr><td><small>BUS NO.<strong> <br> ${ this.trip.registration_no }
                                            </strong></small></td><td><small>RECEIPT NO. <strong> <br>
                                            ${ this.ticket.ticket_no } </strong></small></td></tr>`)
            ticketwindow.document.write(`<tr><td colspan=2><hr></td></tr>`)
            ticketwindow.document.write(`<tr><td>
                                            <strong>NAME OF PASSENGER </strong> <br />
                                            ${ this.ticket.passenger_name }</td>
                                            <td><strong> Mobile: </strong>
                                            <br />
                                            ${ this.trip.mobile }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> BOOKING DATE: </strong> <br>
                                            ${ this.ticket.trip_start_date}</td>
                                            <td><strong> JOURNEY: </strong>
                                            <br />
                                            ${ this.trip.pick_up_point } - ${this.trip.stop_point }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> TRAVEL DATE: </strong> <br />
                                            ${ this.ticket.trip_start_date }</td>
                                            <td><strong> BUS TRIP: </strong>
                                            <br />
                                            ${ this.trip.fleet_type }</td></tr>`)
            ticketwindow.document.write(`<tr><td><strong> REPORTING TIME: </strong> <br />
                                            ${ this.ticket.departure_time }</td>
                                            <td><strong> BOOKING CLERK: </strong><br />
                                            ${ this.trip.clerk }</td></tr>`)
            ticketwindow.document.write(`<tr><td>
                                            <strong> DEPARTURE TIME: </strong><br>
                                            ${  this.ticket.departure_time }</td>
                                            <td><strong> FARE: </strong><br />
                                            ${ this.ticket.price }</td></tr>`)
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