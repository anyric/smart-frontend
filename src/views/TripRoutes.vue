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
                                        <v-col col="6" class="sm12">
                                            <v-text-field required v-model="editedItem.name" label="Name"></v-text-field>
                                        </v-col>
                                        <v-col col="6" class="sm12">
                                            <v-text-field required v-model="editedItem.description" label="Description"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col col="6" class="sm12">
                                            <v-text-field required v-model="editedItem.start_point" label="Start Point"></v-text-field>
                                        </v-col>
                                        <v-col col="6" class="sm12">
                                            <v-text-field required v-model="editedItem.end_point" label="End Point"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col col="6" class="sm12">
                                            <v-text-field required v-model="editedItem.stopage_points" label="Stopage Points"></v-text-field>
                                        </v-col>
                                        <v-col class="sm12">
                                            <v-text-field required v-model="editedItem.status" label="Status"></v-text-field>
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
			name: '',
			start_point: '',
			end_point: '',
			stopage_points: '',
			description: '',
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
			{ text: 'Stopage Point', value: 'stopage_points' },
			{ text: 'Description', value: 'description' },
			{ text: 'Status', value: 'status' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
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
        this.$store.dispatch('GET_ROUTES');
	},

    methods: {
		editItem (item) {
			this.editedIndex = this.routes.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.routes
			this.isOpen = true;
		},

		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			}, 300)
		},

		save () {
			if (this.editedIndex > -1) {
			Object.assign(this.routes[this.editedIndex], this.editedItem)
			} else {
			this.users.push(this.editedItem)
			}
			this.close()
		},
    },
}
</script>