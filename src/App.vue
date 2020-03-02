<template>
  <v-app id="inspire">
    <!-- Start of Right vertical menu -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app color="blue-grey darken-2">
      <!-- Menu List Container -->
      <template>
        <v-list>
          <v-list-item v-for='(menu, i) in menus' :key="i" :to="menu.route">
            <v-list-group v-if='menu.children && menu.children.length'  :key="menu.text">

              <template v-slot:activator>
                <v-list-item-action>
                  <v-icon small color="white darken-2">{{menu.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ menu.text }}
                  </v-list-item-title>
                  </v-list-item-content>
              </template>
              <!-- children list -->
              <v-list-item v-for="(child, i) in menu.children" :to="child.route" :key="i" link>
                <v-list-item-action>
                </v-list-item-action>
                <v-list-item-content class="colored-text">
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- end of children list -->
            </v-list-group>
            <v-list-item v-else :key="menu.text" link>
              <v-list-item-action>
                <v-icon small color="white darken-2 mr-1">{{ menu.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ menu.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <!-- End of Right vertical Menu -->
    <!-- Start of Top Horizontal bar -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="teal darken-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Smart Traveller</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon width="100px" rounded color="white" class="mr-5">
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </v-btn>
    </v-app-bar>
    <!-- End of Top Horizontal bar -->
    <v-content>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      menus: [
        { route: '/', icon: 'fas fa-tachometer-alt', text: 'Dashboard' },
        { route: '/users', icon: 'fas fa-users', text: 'Manage Users' },
        { route: '/agents', icon: 'fas fa-handshake', text: 'Manage Agents' },
        { 
          icon: 'fas fa-bus-alt',
          'icon-alt': 'mdi-chevron-down',
          text: 'Manage Fleet',
          children: [
            { route: '/fleets/types', text: 'Fleet types' },
            { route: '/fleets/register', text: 'Fleet Register' },
          ]},
        { 
          icon: 'fas fa-road',
          'icon-alt': 'mdi-chevron-down',
          text: 'Manage Trip',
          children: [
            { route: '/trips/locations', text: 'Locations' },
            { route: '/trips/routes', text: 'Routes' },
            { route: '/trips/assign', text: 'Assign Trips'},
            { route: '/trips/fares', text: 'Trip Fares' },
          ]},
        { route: '/settings', icon: 'mdi-settings', text: 'Settings' },
      ],
    }),
  }
</script>
<style scoped>
.colored-text {
  color: white;
}
.v-list-item__title{
  color: white;
}
.v-list-item__v-icon{
  color: white;
}
</style>