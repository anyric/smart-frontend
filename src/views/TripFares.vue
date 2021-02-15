<template>
	<v-layout row wrap>
		<v-row class="container mx-auto">
			<v-col cols="12" class="sm12">
				<v-data-table
				:headers="headers"
				:items="fares"
				:search="search"
				sort-by="name"
				class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar color="white">
							<h2 class="mr-1" color="teal darken-1">Fares</h2>
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
								<v-btn
									color="teal darken-1"
									dark
									v-on="on"
									class="mb-2 button-small"
									@click="editItem()"
								>
									<i class="fas fa-plus mr-1"></i> Add New
								</v-btn>
								</template>
								<span>Add New Fare</span>
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
											<v-col col="12">
											<v-select
												:items="fleetTypes"
												label="Fleet Type *"
												item-text="name"
												item-value="id"
												v-model="editedItem.fleet_type"
												required
											></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col col="12">
											<v-select
												:items="routes"
												label="Routes *"
												item-text="name"
												item-value="id"
												v-model="editedItem.trip_route"
												required
											></v-select>
											</v-col>
										</v-row>
										<v-row>
											<v-col col="12">
											<v-text-field
												required
												v-model="editedItem.price_per_person"
												label="Fare Per Person *"
											></v-text-field>
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
								<v-icon
									color="primary"
									small
									v-on="on"
									class="mr-2"
									@click="editItem(item)"
								>mdi-pencil</v-icon>
							</template>
							<span>Edit Fare</span>
						</v-tooltip>
						<v-tooltip bottom color="red" v-if="canDelete">
							<template v-slot:activator="{ on }">
								<v-icon
									color="red"
									small v-on="on"
									@click="openDialog(item)"
								>mdi-delete</v-icon>
							</template>
							<span>Delete Fare</span>
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
import { mapGetters } from "vuex";
import { EventBus } from "@/services/bus";
import { idToName, fareReport } from "@/services/helper";
export default {
	data: () => ({
		overlay: false,
		canAdd: false,
		canEdit: false,
		canDelete: false,
		editedItem: {
			id: 0,
			fleet_type: 0,
			trip_route: 0,
			price_per_person: 0.0
		},
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		itemType: "",
		dialog: false,
		search: "",
		editedIndex: -1,
		headers: [
		{
			text: "Fleet Type",
			align: "start",
			value: "fleet_type"
		},
		{ text: "Route Name", value: "trip_route" },
		{ text: "Fare Per Person", value: "price_per_person" },
		]
	}),

	computed: {
		...mapGetters({
			fleetTypes: "FLEET_TYPES",
			routes: "ROUTES",
			fares: "FARES",
			company: 'COMPANY',
			collections: "COLLECTIONS",
			roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
			isLoggedIn: "IS_LOGGED_IN"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "Add Fare" : "Edit Fare";
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
		this.$store.dispatch("GET_FLEET_TYPES");
		this.$store.dispatch("GET_ROUTES");
		this.$store.dispatch("GET_FARES");
		this.$store.dispatch("GET_COMPANY");
        this.$store.dispatch("GET_COLLECTIONS");
		this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.checkPermissions();
		this.overlay = true;
	},

	updated() {
		idToName(this.fleetTypes, this.routes, this.fares);
	},

	created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
	},

	methods: {
		editItem(item) {
			if (item){
				let fare = this.mapNameToId(item);
				this.editedItem = Object.assign({}, fare)
			}else{
				this.editedItem = Object.assign({}, item)
			}
			this.editedIndex = this.fares.indexOf(item)
			this.dialog = true;
			// this.mapIdToName
			idToName(this.fleetTypes, this.routes, this.fares);

		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item) {
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.fares;
			this.itemType = "FARES";
			this.isOpen = true;
		},

		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
			// this.mapIdToName(this.fleetTypes, this.routes, this.fares);
			idToName(this.fleetTypes, this.routes, this.fares);
		},

		mapIdToName(fleetTypes, routes, fares){
			fares.forEach(element => {
				routes.forEach( el => {
					if (element.trip_route == el.id){
						element.trip_route = el.name
					}
                });

                fleetTypes.forEach( els => {
					if (element.fleet_type === els.id){
						element.fleet_type = els.name
					}
				});
			});
		},

		mapNameToId(fare) {
			let editedFare = {
				'id': fare.id,
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
				this.$store.dispatch('SAVE_FARE', fare);
			} else {
				let data = {
					fleet_type: this.editedItem.fleet_type,
					trip_route: this.editedItem.trip_route,
					price_per_person: this.editedItem.price_per_person,
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				this.$store.dispatch('SAVE_FARE', data)
			}
			this.close();
		},

		delete (data) {
			if (data.type == "FARES") {
				this.$store.dispatch('DELETE_FARE', data);
			}
		},
		generateReport() {
			return fareReport(this.company[0].name, this.fares)
		},

		checkPermissions() {
            const rec = this.collections.filter(item => item.name.toLowerCase() === "fares");
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
	}
};
</script>