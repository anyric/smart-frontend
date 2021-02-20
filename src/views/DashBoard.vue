<template>
    <v-layout row wrap class="container ml-1">
        <template v-for="(item, i) in entity">
            <v-card class="mx-auto my-3 pa-3" max-height=125 max-width=300 :key="i" link @click="viewDetails(item.url)" v-if="item.show">
                <v-card color="#385F73" dark max-height=100 max-width=300>
                    <div class="d-flex wrap">
                        <v-avatar class="ma-3" size="80" tile>
                            <v-icon large>{{item.icon}}</v-icon>
                        </v-avatar>
                        <div>
                            <v-card-title><h6 class="text-center text-uppercase">{{item.text}}</h6></v-card-title>
                            <v-card-subtitle>
                                <h1 v-if="(item.url == 'users' )" class="text-center orange--text">{{users.length}}</h1>
                                <h1 v-if="(item.url == 'agents' )" class="text-center orange--text">{{agents.length}}</h1>
                                <h1 v-if="(item.url == 'fleet-register' )" class="text-center orange--text">{{fleets.length}}</h1>
                                <h1 v-if="(item.url == 'fleet-types' )" class="text-center orange--text">{{fleetTypes.length}}</h1>
                                <h1 v-if="(item.url == 'trip-locations' )" class="text-center orange--text">{{locations.length}}</h1>
                                <h1 v-if="(item.url == 'trip-routes' )" class="text-center orange--text">{{routes.length}}</h1>
                                <h1 v-if="(item.url == 'trip-assigned' )" class="text-center orange--text">{{assignTrips.length}}</h1>
                                <h1 v-if="(item.url == 'trip-fares' )" class="text-center orange--text">{{fares.length}}</h1>
                                <h1 v-if="(item.url == 'trip-ticket' )" class="text-center orange--text">{{tickets.length}}</h1>
                                <h1 v-if="(item.url == 'roles' )" class="text-center orange--text">{{roles.length}}</h1>
                                <h1 v-if="(item.url == 'collections' )" class="text-center orange--text">{{collections.length}}</h1>
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-card>
        </template>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    data: () => ({
        overlay: false,
        roleId: 0,
        entity: [
            {name:"users", text: "Total Users", url: "users", icon: "fas fa-users", show: false},
            {name:"agents", text: "Total Agents", url: "agents", icon: "fas fa-handshake", show: false},
            {name:"fleets", text: "Total Fleets", url: "fleet-register", icon: "fas fa-bus-alt", show: false},
            {name:"fleet types", text: "Total Fleet-Types", url: "fleet-types", icon: "fas fa-bus", show: false},
            {name:"collections", text: "Total Collections", url: "collections", icon: "fas fa-user", show: false},
            {name:"fares", text: "Total Fares", url: "trip-fares", icon: "fa fa-credit-card", show: false},
            {name:"tickets", text: "Total Tickets", url: "trip-ticket", icon: "fa fa-credit-card", show: false},
            {name:"roles", text: "Total Roles", url: "roles", icon: "fas fa-user", show: false},
            {name:"locations", text: "Total Locations", url: "trip-locations", icon: "fas fa-map-marker", show: false},
            {name:"routes", text: "Total Routes", url: "trip-routes", icon: "fas fa-road", show: false},
            {name:"schedules", text: "Total Schedules", url: "trip-assigned", icon: "fas fa-suitcase", show: false},
        ],
    }),
    computed: {
        ...mapGetters({
                users: 'USERS',
                roles: 'ROLES',
                agents: 'AGENTS',
                fleets: 'FLEETS',
                fleetTypes: 'FLEET_TYPES',
                locations: 'LOCATIONS',
                routes: 'ROUTES',
                assignTrips: 'ASSIGNED_TRIPS',
                fares: "FARES",
                tickets: "TICKETS",
                collections: "COLLECTIONS",
                roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
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
        this.$store.dispatch("GET_TICKETS");
        this.$store.dispatch("GET_ROLES");
        this.$store.dispatch("GET_COLLECTIONS");
        this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.roleId = JSON.parse(this.$cookie.get('currentUser')).user.pk;
        this.overlay = true;
        this.checkPermissions();
    },

    watch: {
        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 500)
        },
    },

    methods: {
        viewDetails(url){
            this.$router.push({name: url});
        },
        checkPermissions(){
            this.entity.forEach( ent => {
                const rec = this.collections.filter(item => item.name.toLowerCase() === ent.name);
                if(rec.length > 0){
                    if(rec[0].name.toLowerCase() == ent.name){
                        const records =  this.roleObjectPermissions.filter(record => record.objectId == rec[0].id)
                        if(records.length > 0){
                            if(records[0].permissions.split(',').includes('retrieve')){
                                if(records[0].roleId === this.roleId){
                                    ent.show = true;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
  }
</script>