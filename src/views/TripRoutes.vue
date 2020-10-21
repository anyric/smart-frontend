<template>
    <v-layout row wrap>
    <v-row class="container mx-auto">
      <v-col cols="12" class="sm12">
        <v-data-table
            :headers="headers"
            :items="routes"
            :search="search"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar color="white">
                    <h2 class="mr-1" color="teal darken-1">Routes</h2>
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
                      <span>Add New Route</span>
                    </v-tooltip>
                    <v-dialog v-model="dialog" persistent max-width="800px" max-height="300px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.name" label="Name *"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.description" label="Description *"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
											<v-select
												:items="locations"
												label="Start Point *"
												item-text="name"
												item-value="id"
												v-model="editedItem.start_point"
												required
											></v-select>
										</v-col>
                                        <v-col cols="6" class="sm12">
											<v-select
												:items="locations"
												label="End Point *"
												item-text="name"
												item-value="id"
												v-model="editedItem.end_point"
												required
											></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="sm12">
											<v-select
												multiple
												:items="locations"
												label="Stopage Points *"
												item-text="name"
												item-value="id"
												v-model="editedItem.stopage_points"
												required
											></v-select>
                                        </v-col>
                                    </v-row>
									<v-row>
										<v-col cols="5" class="sm12">
                                            <v-text-field required v-model="editedItem.distance" label="Distance (KMs) *"></v-text-field>
                                        </v-col>
                                        <v-col cols="5" class="sm12">
                                            <v-text-field required v-model="editedItem.approximate_time" label="Approximate Time (Hrs) *"></v-text-field>
                                        </v-col>
										<v-col cols="2" class="sm12">
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
                <span>Edit Route</span>
              </v-tooltip>
              <v-tooltip bottom color="red">
                <template v-slot:activator="{ on }">
                <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                </template>
                <span>Delete Route</span>
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
			id: 0,
			name: '',
			start_point: 0,
			end_point: 0,
			stopage_points: [],
			description: '',
			distance: 0.0,
			approximate_time: 0.0,
			status: ''
		},
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		dialog: false,
		search: '',
		editedIndex: -1,
		headers: [
			{
			text: 'Name',
			align: 'start',
			value: 'name',
			},
			{ text: 'Start Point', value: 'start_point' },
			{ text: 'End Point', value: 'end_point' },
			{ text: 'Stopage Points', value: 'stopage_points' },
			{ text: 'Description', value: 'description' },
			{ text: 'Distance (Kms)', value: 'distance' },
			{ text: 'Duration (Hrs)', value: 'approximate_time' },
			{ text: 'Active', value: 'status' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
			locations: 'LOCATIONS',
			routes: 'ROUTES',
			isLoggedIn: "IS_LOGGED_IN"
		}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Route' : 'Edit Route'
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
		this.$store.dispatch('GET_LOCATIONS');
		this.$store.dispatch('GET_ROUTES');
	},

	updated() {
		this.mapIdToName();
	},

    methods: {
		editItem (item) {
			if (item){
				let rout = this.mapNameToId(item);
				this.editedItem = Object.assign({}, rout)
			}else{
				this.editedItem = Object.assign({}, item)
			}
			this.editedIndex = this.routes.indexOf(item)
			this.dialog = true
			this.mapIdToName()
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.routes;
			this.isOpen = true;
		},

		close () {
			this.dialog = false;
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem);
			this.editedIndex = -1;
			}, 300)
			this.mapIdToName();
		},

		mapIdToName(){
			this.routes.forEach(element => {
				this.locations.forEach( el => {
					if (element.start_point == parseInt(el.id)){
						element.start_point = el.name
					}
					if (element.end_point == parseInt(el.id)){
						element.end_point = el.name
					}
					if (typeof element.stopage_points === 'string'){
						element.stopage_points = element.stopage_points.split(',').map(elem => {
						return parseInt(elem);
					});
					}
					if (element.stopage_points.includes(el.id)){
						let i = element.stopage_points.indexOf(el.id);
						element.stopage_points[i] = el.name;
					}
				})
			});
		},

		mapNameToId(route) {
			let stopage = [];
			let rout = {
				'id': route.id,
				'name': route.name,
				'description': route.description,
				'distance': route.distance,
				'approximate_time': route.approximate_time,
				'status': route.status
			};
			this.locations.forEach( el => {
				if (route.start_point === el.name){
					route.start_point = parseInt(el.id)
					rout['start_point'] = parseInt(el.id);
                }
                if (route.end_point === el.name ){
					route.end_point = parseInt(el.id)
					rout['end_point'] = parseInt(el.id);
                }
				if (route.stopage_points.includes(el.name)){
					stopage.push(parseInt(el.id));
				}
			});
			rout['stopage_points'] = stopage;

			return rout;
		},

		save () {
			if (this.editedIndex > -1) {
				let route = {
					pk : this.editedItem.id,
					data: {
						name: this.editedItem.name,
						start_point: parseInt(this.editedItem.start_point),
						end_point: parseInt(this.editedItem.end_point),
						stopage_points: this.editedItem.stopage_points.toString(),
						description: this.editedItem.description,
						distance: parseInt(this.editedItem.distance),
						approximate_time: this.editedItem.approximate_time,
						status: this.editedItem.status
					}
				};
				// console.log(route);
				this.$store.dispatch('SAVE_ROUTE', route);
			} else {
				let route = {
					name: this.editedItem.name,
					start_point: parseInt(this.editedItem.start_point),
					end_point: parseInt(this.editedItem.end_point),
					stopage_points: this.editedItem.stopage_points.toString(),
					description: this.editedItem.description,
					distance: parseInt(this.editedItem.distance),
					approximate_time: this.editedItem.approximate_time,
					status: this.editedItem.status,
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				// console.log(route);
				this.$store.dispatch('SAVE_ROUTE', route);
			}
			this.close();
		},
    },
}
</script>