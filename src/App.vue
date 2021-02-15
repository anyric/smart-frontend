<template>
	<v-app id="inspire">
		<!-- Start of Right vertical menu -->
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
			color="blue-grey darken-2"
			v-if="isLoggedIn"
			class="pr-3"
		>
			<!-- Menu List Container -->
			<template>
				<v-list>
					<v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.route" :name="menu.name">
						<v-list-group v-if="menu.children && menu.children.length && menu.show" :key="menu.text">
							<template v-slot:activator>
								<v-list-item-icon>
									<v-icon small color="white darken-2">{{menu.icon}}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
								<v-list-item-title>{{ menu.text }}</v-list-item-title>
								</v-list-item-content>
							</template>
							<!-- children list -->
							<v-list-item v-for="(child, i) in menu.children" :to="child.route" :key="i" link>
								<v-list-item-action v-if="child.show"></v-list-item-action>
								<v-list-item-content class="colored-text" v-if="child.show">
								<v-list-item-title>{{ child.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<!-- end of children list -->
						</v-list-group>
						<v-list-item v-else :key="menu.text" link>
							<v-list-item-icon v-if="menu.show">
								<v-icon small color="white darken-2 mr-1">{{ menu.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-content v-if="menu.show">
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
			color="navbar-dark"
			dark
			v-if="isLoggedIn"
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title style="width: 226px" class="ml-0 pl-0">
				<div class="float-left" v-if="company.length > 0"><img style="width: 40px; height: 40px" :src="company[0].logo" alt="Logo" title="" /></div>
                <div class="text-white text-uppercase font-weight-bold d-flex float-right pt-2 pl-1" style="font-size: 18px;" v-if="company.length > 0"><small>{{ company[0].name }}</small></div>
			</v-toolbar-title>
			<v-spacer />
			<div v-if="isLoggedIn" class="mr-0">
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-avatar class="ml-0 pl-0">
							<img small src="@/assets/images/avatar1.png"/>
						</v-avatar>
						<v-btn
							text
							dark
							v-on="on"
							small
							class="px-1"
						>
							{{currentUser.user.username}}
							<i class="fa fa-caret-down ml-2" aria-hidden="true"></i>
						</v-btn>
					</template>
					<v-list>
						<v-list-item-group>
							<v-list-item @click="openProfile">
								<v-list-item-icon>
									<v-icon small color="orange">fas fa-user-edit</v-icon>
								</v-list-item-icon>
								<v-list-item-content>Edit Profile</v-list-item-content>
							</v-list-item>
							<v-list-item @click="openDialog">
								<v-list-item-icon>
									<v-icon small color="orange">fas fa-edit</v-icon>
								</v-list-item-icon>
								<v-list-item-content>Change Password</v-list-item-content>
							</v-list-item>
							<v-divider></v-divider>
							<v-list-item @click="logout">
								<v-list-item-icon>
									<v-icon small color="orange">fa fa-sign-out</v-icon>
								</v-list-item-icon>
								<v-list-item-content>Logout</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-menu>
			</div>
		</v-app-bar>
		<!-- End of Top Horizontal bar -->
		<v-content>
			<v-container fluid>
				<main-container></main-container>
			</v-container>
			<v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
			<main-password-dialog
				:open="isOpen"
				@close-modal="closeDialog"
			></main-password-dialog>
			<main-profile-dialog
				:open="isOpen1"
				@close-modal="closeDialog"
			></main-profile-dialog>
		</v-content>
		<v-snackbar
			@show-snackbar="showSnackbar"
			v-model="isShowing"
			:color="snackBarColor"
			top
			:timeout="timeout">
			{{ snackBarText }}
			<v-btn text @click="close">
				<v-icon small>fa fa-times</v-icon>
			</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/bus";
export default {
	data: () => ({
		overlay: false,
		items: [
			{
				icon: 'fas fa-user-edit',
				text: 'Edit Profile',
				route: ''
			},
			{
				icon: 'fas fa-edit',
				text: 'Change password',
				route: ''
			},
		],
		isShowing: false,
		snackBarText: "You've successfully logged out!",
		snackBarColor: 'success',
		timeout: 0,
		currentUser: null,
		dialog: false,
		drawer: null,
		isOpen: false,
		isOpen1: false,
		dialogId: 0,
		dialogItem: null,
		dialogItems: null,
		menus: [
		{ route: "/dashboard", icon: "fas fa-tachometer-alt", text: "Dashboard", show: false, name: "dashboard" },
		{ route: "/users", icon: "fas fa-users", text: "Manage Users", show: false, name: "users" },
		{ route: "/agents", icon: "fas fa-handshake", text: "Manage Agents", show: false, name: "agents" },
		{
			icon: "fas fa-bus-alt",
			text: "Manage Fleet",
			show: false,
			name: "fleets",
			children: [
			{ route: "/fleets/types", text: "Fleet Types", name: "fleet types", show: false },
			{ route: "/fleets/register", text: "Register", name: "register", show: false }
			]
		},
		{
			icon: "fas fa-road",
			text: "Manage Trips",
			show: false,
			name: "trips",
			children: [
			{ route: "/trips/locations", text: "Locations", name: "locations", show: false },
			{ route: "/trips/routes", text: "Routes", name: "routes", show: false },
			{ route: "/trips/schedules", text: "Schedules", name: "schedules", show: false },
			{ route: "/trips/fares", text: "Ticket Fares", name: "fares", show: false },
			{ route: "/trips/tickets", text: "Tickets", name: "tickets", show: false },
			{ route: "/bookingboard", text: "Booking", name: "bookings", show: false }
			]
		},
		{
			icon: "mdi-settings",
			text: "Settings",
			show: false,
			name: "settings",
			children: [
			{ route: "/settings/company", text: "Company", name: "company", show: false },
			{ route: "/settings/roles", text: "User Roles", name: "roles", show: false },
			{ route: "/settings/permissions", text: "Permissions", name: "permissions", show: false },
			{ route: "/settings/collections", text: "Collections", name: "collections", show: false },
			{ route: "/settings/role-permissions", text: "Role Permissions", name: "role permissions", show: true }
			]
		},
		]
	}),
	computed: {
		...mapGetters({
			company: "COMPANY",
			isLoggedIn: "IS_LOGGED_IN",
			roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
			collections: "COLLECTIONS",
		}),

		formTitle() {
		return this.editedIndex === -1 ? "Add User" : "Edit User";
		}
	},
	
	mounted() {
        this.$store.dispatch('GET_COMPANY');
		this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
		this.$store.dispatch('GET_COLLECTIONS');
    },
	created() {
		let user = this.$cookie.get('currentUser');
		if(user){
			this.$store.dispatch("SET_CURRENT_USER",JSON.parse(user));
			this.currentUser = JSON.parse(user);
		}

		EventBus.$on('show-snackbar', data => {
			this.showSnackbar(data);
		})
	},

	updated() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
		}
		this.updateMenu();
	},

	watch: {
		overlay (val) {
			val && setTimeout(() => {
			this.overlay = false
			}, 5000)
		},
	},

	methods: {
		closeDialog() {
			this.isOpen = false;
			this.isOpen1 = false;
		},

		showSnackbar(data) {
			this.snackBarText = data.text;
			this.snackBarColor = data.color;
			this.isShowing = true;
		},
		updateMenu(){
			this.menus.forEach(menu =>{
				this.roleObjectPermissions.forEach(role => {
					if(role.roleId === this.currentUser.user.pk){
						var item = this.collections.filter(entity => entity.id == role.objectId);
						if(item[0].name.toLowerCase() === menu.name){
							if(role.permissions.split(',').includes('retrieve')){
								menu.show = true;
							}
						}

						if ('children' in menu) {
							menu.children.forEach(child => {
								if(item[0].name.toLowerCase() === child.name){
									if(role.permissions.split(',').includes('retrieve')){
										child.show = true;
									}
								}
							})

						}
					}
				});
			});
		},
		openDialog(){
			this.isOpen = true;
		},

		close () {
			this.dialog = false
		},

		openProfile() {
			this.isOpen1 = true;
		},


		async logout() {
			this.overlay = true;
			this.$store.dispatch("LOGOUT");
			this.close()
			this.isShowing = true;
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
.theme--light.v-icon {
	color: white;
}
</style>