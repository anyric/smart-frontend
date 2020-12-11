<template>
	<v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
				<v-data-table
				:headers="headers"
				:items="fleets"
				:search="search"
				sort-by="mobile"
				class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar color="white">
							<h2 class="mr-1" color="teal darken-1">Fleets</h2>
							<v-spacer></v-spacer>
							<v-text-field
								v-model="search"
								append-icon="fa fa-search"
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
								<span>Fleet</span>
							</v-tooltip>
							<v-dialog v-model="dialog" persistent max-width="800px" max-height="300px">
								<v-card>
									<v-card-title>
										<span class="headline">{{ formTitle }}</span>
									</v-card-title>

									<v-card-text>
										<v-container>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.registration_no" label="Registration No *"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.engine_no" label="Engine No *"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.chasis_no" label="Chasis No *"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.model_no" label="Model No *"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="6" class="sm12">
													<v-select
														:items="fleetTypes"
														label="Fleet Type *"
														item-text="name"
														item-value="id"
														v-model="editedItem.fleet_type"
														required
														@change="verifyFleetType()"
													></v-select>
                                                </v-col>
												<v-col col="6" class="sm12">
													<v-text-field id="layout" required v-model="editedItem.layout" label="Layout *"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field id="seat" required v-model="editedItem.seat_nos" label="Total Seat No *"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-checkbox required v-model="editedItem.status" label="Active *"></v-checkbox>
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
						<v-tooltip bottom color="primary">
							<template v-slot:activator="{ on }">
								<v-icon color="primary" small v-on="on" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
							</template>
							<span>Edit Fleet</span>
						</v-tooltip>
						<v-tooltip bottom color="red">
							<template v-slot:activator="{ on }">
								<v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
							</template>
							<span>Delete Fleet</span>
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
export default {
    data: () => ({
		overlay: false,
		editedItem: {
			id: 0,
			registration_no: '',
			engine_no: '',
			chasis_no: '',
			model_no: '',
			fleet_type: 0,
			layout: '',
			seat_nos: 0,
			status: true,
		},
		
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		itemType: "",
		dialog: false,
		search: '',
		editedIndex: -1,
		headers: [
			{ text: 'Registration No', align: 'start', value: 'registration_no',},
			{ text: 'Engine No', value: 'engine_no' },
			{ text: 'Chasis No', value: 'chasis_no' },
			{ text: 'Model No', value: 'model_no' },
			{ text: 'Fleet Type', value: 'fleet_type' },
			{ text: 'Layout', value: 'layout' },
			{ text: 'Total Seat', value: 'seat_nos' },
			{ text: 'Active', value: 'status' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
				fleetTypes: 'FLEET_TYPES',
				fleets: 'FLEETS',
				isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Fleet' : 'Edit Fleet'
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
		this.overlay = true
		this.$store.dispatch('GET_FLEET_TYPES');
		this.$store.dispatch('GET_FLEETS');
	},

	updated() {
		this.mapIdToName();
	},

	created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
	},

    methods: {
		editItem (item) {
			if (item){
				let fleet = this.mapNameToId(item);
				this.editedItem = Object.assign({}, fleet)
			}else{
				this.editedItem = Object.assign({}, item)
			}
			this.editedIndex = this.fleets.indexOf(item)
			this.dialog = true
			this.mapIdToName();
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.fleets
			this.itemType = "FLEETS"
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

		mapIdToName(){
			this.fleets.forEach(element => {
				this.fleetTypes.forEach( el => {
					if (element.fleet_type == parseInt(el.id)){
						element.fleet_type = el.name
					}
				})
			});
		},

		mapNameToId(fleet) {
			let editedFleet = {
				'id': fleet.id,
				'registration_no': fleet.registration_no,
				'engine_no': fleet.engine_no,
				'chasis_no': fleet.chasis_no,
				'model_no': fleet.model_no,
				'layout': fleet.layout,
				'seat_nos': fleet.seat_nos,
				'status': fleet.status
			};
			this.fleetTypes.forEach( el => {
				if (fleet.fleet_type === el.name){
					fleet.fleet_type = parseInt(el.id)
					editedFleet['fleet_type'] = parseInt(el.id);
                }
			});

			return editedFleet;
		},
		verifyFleetType(){
			console.log("I'm called")
			let id = this.editedItem.fleet_type
			this.fleetTypes.forEach( element => {
				if (element.id == id && element.name == "Cargo") {
					window.document.getElementById('layout').setAttribute('disabled',true)
					window.document.getElementById('layout').setAttribute('filled',true)

					window.document.getElementById('seat').setAttribute('disabled',true)
					window.document.getElementById('seat').setAttribute('filled',true)
				}else{
					window.document.getElementById('layout').removeAttribute('disabled')
					window.document.getElementById('seat').removeAttribute('disabled')
				}
			})
		},
		save () {
			if (this.editedIndex > -1) {
				let fleet = {
					pk : this.editedItem.id,
					data: {
						registration_no: this.editedItem.registration_no,
						engine_no: this.editedItem.engine_no,
						chasis_no: this.editedItem.chasis_no,
						model_no: this.editedItem.model_no,
						fleet_type: this.editedItem.fleet_type,
						layout: this.editedItem.layout,
						seat_nos: this.editedItem.seat_nos,
						status: this.editedItem.status
					}
				};
				this.$store.dispatch('SAVE_FLEET', fleet);
			} else {
				let data = {
                    registration_no: this.editedItem.registration_no,
                    engine_no: this.editedItem.engine_no,
                    chasis_no: this.editedItem.chasis_no,
                    model_no: this.editedItem.model_no,
                    fleet_type: this.editedItem.fleet_type,
                    layout: this.editedItem.layout,
                    seat_nos: this.editedItem.seat_nos,
					status: this.editedItem.status,
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
                };
				this.$store.dispatch('SAVE_FLEET', data)
			}
			this.close()
		},

		delete (data) {
			if (data.type == "FLEETS") {
				this.$store.dispatch('DELETE_FLEET', data);
			}
		},
    },
}
</script>