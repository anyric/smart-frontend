<template>
  <v-app id="inspire">
    <!-- Start of Right vertical menu -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color="blue-grey darken-2"
      v-if="isLoggedIn"
    >
      <!-- Menu List Container -->
      <template>
        <v-list>
          <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.route">
            <v-list-group v-if="menu.children && menu.children.length" :key="menu.text">
              <template v-slot:activator>
                <v-list-item-action>
                  <v-icon small color="white darken-2">{{menu.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ menu.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <!-- children list -->
              <v-list-item v-for="(child, i) in menu.children" :to="child.route" :key="i" link>
                <v-list-item-action></v-list-item-action>
                <v-list-item-content class="colored-text">
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- end of children list -->
            </v-list-group>
            <v-list-item v-else :key="menu.text" link>
              <v-list-item-action>
                <v-icon small color="white darken-2 mr-1">{{ menu.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ menu.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <!-- End of Right vertical Menu -->
    <!-- Start of Top Horizontal bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="teal darken-1"
      dark
      v-if="isLoggedIn"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Smart Traveller</span>
      </v-toolbar-title>
      <v-spacer />
      <div v-if="isLoggedIn">
        {{currentUser.user.username}}
        <v-btn icon width="100px" rounded color="white" class="mr-5" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <!-- End of Top Horizontal bar -->
    <v-content>
      <v-container fluid>
        <main-container></main-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({
		currentUser: null,
		dialog: false,
		drawer: null,
		menus: [
		{ route: "/dashboard", icon: "fas fa-tachometer-alt", text: "Dashboard" },
		{ route: "/users", icon: "fas fa-users", text: "Manage Users" },
		{ route: "/agents", icon: "fas fa-handshake", text: "Manage Agents" },
		{
			icon: "fas fa-bus-alt",
			"icon-alt": "fas fa-chevron-down",
			text: "Manage Fleet",
			children: [
			{ route: "/fleets/types", text: "Types" },
			{ route: "/fleets/register", text: "Register" }
			]
		},
		{
			icon: "fas fa-road",
			"icon-alt": "fas fa-chevron-down",
			text: "Manage Trips",
			children: [
			{ route: "/trips/locations", text: "Locations" },
			{ route: "/trips/routes", text: "Routes" },
			{ route: "/trips/assignments", text: "Assign Fleets" },
			{ route: "/trips/fares", text: "Ticket Fares" }
			]
		},
		{ route: "/settings", icon: "mdi-settings", text: "Settings" }
		]
	}),
	computed: {
		...mapGetters({
			isLoggedIn: "IS_LOGGED_IN"
		}),

		formTitle() {
		return this.editedIndex === -1 ? "Add User" : "Edit User";
		}
	},
	created() {
		let user = this.$cookie.get('currentUser');
		if(user){
			this.$store.dispatch("SET_CURRENT_USER",JSON.parse(user));
			this.currentUser = JSON.parse(user);
		}
		
	},
	methods: {
		async logout() {
			this.$store.dispatch("LOGOUT", false);
		}
	}
};
</script>
<style scoped>
.colored-text {
  color: white;
}
.v-list-item__title {
  color: white;
}
</style>