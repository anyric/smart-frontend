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
                                            <v-text-field required v-model="editedItem.first_name" label="First Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.last_name" label="Last Name"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="sm12">
                                            <v-text-field
                                                required
                                                v-model="editedItem.mobile"
                                                :disabled="!(editedIndex <= -1)"
                                                label="Mobile"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="sm12">
                                            <v-text-field required v-model="editedItem.username" label="Username"></v-text-field>
                                        </v-col>
                                        <v-col class="sm12" v-if="(editedIndex <= -1)">
                                            <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
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
                                            <v-text-field required v-model="editedItem.present_address" label="Present Adress"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.permanent_address" label="Permanent Adress"></v-text-field>
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
                    <span>Edit Agent</span>
                </v-tooltip>
                <v-tooltip bottom color="red">
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                    </template>
                    <span>Delete Agent</span>
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
    </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
import { EventBus } from "@/services/bus";
export default {
    data: () => ({
		editedItem: {
            id: '',
			mobile: '',
			username: '',
			email: '',
			first_name: '',
			last_name: '',
			station: '',
			present_address: '',
            permanent_address: '',
            password: '',
            is_active: true,
            is_staff: false,
            is_admin: false
        },
		isOpen: false,
		dialogId: 0,
		dialogItem: null,
        dialogItems: null,
        itemType: "",
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
			{ text: 'First Name', value: 'first_name' },
			{ text: 'Last Name', value: 'last_name' },
			{ text: 'Station', value: 'station' },
			{ text: 'Present Address', value: 'present_address' },
			{ text: 'Permanent Address', value: 'permanent_address' },
            { text: 'Active', value: 'is_active' },
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
        this.$store.dispatch('GET_AGENTS');
    },
    created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
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
            this.dialogItems = this.agents;
            this.itemType = "AGENTS";
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
            let agent = {
                    pk: this.editedItem.id,
                    data: {
                        username: this.editedItem.username,
                        email: this.editedItem.email,
                        first_name: this.editedItem.first_name,
                        last_name: this.editedItem.last_name,
                        password: this.editedItem.password,
                        station: this.editedItem.station,
                        present_address: this.editedItem.present_address,
                        permanent_address: this.editedItem.permanent_address
                    }
                };
                this.$store.dispatch('SAVE_AGENT', agent)
			} else {
                let data = {
                        mobile: this.editedItem.mobile,
                        username: this.editedItem.username,
                        email: this.editedItem.email,
                        first_name: this.editedItem.first_name,
                        last_name: this.editedItem.last_name,
                        password: this.editedItem.password,
                        station: this.editedItem.station,
                        present_address: this.editedItem.present_address,
                        permanent_address: this.editedItem.permanent_address
                    };
                this.$store.dispatch('SAVE_AGENT', data)
			}
			this.close()
        },
        
         delete(data) {
			if (data.type == "AGENTS") {
				console.log("Yes Agent")
				console.log(data)
				this.$store.dispatch('DELETE_AGENT', data);
			}
		},
	},
}
</script>