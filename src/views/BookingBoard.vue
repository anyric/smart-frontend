<template>
    <div>
        <!-- Start of header -->
        <main-navbar v-if="!isLoggedIn"></main-navbar>
        <!-- End of header -->
        <!-- Start of main content -->
        <v-row class="container justify-center mt-100">
            <div class="my-5 py-3 ml-2 px-0">
                <h5 class="pb-5 text-dark">
                    Select your travel route to view the sitting arrangement and pick your seat.
                </h5>
            </div>
        </v-row>
        <v-row class="container justify-center px-10">
            <v-select
                class="px-10"
                :items="branches"
                label="From *"
                item-text="name"
                item-value="name"
                id="from"
                v-model="from"
                required
            ></v-select>
            <v-select
                class="pl-10"
                :items="branches"
                label="To *"
                item-text="name"
                item-value="name"
                id="to"
                v-model="to"
                required
            ></v-select>
            <v-menu
                v-model="travel_date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        class="pl-10"
                        required
                        v-model="trip_date"
                        label="Travel Date"
                        prepend-icon="fa fa-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="trip_date"
                    @input="travel_date = false"
                    @change="filterRoutes"
                ></v-date-picker>
            </v-menu>
        </v-row>
        <div class="container px-0">
            <v-simple-table
                fixed-header
                height="300px"
                style="width: 90%"
                class="table-responsive container px-0"
                
            >
                <template v-slot:default>
                    <thead v-if="!noRecord">
                        <tr>
                            <th class="text-left">
                            Date
                            </th>
                            <th class="text-left">
                            Time
                            </th>
                            <th class="text-left">
                            Route
                            </th>
                            <th class="text-left">
                            Type
                            </th>
                            <th class="text-left">
                            View Seat
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in filteredSchedule"
                            :key="item.id"
                        >
                            <td>{{ item.trip_start_date }}</td>
                            <td>{{ item.departure_time }} {{ item.departure_time.split(':')[0] >= 12 ? 'PM' : 'AM' }}</td>
                            <td>{{ item.route_name }}</td>
                            <td>{{ item.fleet_type }}</td>
                            <td>
                                <v-btn 
                                    color="warning"
                                    elevation="0"
                                    small
                                    @click="viewSchedule(item)"
                                    >
                                        <v-icon small>mdi-eye</v-icon>
                                        View Seats
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" v-if="noRecord">
                                <span> <strong> No schedule(s) found!, Please try again. </strong></span>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <!-- End of main content -->
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
import { EventBus } from "@/services/bus";
export default {
    data: () => ({
        overlay: false,
        travel_date: false,
        trip_date: '',
        items: [],
        pickUpPoints: [],
        from: '',
        to: '',
        filteredSchedule: [],
        noRecord: false
    }),

    computed: {
        ...mapGetters({
            routes: 'ROUTES',
            locations: 'LOCATIONS',
            schedule: "TRIP_SCHEDULE",
            company: 'COMPANY',
            branches: 'BRANCH',
            isLoggedIn: "IS_LOGGED_IN"
		}),
    },
    mounted() {
        this.$store.dispatch('GET_LOCATIONS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_TRIP_SCHEDULE');
        this.$store.dispatch('GET_COMPANY');
        this.$store.dispatch("GET_BRANCH");
        this.filteredSchedule = this.schedule;
        this.overlay = true;
    },

    updated() {
        this.filterRoutes()
    },

    watch: {
        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 500)
        },
    },
    
    methods: {
        viewSchedule(trip) {
            const route = this.routes.filter(item => item.name === trip.route_name)
            this.locations.filter(item =>  {
                if (route[0].stopage_points.includes(item.id)) {
                    this.pickUpPoints.push({'id': item.id, 'name': item.name});
                }
            });
            trip['pick_up_points'] = this.pickUpPoints;
            this.$store.dispatch('STORE_TRIP', trip);
            const fleet_type = trip.fleet_type.split(" ")[0];

            if(fleet_type === 'Universal'){
                this.$router.push({name: 'schedule', params: { scheduleId: trip.id }});
            }else{
                this.$router.push({name: 'premiumschedule', params: { scheduleId: trip.id }});
            }
        },

        filterRoutes() {
            if (this.from && this.to && this.trip_date) {
                this.filteredSchedule = [];
                this.filteredSchedule = this.schedule.filter(route => route.route_name === this.from + ' - '+ this.to && route.trip_start_date === this.trip_date );
                this.noRecord = false;
            }

            if(this.from !== '' && this.to !== '' && this.from === this.to ){
                EventBus.$emit("show-snackbar", {
                    text: "From and To can't be the same!",
                    color: "red",
                });
            }

            if((this.from && this.to) && this.trip_date || !this.from === this.to){
                this.filteredSchedule = []
                this.filteredSchedule = this.schedule.filter(route => route.route_name === this.from + ' - '+ this.to && route.trip_start_date === this.trip_date );
                if(this.filteredSchedule.length < 1){
                    this.noRecord = true;
                }
            }
        }
    }
}
</script>