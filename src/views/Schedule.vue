<template>
    <div>
        <main-navbar v-if="!isLoggedIn"></main-navbar>
        <v-row id="scheduleHeaderRow" class="container justify-center mt-100">
            <div id="scheduleHeaderText" class="py-3 ml-2 px-0">
                <div class="justify-center">
                    <h4 class="py-1 text-dark mt-5"><span class="text-warning">Route Name:</span>  {{ trip.route_name }} </h4>
                    <h5 class="py-1 text-dark"><span class="text-warning">Bus Reg.:</span> {{ trip.registration_no }} </h5>
                    <h5 class="py-1 text-dark"><span class="text-warning">Bus Type:</span> {{ trip.fleet_type }} </h5>
                    <h5 class="py-1 text-dark"><span class="text-warning">Dep Time:</span> {{ trip.departure_time }}{{ amOrPM }} ({{ trip.trip_start_date }}) </h5>
                    <h5 class="py-1 text-dark"><span class="text-warning">Total Seats:</span> {{ trip.seat_nos }} </h5>
                </div>
                <h5 class="py-5 text-dark">
                    Please choose your preferred seat and boarding point.
                </h5>
            </div>
        </v-row>
        <v-row class="container-fluid  justify-center">
            <v-card class="px-2 mb-5">
                <div class="mr-1 py-3 pl-3 pr-8">
                    <div class="row justify-content-between font-weight-bold pl-5 mb-3">
                        <div>
                            <div class="justify-center"><v-btn text disabled class="indigo lighten-5"></v-btn></div>
                            Available Seat
                        </div>
                        <div>
                            <div class="justify-center"><v-btn text disabled class="primary"></v-btn></div>
                            Selected Seat
                        </div>
                        <div>
                            <div class="justify-center"><v-btn text disabled class="success"></v-btn></div>
                            Booked Seat
                        </div>
                    </div>
                    <div class="row pb-0 mb-0 justify-content-between">
                        <div><v-btn small @click="seats('seat_1')" id="seat_1" class="d-flex justify-content-center d-md-table mb-2 mx-5">1</v-btn></div>
                        <div><v-btn small disabled class="mr-5 mb-0"><small>Driver</small></v-btn></div>
                    </div>
                    <div class="row py-0">
                            <div class="col-2 pl-5"><v-btn small id="seat_2" @click="seats('seat_2')">2</v-btn></div>
                            <div class="col-2"><v-btn small id="seat_3" @click="seats('seat_3')">3</v-btn></div>
                    </div>
                    <div class="row py-0">
                            <div class="col-2 pl-5"><v-btn small @click="seats('seat_4')" id="seat_4">4</v-btn></div>
                            <div class="col-2"><v-btn small @click="seats('seat_5')" id="seat_5">5</v-btn></div>
                            <div class="col-2">&nbsp;</div>
                            <div class="col-2 pr-0"><v-btn small @click="seats('seat_6')" id="seat_6">6</v-btn></div>
                            <div class="col-2 pl-2"><v-btn small @click="seats('seat_7')" id="seat_7">7</v-btn></div>
                            <div class="col-2 pl-0"><v-btn small @click="seats('seat_8')" id="seat_8">8</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_9')" id="seat_9">9</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_10')" id="seat_10">10</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_11')" id="seat_11">11</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_12')" id="seat_12">12</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_13')" id="seat_13">13</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-6 justify-center font-weight-bold pl-5">ENTRANCE</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_14')" id="seat_14">14</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_15')" id="seat_15">15</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_16')" id="seat_16">16</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_17')" id="seat_17">17</v-btn></div>
                        <div class="col-2" ><v-btn small disabled><small>STAFF</small></v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_18')" id="seat_18">18</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_19')" id="seat_19">19</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_20')" id="seat_20">20</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_21')" id="seat_21">21</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_22')" id="seat_22">22</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_23')" id="seat_23">23</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_24')" id="seat_24">24</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_25')" id="seat_25">25</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_26')" id="seat_26">26</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_27')" id="seat_27">27</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_28')" id="seat_28">28</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_29')" id="seat_29">29</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_30')" id="seat_30">30</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_31')" id="seat_31">31</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_32')" id="seat_32">32</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_33')" id="seat_33">33</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_34')" id="seat_34">34</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_35')" id="seat_35">35</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_36')" id="seat_36">36</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_37')" id="seat_37">37</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_38')" id="seat_38">38</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_39')" id="seat_39">39</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_40')" id="seat_40">40</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_41')" id="seat_41">41</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_42')" id="seat_42">42</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_43')" id="seat_43">43</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_44')" id="seat_44">44</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_45')" id="seat_45">45</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_46')" id="seat_46">46</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_47')" id="seat_47">47</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_48')" id="seat_48">48</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_49')" id="seat_49">49</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_50')" id="seat_50">50</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_51')" id="seat_51">51</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_52')" id="seat_52">52</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_53')" id="seat_53">53</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_54')" id="seat_54">54</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_55')" id="seat_55">55</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn small @click="seats('seat_56')" id="seat_56">56</v-btn></div>
                        <div class="col-2"><v-btn small @click="seats('seat_57')" id="seat_57">57</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn small @click="seats('seat_58')" id="seat_58">58</v-btn></div>
                        <div class="col-2 pl-2"><v-btn small @click="seats('seat_59')" id="seat_59">59</v-btn></div>
                        <div class="col-2 pl-0"><v-btn small @click="seats('seat_60')" id="seat_60">60</v-btn></div>
                    </div>
                    <div class="row px-0 mx-0 justify-content-between">
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_61')" id="seat_61">61</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_62')" id="seat_62">62</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_63')" id="seat_63">63</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_64')" id="seat_64">64</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_65')" id="seat_65">65</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_66')" id="seat_66">66</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small @click="seats('seat_67')" id="seat_67">67</v-btn></div>
                        <span></span>
                    </div>
                </div>
            </v-card>
            <div class="mx-5">&nbsp;</div>
            <div class="ml-5 mb-5">
                <v-alert type="error" v-if="emptyField">
                    {{ message }} 
                </v-alert>
                <form>
                    <v-card class="px-2 pb-5">
                            <div></div>
                            <div class="px-4">
                                <v-select
                                    :items="trip.pick_up_points"
                                    label="From *"
                                    item-text="name"
                                    item-value="name"
                                    v-model="pickPoint"
                                    id="pickpoint"
                                    required
                                ></v-select>
                                 <v-select
                                    :items="trip.pick_up_points"
                                    label="To *"
                                    item-text="name"
                                    item-value="name"
                                    v-model="stopPoint"
                                    id="stoppoint"
                                    required
                                ></v-select>
                                <v-text-field
                                    small
                                    disabled
                                    id="selected_seats"
                                    v-model="selectedSeats"
                                    label="Seat"
                                    ></v-text-field>
                                <v-btn class="success" block @click="choice">Book Seat</v-btn>
                            </div>
                    </v-card>
                </form>
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
        pickPoint: '',
        stopPoint: '',
        selectedSeats: '',
        bookedSeats: [],
        amOrPM: '',
        emptyField: false,
        message: 'Please select your pick up, stop point and seat to continue!'
    }),

    computed: {
		...mapGetters({
                trip: "TRIP",
                fares: "FARES",
                routes: "ROUTES",
                tickets: "TICKETS",
                isLoggedIn: "IS_LOGGED_IN"
			})
    },

    mounted() {
        this.overlay = true;
        this.$store.dispatch("GET_FARES");
        this.$store.dispatch("GET_ROUTES");
        this.$store.dispatch("GET_TICKETS");
        if(this.trip.length < 1){
            this.restoreData()
        }

        // if back button is pressed
        window.onpopstate = () => {
            if(this.trip.length < 1){
                this.restoreData()
            }
        };
        // if page is refreshed
        if (performance.getEntriesByType('navigation')[0].type != 'navigate') {
            this.restoreData();
        }
        if(this.trip){
            this.amOrPM = this.convertTime(this.trip.departure_time);
        }
    },

    watch: {
        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false;
                this.tickets.forEach(item => this.bookedSeats.push(item.seat));
                if(this.bookedSeats){
                    this.bookedSeats.forEach( item => {
                        document.getElementById('seat_'+ item).style.backgroundColor = "#4caf50";
                        document.getElementById('seat_'+ item).disabled = true;
                    })
                }
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

        seats(btn) {
            if(this.selectedSeats | this.selectedSeats === document.getElementById(btn).innerText ){
                document.getElementById('seat_'+this.selectedSeats).style.backgroundColor = ""
            }
            if (document.getElementById(btn).style.backgroundColor === ""){
                document.getElementById(btn).style.backgroundColor = "#1976d2"
            }else {
                document.getElementById(btn).style.backgroundColor = ""
            }
            this.selectedSeats = document.getElementById(btn).innerText
            document.getElementById('pickpoint').focus();
        },

        choice() {
            this.trip["selected_seat"] = this.selectedSeats;
            this.trip["pick_up_point"] = this.pickPoint;
            this.trip["stop_point"] = this.stopPoint;
            this.trip["am_or_pm"] = this.amOrPM;

            if(this.selectedSeats == '' | this.pickPoint == '' | this.stopPoint == '') {
                this.emptyField = true;
            }else{
                if(this.pickPoint === this.stopPoint){
                    this.message = "From and To can't be the same!"
                    this.emptyField = true;
                }else{
                    this.emptyField = false;
                    this.viewPayment(this.trip);
                }
            }
        },

        restoreData() {
            let data = JSON.parse(VueCookie.get('trip'));
            if(data){
                this.$store.dispatch('STORE_TRIP', data);
                this.pickPoint = data.pick_up_point;
                this.stopPoint = data.stop_point;
                this.totalFare = data.total_fare;
                this.selectedSeats = data.selected_seat;
                if(this.selectedSeats){
                    document.getElementById('seat_'+this.selectedSeats).style.backgroundColor = "#1976d2"
                }
            }
        },

        convertTime(time) {
            const hour = time.split(':')[0];
            return  hour >= 12 ? 'PM' : 'AM';
        },

        checkField(){
            if(this.selectedSeats.length < 1 | this.pickPoint == '') {
                this.emptyField = true;
            }else{
                this.emptyField = false;
            }
        },

        viewPayment(trip) {
            this.$store.dispatch('STORE_TRIP', trip)
            this.$router.push({name: 'payment', params: { paymentId: trip.id }});
        }
    }
}
</script>