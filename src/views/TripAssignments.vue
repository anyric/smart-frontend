<template>
    <v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
        <v-data-table
            :headers="headers"
            :items="assignTrips"
            :search="search"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar color="white">
                    <h2 class="mr-1" color="teal darken-1">Trips</h2>
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
                        <v-btn color="teal darken-1" dark v-on="on" class="mb-2 button-small" @click="editItem()"><i class="fas fa-plus mr-1"></i> Add New</v-btn>
                      </template>
                      <span>Assign Fleet</span>
                    </v-tooltip>
                    <v-dialog v-model="dialog" persistent max-width="600px" max-height="300px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col col="6" class="sm12">
                                            <v-select
                                                :items="fleets"
                                                label="Registration No *"
                                                item-text="registration_no"
                                                item-value="id"
                                                v-model="editedItem.fleet_registration_no"
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col col="6" class="sm12">
                                            <v-select
                                                :items="routes"
                                                label="Route *"
                                                item-text="name"
                                                item-value="id"
                                                v-model="editedItem.route_name"
                                                required
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="5" class="sm12">
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
                                                        label="Start Date"
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
                                        <v-col cols="5" class="sm12">
                                            <v-menu
                                                v-model="end_date"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    required
                                                    v-model="editedItem.trip_end_date"
                                                    label="End Date"
                                                    prepend-icon="fa fa-calendar"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="editedItem.trip_end_date"
                                                    @input="end_date = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="2" class="sm12">
                                            <v-checkbox required v-model="editedItem.status" label="Active"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="red" dark class="mb-2" @click="close">Cancel</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="teal darken-1" dark class="mb-2" @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" small v-on="on" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                </template>
                <span>Edit Assignment</span>
              </v-tooltip>
              <v-tooltip bottom color="red">
                <template v-slot:activator="{ on }">
                <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                </template>
                <span>Delete Assignment</span>
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
import {mapGetters} from "vuex";
export default {
    data: () => ({
		editedItem: {
			fleet_registration_no: '',
			route_name: '',
			trip_start_date: '',
			trip_end_date: '',
			status: '',
        },
        start_date: false,
        end_date: false,
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		dialog: false,
		search: '',
		editedIndex: -1,
		headers: [
			{
			text: 'Registration No',
			align: 'start',
			value: 'fleet_registration_no',
			},
			{ text: 'Route Name', value: 'route_name' },
			{ text: 'Start Date', value: 'trip_start_date' },
			{ text: 'End Date', value: 'trip_end_date' },
			{ text: 'Active', value: 'status' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
                fleets: 'FLEETS',
                routes: 'ROUTES',
                assignTrips: 'ASSIGNED_TRIPS',
                isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Assignment' : 'Edit Assignment'
		},
    },

    watch: {
		dialog (val) {
			val || this.close()
		},
    },

    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
        this.$store.dispatch('GET_FLEETS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_ASSIGNED_TRIPS');
    },

    updated() {
		this.mapIdToName();
    },

    methods: {
		editItem (item) {
            if (item){
				let assignFleet = this.mapNameToId(item);
				this.editedItem = Object.assign({}, assignFleet)
			}else{
				this.editedItem = Object.assign({}, item)
			}
			this.editedIndex = this.assignTrips.indexOf(item)
            this.dialog = true
            this.mapIdToName()
		},

        closeDialog() {
			this.isOpen = false;
        },

        openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.assignTrips
			this.isOpen = true;
        },

		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
            }, 300)
            this.mapIdToName()
		},

        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}-${month}-${year}`
        },

        mapIdToName(){
			this.assignTrips.forEach(element => {
				this.routes.forEach( el => {
					if (element.route_name == parseInt(el.id)){
						element.route_name = el.name
					}
                });

                this.fleets.forEach( els => {
					if (element.fleet_registration_no === els.id){
						element.fleet_registration_no = els.registration_no
					}
				});
			});
        },

        mapNameToId(assignedFleet) {
			let editedAssignedFleet = {
                'trip_start_date': assignedFleet.trip_start_date,
                'trip_end_date': assignedFleet.trip_end_date,
                'status': assignedFleet.status
			};
			this.assignTrips.forEach( element => {
                this.routes.forEach( el => {
					if (element.route_name == el.name){
                        element.route_name = parseInt(el.id);
                        editedAssignedFleet['route_name'] = parseInt(el.id);
					}
                });

                this.fleets.forEach( els => {
					if (element.fleet_registration_no === els.registration_no){
                        element.fleet_registration_no = parseInt(els.id);
                        editedAssignedFleet['fleet_registration_no'] = parseInt(els.id);
					}
				});
			});
			return editedAssignedFleet;
		},

		save () {
			if (this.editedIndex > -1) {
                let assignedTrip = {
					pk : this.editedItem.id,
					data: {
                        fleet_registration_no: this.editedItem.fleet_registration_no,
                        route_name: this.editedItem.route_name,
						trip_start_date: this.editedItem.trip_start_date,
						trip_end_date: this.editedItem.trip_end_date,
						status: this.editedItem.status
					}
				};
				console.log(assignedTrip);
				this.$store.dispatch('SAVE_ASSIGNED_TRIP', assignedTrip);
			} else {
                let assignedTrip = {
                        fleet_registration_no: this.editedItem.fleet_registration_no,
                        route_name: this.editedItem.route_name,
						trip_start_date: this.editedItem.trip_start_date,
						trip_end_date: this.editedItem.trip_end_date,
                        status: this.editedItem.status,
                        created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				console.log(assignedTrip);
				this.$store.dispatch('SAVE_ASSIGNED_TRIP', assignedTrip);
			}
			this.close()
		},
    },
}
</script>