<template>
	<v-layout row wrap>
		<v-row class="container mx-auto">
			<v-col cols="12" class="sm12">
				<v-data-table
				:headers="headers"
				:items="ticketList"
				:search="search"
				sort-by="ticket_no"
				class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar color="white">
							<h2 class="mr-1" color="teal darken-1">Tickets</h2>
							<v-spacer></v-spacer>
							<v-text-field
								v-model="search"
								append-icon="fas fa-search"
								label="Search"
								single-line
								hide-details
								class="mr-1"
							></v-text-field>
							<v-spacer></v-spacer>
							<v-tooltip bottom color="green">
								<template v-slot:activator="{ on }">
								<v-btn
									color="teal darken-1"
									dark
									v-on="on"
									class="mb-2 button-small"
									@click="editItem()"
								>
									<i class="fas fa-plus mr-1"></i> Create New
								</v-btn>
								</template>
								<span>Create New Ticket</span>
							</v-tooltip>
							<v-dialog v-model="dialog" persistent max-width="500px" max-height="300px">
								<v-card>
								<v-card-title>
									<span class="headline">{{ formTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="6" class="sm12">
                                                <v-select
                                                    :items="users"
                                                    label="Passenger *"
                                                    item-text="last_name"
                                                    item-value="id"
                                                    v-model="editedItem.id"
                                                    required
                                                    @select="setUser"
                                                ></v-select>
											</v-col>
                                            <v-col cols="6" class="sm12">
                                                <v-text-field
                                                    required
                                                    v-model="editedItem.mobile"
                                                    label="Mobile Number *"
												></v-text-field>
                                            </v-col>
										</v-row>
										<v-row>
											<v-col cols="6" class="sm12">
                                                <v-select
                                                    :items="assignTrips"
                                                    label="Route *"
                                                    item-text="start_point"
                                                    item-value="id"
                                                    v-model="editedItem.route_name"
                                                    required
                                                ></v-select>
											</v-col>
                                            <v-col cols="6" class="sm12">
                                                <v-text-field
                                                    required
                                                    v-model="editedItem.price_per_person"
                                                    label="Ticket Price *"
                                                ></v-text-field>
                                            </v-col>
										</v-row>
										<v-row>
                                            <v-col cols="6" class="sm12">
                                                <v-text-field
                                                    required
                                                    v-model="editedItem.trip_start_date"
                                                    label="Date *"
                                                ></v-text-field>
                                            </v-col>
											<v-col cols="6" class="sm12">
												<v-menu
													ref="menu"
													v-model="departure_time"
													:close-on-content-click="false"
													:nudge-right="40"
													:return-value.sync="editedItem.departure_time"
													transition="scale-transition"
													offset-y
													max-width="290px"
													min-width="290px"
												>
													<template v-slot:activator="{ on }">
													<v-text-field
														v-model="editedItem.departure_time"
														label="Departure Time *"
														prepend-icon="fa fa-clock"
														required
														v-on="on"
													></v-text-field>
													</template>
													<v-time-picker
														v-if="departure_time"
														v-model="editedItem.departure_time"
														full-width
														@click:minute="$refs.menu.save(editedItem.departure_time)"
													></v-time-picker>
												</v-menu>
											</v-col>
										</v-row>
									</v-container>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="red" dark class="mb-2 mr-5" @click="close">Cancel</v-btn>
									<v-btn color="teal darken-1" dark class="mb-2" @click="save">Create</v-btn>
								</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.action="{ item }">
						<v-tooltip bottom color="primary">
							<template v-slot:activator="{ on }">
								<v-icon
									color="primary"
									small
									v-on="on"
									class="mr-2"
									@click="editItem(item)"
								>mdi-pencil</v-icon>
							</template>
							<span>Edit Ticket</span>
						</v-tooltip>
						<v-tooltip bottom color="red">
							<template v-slot:activator="{ on }">
								<v-icon
									color="red"
									small v-on="on"
									@click="openDialog(item)"
								>mdi-delete</v-icon>
							</template>
							<span>Cancel Ticket </span>
						</v-tooltip>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
		<main-confirm-dialog
		:open="isOpen"
		:id="dialogId"
		:item="dialogItem"
		:items="dialogItems"
		@close-modal="closeDialog"
		></main-confirm-dialog>
	</v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({
		editedItem: {
			id: 0,
			ticket_no: '',
            ticket_trip: '',
            full_name: '',
            mobile: '',
			price_per_person: 0.0,
            trip_start_date: '',
            departure_time: ''
		},
		departure_time: false,
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		dialog: false,
		search: "",
		editedIndex: -1,
		headers: [
		{
			text: "Ticket Number",
			align: "start",
			value: "ticket_no"
		},
		{ text: "Trip", value: "route" },
		{ text: "Type", value: "fleet"},
        { text: "Passenger", value: "last_name" },
        { text: "Mobile", value: "mobile" },
        { text: "Travel Date", value: "trip_start_date" },
        { text: 'Departure Time', value: 'departure_time' },
        { text: "Ticket Cost", value: "price" },
		{ text: "Actions", value: "action", sortable: false }
		]
	}),

	computed: {
		...mapGetters({
			users: "USERS",
			assignTrips: 'ASSIGNED_TRIPS',
			ticketList: 'TICKET_LIST',
			tickets: 'TICKETS',
			fares: "FARES",
			isLoggedIn: "IS_LOGGED_IN"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "Create Ticket" : "Edit Ticket";
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		}
	},

	mounted() {
		if (!this.isLoggedIn) {
			this.$router.push({ name: "login" });
		}
		this.$store.dispatch("GET_ASSIGNED_TRIPS");
		this.$store.dispatch("GET_USERS");
		this.$store.dispatch("GET_TICKETS");
		this.$store.dispatch("GET_TICKET_LIST")
		
	},

	updated() {
		this.mapIdToName();
	},

	methods: {
		editItem(item) {
			if (item){
				let ticket = this.mapNameToId(item);
				this.editedItem = Object.assign({}, ticket)
			}else{
				this.editedItem = Object.assign({}, item)
			}
			this.editedIndex = this.tickets.indexOf(item)
			this.dialog = true;
			this.mapIdToName();
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item) {
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.fares;
			this.isOpen = true;
		},

		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
			this.mapIdToName();
		},

		mapIdToName(){
			this.fares.forEach(element => {
				this.routes.forEach( el => {
					if (element.trip_route == el.id){
						element.trip_route = el.name
					}
                });

                this.fleetTypes.forEach( els => {
					if (element.fleet_type === els.id){
						element.fleet_type = els.name
					}
				});
			});
		},

		mapNameToId(fare) {
			let editedFare = {
                'price_per_person': fare.price_per_person
			};
			this.routes.forEach( el => {
				if (fare.trip_route == el.name){
					fare.trip_route = parseInt(el.id);
					editedFare['trip_route'] = parseInt(el.id);
				}
			});

			this.fleetTypes.forEach( els => {
				if (fare.fleet_type == els.name){
					fare.fleet_type = parseInt(els.id);
					editedFare['fleet_type'] = parseInt(els.id);
				}
			});
			return editedFare;
		},

		createTicketList(){
			// console.log(this.tickets)
			this.tickets.forEach(els => {
				this.assignTrips.forEach(item => {
					if (els.ticket_trip == item.id){
						// console.log(els.ticket_trip + " == " + item.id)
						// console.log(item)
						// console.log(item.departure_time)
						els["trip_start_date"] = item.trip_start_date
						els["departure_time"] = item.departure_time
					}
				});
				this.users.forEach(user => {
					if (els.passenger == user.id){
						// console.log(els.passenger + "==" + user.id)
						// console.log(user)
						els["mobile"] = user.mobile
					}
				})
			});
			// console.log("ticket list")
			// console.log(this.ticket_list)
		},

		setUser() {},
		save() {
			if (this.editedIndex > -1) {
				let fare = {
					pk: this.editedItem.id,
					data:{
						fleet_type: this.editedItem.fleet_type,
						trip_route: this.editedItem.trip_route,
						price_per_person: this.editedItem.price_per_person
					}
				};
				console.log(fare);
				this.$store.dispatch('SAVE_TICKET', fare);
			} else {
				let data = {
					fleet_type: this.editedItem.fleet_type,
					trip_route: this.editedItem.trip_route,
					price_per_person: this.editedItem.price_per_person,
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				console.log(data);
				this.$store.dispatch('SAVE_TICKET', data)
			}
			this.close();
		}
	}
};
</script>