<template>
    <v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
        <v-data-table
            :headers="headers"
            :items="agents"
            :search="search"
            sort-by="mobile"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar color="white">
                    <h2 class="mr-1" color="teal darken-1">Agents</h2>
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
                      <span>Agent</span>
                    </v-tooltip>
                    <v-dialog v-model="dialog" max-width="800px" max-height="300px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.firstName" label="FirstName"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.lastName" label="LastName"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.mobile" label="Mobile"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.username" label="Username"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.station" label="Station"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.presentAdress" label="Present Adress"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.permanentAdress" label="Permanent Adress"></v-text-field>
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
                    <span>Edit Agent</span>
                </v-tooltip>
                <v-tooltip bottom color="red">
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                    </template>
                    <span>Delete Agent</span>
                </v-tooltip>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
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
			mobile: '',
			username: '',
			email: '',
			firstName: '',
			LastName: '',
			station: '',
			presentAdress: '',
			permanentAdress: '',
			Active: false
        },
		isOpen: false,
		dialogId: 0,
		dialogItem: null,
		dialogItems: null,
		dialog: false,
		editedIndex: -1,
		search: '',
		headers: [
			{
			text: 'Mobile',
			align: 'start',
			value: 'mobile',
			},
			{ text: 'Username', value: 'username' },
			{ text: 'Email', value: 'email' },
			{ text: 'FirstName', value: 'firstName' },
			{ text: 'LastName', value: 'lastName' },
			{ text: 'Station', value: 'station' },
			{ text: 'Present Adress', value: 'presentAdress' },
			{ text: 'Permanent Adress', value: 'permanentAdress' },
			{ text: 'Active', value: 'active' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
                agents: 'AGENTS',
                isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Agent' : 'Edit Agent'
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
    },

    methods: {
		editItem (item) {
			this.editedIndex = this.agents.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.agents
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
			Object.assign(this.agents[this.editedIndex], this.editedItem)
			} else {
			this.users.push(this.editedItem)
			}
			this.close()
		},
		},
}
</script>