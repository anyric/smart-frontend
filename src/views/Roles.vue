<template>
    <v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
        <v-data-table
            :headers="headers"
            :items="roles"
            :search="search"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar color="white">
                    <h2 class="mr-1" color="teal darken-1">Roles</h2>
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
                      <span>Add New Role</span>
                    </v-tooltip>
                    <v-dialog v-model="dialog" persistent max-width="600px" max-height="200px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col class="sm12">
                                            <v-text-field required v-model="editedItem.name" label="Name *"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="sm12">
                                            <v-textarea required v-model="editedItem.description" label="Description *"></v-textarea>
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
                    <span>Edit Role</span>
                </v-tooltip>
                <v-tooltip bottom color="red">
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                    </template>
                    <span>Delete Role</span>
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
			name: '',
			description: ''
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
			{
			text: 'Name',
			align: 'start',
			value: 'name',
			},
			{ text: 'Description', value: 'description' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
                roles: 'ROLES',
                isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Role' : 'Edit Role'
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
        this.overlay = true;
        this.$store.dispatch('GET_ROLES');
    },

	created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
	},

    methods: {
		editItem (item) {
			this.editedIndex = this.roles.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
            this.dialogItems = this.roles;
            this.itemType = "ROLES";
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
                let role = {
                    pk: this.editedItem.id,
                    data: {
                        name: this.editedItem.name,
                        description: this.editedItem.description
                    }
                };
                this.$store.dispatch('SAVE_ROLE', role)
			} else {
                let role = {
                    name: this.editedItem.name,
                    description: this.editedItem.description,
                    created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
                };
                this.$store.dispatch('SAVE_ROLE', role)
			}
			this.close()
        },
        
		delete (data) {
			if (data.type == "ROLES") {
				this.$store.dispatch('DELETE_ROLE', data);
			}
		},
    },
}
</script>