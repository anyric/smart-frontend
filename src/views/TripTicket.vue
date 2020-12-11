<template>
	<v-layout row wrap>
		<v-row class="container mx-auto">
			<v-col cols="12" class="sm12">
				<v-data-table
					:headers="headers"
					:items="tickets"
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
							<v-tooltip bottom color="green">
								<template v-slot:activator="{ on }">
									<v-btn
										color="teal darken-1"
										dark
										v-on="on"
										class="mb-2 ml-2 button-small"
										@click="generateReport()">
										<i class="fa fa-file-pdf mr-1"></i> View PDF
									</v-btn>
								</template>
								<span>View PDF Report</span>
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
												<v-text-field
                                                    required
                                                    v-model="editedItem.passenger_name"
                                                    label="Passenger Name *"
												></v-text-field>
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
											<v-col col="6" class="sm12">
												<v-select
													:items="routes"
													label="Trip Route *"
													item-text="name"
													item-value="id"
													v-model="editedItem.ticket_trip"
													required
												></v-select>
											</v-col>
											<v-col col="6" class="sm12">
												<v-select
													:items="fleets"
													label="Bus *"
													item-text="registration_no"
													item-value="id"
													v-model="editedItem.fleet_registration_no"
													required
												></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col col="5" class="sm12">
												<v-select
													:items="fleetTypes"
													label="Trip *"
													item-text="name"
													item-value="id"
													v-model="editedItem.fleet_type"
													required
												></v-select>
											</v-col>
											<v-col cols="3" class="sm12">
                                                <v-text-field
                                                    required
                                                    v-model="editedItem.seat"
                                                    label="Seat No *"
												></v-text-field>
                                            </v-col>
                                            <v-col cols="4" class="sm12">
												<v-text-field
													required
													v-model="editedItem.price"
													label="Ticket Price *"
												></v-text-field>
                                            </v-col>
										</v-row>
										<v-row>
											<v-col cols="6" class="sm12">
												<v-menu
													v-model="start_date"
													:close-on-content-click="false"
													:nudge-right="40"
													transition="scale-transition"
													offset-y
													min-width="290px"
												>
													<template v-slot:activator="{ on }">
														<v-text-field
															required
															v-model="editedItem.trip_start_date"
															label="Travel Date"
															prepend-icon="fa fa-calendar"
															readonly
															v-on="on"
														></v-text-field>
													</template>
													<v-date-picker
														v-model="editedItem.trip_start_date"
														@input="start_date = false"
													></v-date-picker>
												</v-menu>
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
									<v-btn color="teal darken-1" dark class="mb-2" @click="save">{{ actionButton }}</v-btn>
								</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:item.action="{ item }">
						<v-tooltip bottom color="green">
							<template v-slot:activator="{ on }">
								<v-icon
									color="green"
									small
									v-on="on"
									@click="viewItem(item)"
								>mdi-eye</v-icon>
							</template>
							<span>View Ticket</span>
						</v-tooltip>
						<v-tooltip bottom color="primary">
							<template v-slot:activator="{ on }">
								<v-icon
									color="primary"
									small
									v-on="on"
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
		<div class="text-center">
			<v-dialog
				v-model="viewDialog"
				width="500"
			>
				<v-card id="ticket">
					<div class="mt-0 pt-0 text-right">
						<v-btn
							
							color="red"
							text
							@click="viewDialog = false"
						>
							<i class="fa fa-times" aria-hidden="true"></i>
						</v-btn>
					</div>
					<v-card-subtitle class="mb-0 pb-0">
						<v-row>
							<v-col cols="9" class="sm12 font-weight-bold py-1">
								<i class="fas fa-bus-alt mr-1"></i>ZAWADI BUS SERVICES
							</v-col>
							<v-col cols="3" class="sm12 py-1 text-right ">
							</v-col>
						</v-row>
						<v-row class="mt-0 mb-0">
							<v-col cols="5" class="sm12 py-1">
								<div class="ml-5 pl-0">P.O.Box 770 Arua</div>
							</v-col>
							<v-col cols="7" class="sm12 pb-0 pt-1 text-right">
								<small> SEAT NO. <strong> {{ viewTicket.seat}} </strong></small>
							</v-col>
						</v-row>
					</v-card-subtitle>
					<v-card-text class="mt-0 pt-0">
						<v-row>
							<v-col cols="5" class="mt-0 mb-0 pb-0 pt-0"> 
								<small> BUS NO.<strong> {{ viewTicket.fleet_registration_no }} </strong></small>
							</v-col>
							<v-col cols="7" class=" mt-0 mb-0 pb-0 pt-0">
								<small> RECEIPT NO. <strong> {{ viewTicket.ticket_no }} </strong></small>
							</v-col>
						</v-row>
						<v-divider></v-divider>
						<v-row>
							<v-col cols="7" class="sm12 pt-2">
								<strong> NAME OF PASSENGER </strong> <br />
								{{ viewTicket.passenger_name }}
							</v-col>
							<v-col cols="5" class="sm12 pt-2">
								<strong> JOURNEY: </strong>
								<br />
								{{ viewTicket.ticket_trip }}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4" class="sm12 pt-0">
								<strong> BOOKING DATE: </strong>
							</v-col>
							<v-col cols="3" class="sm12 pt-0">
								{{  viewTicket.trip_start_date }}
							</v-col>
							<v-col cols="5" class="sm12 pt-0">
								<strong> TRIP: </strong>
								<br />
								{{ viewTicket.fleet_type }}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4" class="sm12 pt-0">
								<strong> TRAVEL DATE: </strong> <br />
							</v-col>
							<v-col cols="3" class="sm12 pt-0">
								{{  viewTicket.trip_start_date }}
							</v-col>
							<v-col cols="5" class="sm12 pt-0">
								<strong> BOOKING CLERK: </strong>
								<br />
								{{ viewTicket.created_by }}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4" class="sm12 pt-0">
								<strong> REPORTING TIME: </strong> <br />
							</v-col>
							<v-col cols="3" class="sm12 pt-0">
								{{  viewTicket.departure_time }}
							</v-col>
							<v-col cols="5" class="sm12 pt-0">
								<strong> FARE: </strong>
								<br />
								{{ viewTicket.price }}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4" class="sm12 pt-0">
								<strong> DEPARTURE TIME: </strong>
							</v-col>
							<v-col cols="4" class="sm12 pt-0">
								{{  viewTicket.departure_time }}
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<small><b> Valid Only For The Date of Travel</b></small>
						<v-spacer></v-spacer>
						<v-btn
							outlined
							text
							rounded
							small
							@click="printTicket()"
						>
							<i class="fa fa-print" aria-hidden="true"></i> Print
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<main-confirm-dialog
			:open="isOpen"
			:id="dialogId"
			:item="dialogItem"
			:items="dialogItems"
			:itemType="itemType"
			@close-modal="closeDialog"
		></main-confirm-dialog>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
	</v-layout>
</template>
<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/bus";
import { ticketReport, printTicket } from "@/services/helper";
export default {
	data: () => ({
		overlay: false,
		editedItem: {
			id: 0,
			ticket_no: '',
            passenger_name: '',
			mobile: '',
			ticket_trip: '',
			fleet_registration_no: '',
			fleet_type: '',
			seat: '',
			price: 0.0,
            trip_start_date: '',
            departure_time: ''
		},
		ticketDetail: {
			ticket_no: '',
            passenger_name: '',
			mobile: '',
			ticket_trip: '',
			fleet_registration_no: '',
			fleet_type: '',
			seat: '',
			price: 0.0,
            trip_start_date: '',
            departure_time: ''
		},
		departure_time: false,
		start_date: false,
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		itemType: "",
		dialog: false,
		viewDialog: false,
		search: "",
		editedIndex: -1,
		headers: [
		{
			text: "Ticket Number",
			align: "start",
			value: "ticket_no"
		},
		{ text: "Trip Route", value: "ticket_trip" },
		{ text: "Trip Type", value: "fleet_type"},
        { text: "Passenger", value: "passenger_name" },
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
			fleets: 'FLEETS',
			fleetTypes: 'FLEET_TYPES',
			routes: 'ROUTES',
			tickets: 'TICKETS',
			fares: "FARES",
			isLoggedIn: "IS_LOGGED_IN"
		}),

		formTitle() {
			return this.editedIndex === -1 ? "Create Ticket" : "Edit Ticket";
		},

		actionButton() {
			return this.editedIndex === -1 ? "Create" : "Update";
		},

		viewTicket() {
			return this.ticketDetail
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
        overlay (val) {
            val && setTimeout(() => {
				this.overlay = false
            }, 1000)
        },
	},

	mounted() {
		if (!this.isLoggedIn) {
			this.$router.push({ name: "login" });
		}
		this.overlay = true;
		this.$store.dispatch("GET_ASSIGNED_TRIPS");
		this.$store.dispatch("GET_USERS");
		this.$store.dispatch('GET_ROUTES');
		this.$store.dispatch('GET_FLEETS');
		this.$store.dispatch('GET_FLEET_TYPES');
		this.$store.dispatch("GET_FARES");
		this.$store.dispatch("GET_TICKETS");
		
	},

	created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
	},

	updated() {
		this.mapIdToName();
	},

	methods: {
		viewItem(item) {
			this.viewDialog = true
			this.ticketDetail = item
		},
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
			this.dialogItems = this.tickets;
			this.itemType = "TICKETS";
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
			});

			this.tickets.forEach(el => {
				this.fleets.forEach(li => {
					if (el.fleet_registration_no == li.id){
						el.fleet_registration_no = li.registration_no
					}
				});

				this.fleetTypes.forEach(li => {
					if (el.fleet_type == li.id){
						el.fleet_type = li.name
					}
				});

				this.routes.forEach( le => {
					if (el.ticket_trip == le.id){
						el.ticket_trip = le.name
					}
				});
				
				this.fares.forEach( le => {
					if (el.price == le.id){
						el.price = le.price_per_person
					}
				});
				
				this.users.forEach( le => {
					if (el.created_by == le.id){
						el.created_by = le.first_name + ' ' + le.last_name
					}
				});
			});
		},

		mapNameToId(ticket) {
			this.routes.forEach( el => {
				if (ticket.ticket_trip == el.name){
					ticket.ticket_trip = parseInt(el.id);
				}
			});

			this.fleetTypes.forEach( els => {
				if (ticket.fleet_type == els.name){
					ticket.fleet_type = parseInt(els.id);
				}
			});
			this.tickets.forEach(el => {
				this.fares.forEach(li => {
					if (el.price == li.price_per_person){
						el.price = parseInt(li.id)
					}
				});
				this.fleets.forEach(li => {
					if (el.fleet_registration_no == li.registration_no){
						el.fleet_registration_no = parseInt(li.id)
					}
				});

				this.fleetTypes.forEach(li => {
					if (el.fleet_type == li.name){
						el.fleet_type = parseInt(li.id)
					}
				});

				this.fares.forEach( le => {
					if (el.price == parseInt(le.id)){
						el.price = le.price_per_person
					}
                });
			});
			return ticket;
		},

		save() {
			if (this.editedIndex > -1) {
				let ticket = {
					pk: this.editedItem.id,
					data:{
						passenger_name: this.editedItem.passenger_name,	
						mobile: this.editedItem.mobile,
						ticket_trip: this.editedItem.ticket_trip,
						fleet_registration_no: this.editedItem.fleet_registration_no,
						fleet_type: this.editedItem.fleet_type,
						seat: this.editedItem.seat,
						price: this.editedItem.price,
						trip_start_date: this.editedItem.trip_start_date,
						departure_time: this.editedItem.departure_time,
						status: 'travelling'
					}
				};
				this.$store.dispatch('SAVE_TICKET', ticket);
			} else {
				let data = {
					passenger_name: this.editedItem.passenger_name,	
					mobile: this.editedItem.mobile,
					ticket_trip: this.editedItem.ticket_trip,
					fleet_registration_no: this.editedItem.fleet_registration_no,
					fleet_type: this.editedItem.fleet_type,
					seat: this.editedItem.seat,
					price: this.editedItem.price,
					trip_start_date: this.editedItem.trip_start_date,
					departure_time: this.editedItem.departure_time,
					status: 'travelling',
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				this.$store.dispatch('SAVE_TICKET', data)
			}
			this.close();
		},

		delete(data) {
			if (data.type == "TICKETS") {
				this.$store.dispatch('DELETE_TICKET', data);
			}
		},

		generateReport() {
			return ticketReport(this.tickets)
		},

		printTicket() {
			return printTicket(this.ticketDetail)
		}
	}
};
</script>