<template>
    <div>
        <main-navbar v-if="!isLoggedIn"></main-navbar>
        <v-row class="container d-flex  justify-center mt-150">
            <v-card
                id="card"
                class="ml-12 mb-5 px-5"
                width="585"
            >
                <v-container fluid class="px-3 mb-5 mt-10">
                    <h5 class="py-2 text-dark">
                        Please fill your contact details.
                    </h5>
                    <v-alert type="error" v-if="emptyField">
                        Please enter your full name and mobile number to continue! 
                    </v-alert>
                    <v-text-field
                        v-model="name"
                        label="Full Name *"
                        id="name"
                        required
                    ></v-text-field>

                    <v-text-field
                    v-model="mobile"
                    label="Mobile Number *"
                    placeholder="07xx-xxx-xxx"
                    type="number"
                    required
                    maxlength="10"
                    ></v-text-field>
                </v-container>
            </v-card>
            <div class="mx-5">&nbsp;</div>
            <div class="ml-5 mb-5">
                <v-card
                    class="pb-5"
                    width="250"
                >
                    <v-card-text>
                        <v-container class="container-fluid p-0">
                            <div class="pt-3" v-if="trip">
                                <h3>Journey Details</h3>
                                <h4 class="py-1 text-dark">{{ trip.route_name }} </h4>
                                <h5 class="py-1 font-weight-regular">{{ trip.trip_start_date }}, {{ trip.departure_time }}{{ trip.am_or_pm }}</h5>
                                <h5 class="py-1 font-weight-regular">Seat:<span class="font-weight-bold pl-4"> {{ passengerSeat }} </span> </h5>
                                <h5 class="py-1 font-weight-regular">From:<span class="font-weight-bold pl-1"> {{ trip.pick_up_point }} </span> </h5>
                                <h5 class="py-1 font-weight-regular">To:<span class="font-weight-bold pl-1"> {{ trip.stop_point }} </span> </h5>
                                <h5 class="py-1 font-weight-regular">Fare:<span class="font-weight-bold pl-5">UGX {{ trip.fare }} </span> </h5>

                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
            </div>
        </v-row>
        <v-row >
            <div class="row d-flex justify-content-center mb-10 ml-1">
                <div class="menu-content py-0 col-lg-8">
                    <div class="title text-center">
                        <v-card class="pb-5">
                            <v-tabs
                                v-model="tab"
                                centered
                                dark
                                icons-and-text
                            >
                            <v-tabs-slider></v-tabs-slider>
                            <v-tab href="#tab-1" v-if="isLoggedIn">
                                Cash
                                <v-icon>fa fa-money</v-icon>
                            </v-tab>
                            <v-tab href="#tab-2" v-if="!isLoggedIn">
                                FlexiPay
                                <div class="float-left"><img style="width: 25px; height: 25px" src="../assets/img/flexipay.png" alt="Flexi" title="" /></div>
                            </v-tab>
                            <v-tab href="#tab-3" v-if="!isLoggedIn">
                                MTN MOMO
                                <div class="float-left"><img style="width: 20px; height: 20px" src="../assets/img/momo.png" alt="Momo" title="" /></div>
                            </v-tab>
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item
                                    :value="'tab-1'"
                                >
                                    <v-card flat>
                                        <v-card-text>
                                            <div class="pt-3">
                                                <h5 class="py-1 font-weight-regular">Total Fare:<span class="font-weight-bold pl-5"> UGX {{ trip.fare }} </span> </h5>
                                                <h5 class="py-1 font-weight-regular">Charge:<span class="font-weight-bold pl-1"> UGX 0.00% </span> </h5>
                                                <h5 class="py-1 font-weight-regular">Payable:<span class="font-weight-bold pl-4"> UGX {{ trip.fare + trip.fare * 0.00 }} </span> </h5>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item
                                    :value="'tab-2'"
                                >
                                    <v-card flat>
                                        <v-card-text>
                                            <div class="pt-3">
                                                <p> FlexiPay service will be comming soon!</p>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item
                                    :value="'tab-3'"
                                >
                                    <v-card flat>
                                        <v-card-text>
                                            <div class="pt-3">
                                                <p> MTN MoMo service will be comming soon!</p>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                            <v-btn class="success" width="300px" @click="choice">
                                <v-icon left> fa fa-money </v-icon>
                                Pay Now
                            </v-btn>
                        </v-card>
                    </div>
                </div>
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
        items: [],
        isEditing: true,
        emptyField: false,
        name: '',
        mobile: '',
        tab: null,
        passengerSeat: [].toString()
    }),

    computed: {
		...mapGetters({
                trip: "TRIP",
                users: "USERS",
                fleetTypes: 'FLEET_TYPES',
                fleets: 'FLEETS',
                isLoggedIn: "IS_LOGGED_IN"
			})
    },

    mounted() {
        this.overlay = true;
        document.getElementById('name').focus();
        this.$store.dispatch('GET_USERS');
        this.$store.dispatch('GET_FLEET_TYPES');
        this.$store.dispatch('GET_FLEETS');
        if(!this.trip){
            this.restoreData()
        }

        // if back button is pressed
        window.onpopstate = () => {
            this.restoreData();
        };

        // if page is refreshed
        if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
            this.restoreData();
        }

        if(this.trip){
            this.passengerSeat = this.trip.selected_seat.toString();
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

        choice() {
            this.trip["full_name"] = this.name;
            this.trip["mobile"] = this.mobile;

            if(this.name == '' | this.mobile == '') {
                this.emptyField = true;
            }else{
                this.emptyField = false;
                let data = {
                    mobile: this.trip.mobile,
                    username: this.trip.full_name,
                    password: '12@adm1n'
                };
                let user = this.users.filter(item => item.mobile === this.trip.mobile)[0];
                console.log(user);
                if(user === 'undefined' | user === {}){
                    console.log(data);
                    this.$store.dispatch('REGISTER_PASSENGER', data)
                }
                this.generateTicket(this.trip);
                this.previewBooking(this.trip);
            }
        },

        restoreData() {
            let data = JSON.parse(VueCookie.get('trip'));
            if(data){
                this.$store.dispatch('STORE_TRIP', data);
                this.name = this.trip.full_name;
                this.mobile = this.trip.mobile;
            }
        },

        generateTicket(trip) {
            this.$store.dispatch('GET_USERS');
            const user = this.users.filter(item => item.mobile === trip.mobile)[0];
            const fleetType = this.fleetTypes.filter(item => item.name === trip.fleet_type)[0];
            const fleet = this.fleets.filter(item => item.registration_no === trip.registration_no)[0];
            let currentUser = {};

            if(this.isLoggedIn) {
                currentUser = JSON.parse(VueCookie.get('currentUser')).user;
                this.trip['clerk'] = currentUser.username
            }else{
                this.trip['clerk'] = 'self'
            }

            let data = {
                passenger_name: this.trip.full_name,	
                mobile: this.trip.mobile,
                ticket_trip: this.trip.id,
                fleet_registration_no: fleet.id,
                fleet_type: fleetType.id,
                seat: this.trip.selected_seat,
                price: this.trip.fare,
                trip_start_date: this.trip.trip_start_date,
                departure_time: this.trip.departure_time,
                status: 'travelling',
                created_by: currentUser.pk ? currentUser.pk : user.id
            };
            console.log('data: ', data);
            this.$store.dispatch('SAVE_TICKET', data)
        },

        previewBooking(trip){
            this.$store.dispatch('STORE_TRIP', trip)
            this.$router.push({name: 'preview', params: { previewId: trip.id }});
        }
    }
}
</script>