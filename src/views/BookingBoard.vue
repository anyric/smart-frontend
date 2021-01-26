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
                            Type
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
                            <td>{{ item.trip_start_date }} ({{ item.departure_time }} {{ item.departure_time.split(':')[0] >= 12 ? 'PM' : 'AM' }})</td>
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
export default {
    data: () => ({
        overlay: false,
        items: [],
        pickUpPoints: []
    }),

    computed: {
        ...mapGetters({
            routes: 'ROUTES',
            locations: 'LOCATIONS',
            schedule: "TRIP_SCHEDULE",
            company: 'COMPANY',
            isLoggedIn: "IS_LOGGED_IN"
		}),
    },
    mounted() {
        this.overlay = true;
        this.$store.dispatch('GET_LOCATIONS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_TRIP_SCHEDULE');
        this.$store.dispatch('GET_COMPANY');
    },

    watch: {
        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 1000)
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
        }
    }
}
</script>