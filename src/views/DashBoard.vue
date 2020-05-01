<template>
    <v-layout row wrap>
        <template v-for="(item, i) in entity">
            <v-card class="mx-auto my-3 pa-3" :key="i" link @click="viewDetails(item.url)">
                <v-card color="#385F73" dark>
                    <div class="d-flex wrap">
                        <v-avatar class="ma-3" size="100" tile>
                            <v-icon large>{{item.icon}}</v-icon>
                        </v-avatar>
                        <div>
                            <v-card-title><h6 class="text-center text-uppercase">{{item.name}}</h6></v-card-title>
                            <v-card-subtitle><h1 class="text-center orange--text">{{entity.length}}</h1></v-card-subtitle>
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
                isLoggedIn: "IS_LOGGED_IN"
			}),
    },
    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
    },
    methods: {
        viewDetails(url){
            this.$router.push({name: url});
        }
    }
  }
</script>