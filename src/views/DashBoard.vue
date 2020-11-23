<template>
    <v-layout row wrap class="container ml-1">
        <template v-for="(item, i) in entity">
            <v-card class="mx-auto my-3 pa-3" max-height=125 max-width=300 :key="i" link @click="viewDetails(item.url)">
                <v-card color="#385F73" dark max-height=100 max-width=300>
                    <div class="d-flex wrap">
                        <v-avatar class="ma-3" size="80" tile>
                            <v-icon large>{{item.icon}}</v-icon>
                        </v-avatar>
                        <div>
                            <v-card-title><h6 class="text-center text-uppercase">{{item.name}}</h6></v-card-title>
                            <v-card-subtitle>
                                <h1 v-if="(item.url == 'users' )" class="text-center orange--text">{{users.length}}</h1>
                                <h1 v-if="(item.url == 'agents' )" class="text-center orange--text">{{agents.length}}</h1>
                                <h1 v-if="(item.url == 'fleet-register' )" class="text-center orange--text">{{fleets.length}}</h1>
                                <h1 v-if="(item.url == 'fleet-types' )" class="text-center orange--text">{{fleetTypes.length}}</h1>
                                <h1 v-if="(item.url == 'trip-locations' )" class="text-center orange--text">{{locations.length}}</h1>
                                <h1 v-if="(item.url == 'trip-routes' )" class="text-center orange--text">{{routes.length}}</h1>
                                <h1 v-if="(item.url == 'trip-assigned' )" class="text-center orange--text">{{assignTrips.length}}</h1>
                                <h1 v-if="(item.url == 'trip-fares' )" class="text-center orange--text">{{fares.length}}</h1>
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-card>
        </template>
    </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    data: () => ({
        entity: [
            {name: "Total Users", url: "users", icon: "fas fa-users"},
            {name: "Total Agents", url: "agents", icon: "fas fa-handshake"},
            {name: "Total Fleets", url: "fleet-register", icon: "fas fa-bus-alt"},
            {name: "Total Fleet-Types", url: "fleet-types", icon: "fas fa-bus"},
            {name: "Total Locations", url: "trip-locations", icon: "fas fa-map-marker"},
            {name: "Total Routes", url: "trip-routes", icon: "fas fa-road"},
            {name: "Total Trips", url: "trip-assigned", icon: "fas fa-suitcase"},
            {name: "Total Fares", url: "trip-fares", icon: "fa fa-credit-card"},
        ],
    }),
    computed: {
        ...mapGetters({
                users: 'USERS',
                agents: 'AGENTS',
                fleets: 'FLEETS',
                fleetTypes: 'FLEET_TYPES',
                locations: 'LOCATIONS',
                routes: 'ROUTES',
                assignTrips: 'ASSIGNED_TRIPS',
                fares: "FARES",
                isLoggedIn: "IS_LOGGED_IN"
            }),
    },
    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
        this.$store.dispatch('GET_USERS')
        this.$store.dispatch('GET_AGENTS');
        this.$store.dispatch("GET_FLEET_TYPES");
        this.$store.dispatch('GET_FLEETS');
        this.$store.dispatch('GET_ASSIGNED_TRIPS');
        this.$store.dispatch('GET_LOCATIONS');
		this.$store.dispatch("GET_ROUTES");
        this.$store.dispatch("GET_FARES");
    },
    methods: {
        viewDetails(url){
            this.$router.push({name: url});
        }
    }
  }
</script>