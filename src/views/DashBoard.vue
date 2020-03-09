<template>
    <v-layout row wrap>
        <template v-for="(item, i) in entity">
            <v-card class="mx-auto my-3 pa-3" :key="i" link @click="viewDetails(item.url)">
                <v-card color="#385F73" dark>
                    <div class="d-flex wrap">
                        <v-avatar class="ma-3" size="100" tile>
                            <v-img :src="items[0].src"></v-img>
                        </v-avatar>
                        <div>
                            <v-card-title><h6 class="text-center text-uppercase">{{item.name}}</h6></v-card-title>
                            <v-card-subtitle><h1 class="text-center orange--text">{{items.length}}</h1></v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-card>
        </template>
    </v-layout>
</template>

<script>
  export default {
    data: () => ({
        entity: [
            {"name": "Total Users", "url": "users"},
            {"name": "Total Agents", "url": "agents"},
            {"name": "Total Fleets", "url": "fleet-register"},
            {"name": "Total Fleet-Types", "url": "fleet-types"},
            {"name": "Total Locations", "url": "trip-locations"},
            {"name": "Total Routes", "url": "trip-routes"},
            {"name": "Total Trips", "url": "trip-assign"},
            {"name": "Total Fares", "url": "trip-fares"},
        ],
        items: [
            {
            color: '#1F7087',
            src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            title: 'Supermodel',
            artist: 'Foster the People',
            },
            {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
            },
        ],
    }),
    methods: {
        viewDetails(url){
            this.$router.push({name: url});
        }
    }
  }
</script>