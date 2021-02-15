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
                            <h2 class="mr-1" color="teal darken-1">Schedules</h2>
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
                            <v-tooltip bottom color="green" v-if="canAdd">
                            <template v-slot:activator="{ on }">
                                <v-btn color="teal darken-1" dark v-on="on" class="mb-2 button-small" @click="editItem()"><i class="fas fa-plus mr-1"></i> Add New</v-btn>
                            </template>
                            <span>Schedule Fleet</span>
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
                                                <v-col cols="6" class="sm12">
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
                                            </v-row>
                                            <v-row>
                                                <v-col cols="11" sm="5">
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
                                                        <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="editedItem.departure_time"
                                                            label="Departure Time"
                                                            prepend-icon="fa fa-clock"
                                                            readonly
                                                            v-bind="attrs"
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
                                                <v-col cols="1" class="sm12">
                                                    <v-checkbox required v-model="editedItem.status" label="Active"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" dark class="mb-2 mr-5" @click="close">Cancel</v-btn>
                                        <v-btn color="teal darken-1" dark class="mb-2" @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-tooltip bottom color="primary" v-if="canEdit">
                            <template v-slot:activator="{ on }">
                            <v-icon color="primary" small v-on="on" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            </template>
                            <span>Edit Assignment</span>
                        </v-tooltip>
                        <v-tooltip bottom color="red" v-if="canDelete">
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
            :itemType="itemType"
            @close-modal="closeDialog"
        ></main-confirm-dialog>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
import { EventBus } from "@/services/bus";
import { idToNameTrips, tripReport } from "@/services/helper";
export default {
    data: () => ({
        overlay: false,
        canAdd: false,
        canEdit: false,
        canDelete: false,
		editedItem: {
            id: 0,
			fleet_registration_no: '',
			route_name: '',
			trip_start_date: '',
			trip_end_date: '',
            departure_time: '',
			status: '',
        },
        departure_time: false,
        modal2: false,
        start_date: false,
        end_date: false,
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
        dialogItem: null,
        itemType: "",
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
            { text: 'Departure Time', value: 'departure_time' },
			{ text: 'Active', value: 'status' },
		],
    }),

    computed: {
		...mapGetters({
                fleets: 'FLEETS',
                routes: 'ROUTES',
                assignTrips: 'ASSIGNED_TRIPS',
                company: 'COMPANY',
                collections: "COLLECTIONS",
                roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
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
        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 1000)
        },
    },

    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
        this.$store.dispatch('GET_FLEETS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_ASSIGNED_TRIPS');
		this.$store.dispatch('GET_LOCATIONS');
        this.$store.dispatch("GET_COMPANY");
        this.$store.dispatch("GET_COLLECTIONS");
		this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.checkPermissions();
        this.overlay = true;
    },

    updated() {
        idToNameTrips(this.assignTrips, this.routes, this.fleets);
    },

	created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
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
            idToNameTrips(this.assignTrips, this.routes, this.fleets);
		},

        closeDialog() {
			this.isOpen = false;
        },

        openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
            this.dialogItems = this.assignTrips;
            this.itemType = "ASSIGNTRIPS";
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
                'id': assignedFleet.id,
                'trip_start_date': assignedFleet.trip_start_date,
                'trip_end_date': assignedFleet.trip_end_date,
                'departure_time': assignedFleet.departure_time,
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
                        departure_time: this.editedItem.departure_time,
						status: this.editedItem.status
					}
				};
				this.$store.dispatch('SAVE_ASSIGNED_TRIP', assignedTrip);
			} else {
                let assignedTrip = {
                        fleet_registration_no: this.editedItem.fleet_registration_no,
                        route_name: this.editedItem.route_name,
						trip_start_date: this.editedItem.trip_start_date,
						trip_end_date: this.editedItem.trip_end_date,
                        departure_time: this.editedItem.departure_time,
                        status: this.editedItem.status,
                        created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				this.$store.dispatch('SAVE_ASSIGNED_TRIP', assignedTrip);
			}
			this.close()
        },
        
		delete (data) {
			if (data.type == "ASSIGNTRIPS") {
				this.$store.dispatch('DELETE_ASSIGNED_TRIP', data);
			}
        },

		generateReport() {
			return tripReport(this.company[0].name, this.assignTrips)
		},

        checkPermissions() {
            const rec = this.collections.filter(item => item.name.toLowerCase() === "schedules");
            const records =  this.roleObjectPermissions.filter(record => record.objectId == rec[0].id)
            
            if(records.length > 0){
                if(records[0].permissions.split(',').includes('add')){
                    this.canAdd = true;
                }

                if(records[0].permissions.split(',').includes('edit')){
                    this.canEdit = true;
                }

                if(records[0].permissions.split(',').includes('delete')){
                    this.canDelete = true;

                }

                if(this.canEdit | this.canDelete){
                    this.headers.push({ text: 'Actions', value: 'action', sortable: false });

                }
            }
        }
    },
}
</script>