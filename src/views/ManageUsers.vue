<template>
    <v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
        <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            sort-by="mobile"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar color="white">
                    <h2 class="mr-1" color="teal darken-1">Users</h2>
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
                        <v-btn color="teal darken-1" dark v-on="on" class="mb-2 button-small" @click="editItem()" v-if="canAdd" ><i class="fas fa-plus mr-1"></i> Add New</v-btn>
                      </template>
                      <span>User</span>
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
                    <v-dialog v-model="dialog" persistent max-width="800px" max-height="300px">
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
                                        <v-col cols="6" class="sm12">
                                            <v-text-field
                                                required
                                                v-model="editedItem.mobile"
                                                label="Mobile"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12">
                                            <v-text-field required v-model="editedItem.username" label="Username"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" v-if="(editedIndex > -1)" class="sm12">
                                            <v-text-field required v-model="editedItem.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12" v-if="(editedIndex <= -1)">
                                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="sm12" v-if="(editedIndex <= -1)">
                                            <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                                        </v-col>
                                    </v-row>
                                     <v-row>
                                        <v-col cols="4" class="sm12">
                                            <v-checkbox required v-model="editedItem.is_active" label="Is Active"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4" class="sm12">
                                            <v-checkbox v-model="editedItem.is_staff" label="Is Staff"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4" class="sm12">
                                            <v-checkbox v-model="editedItem.is_admin" label="Is Admin"></v-checkbox>
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
                    <span>Edit User</span>
                </v-tooltip>
                <v-tooltip bottom color="red" v-if="canDelete">
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                    </template>
                    <span>Delete User</span>
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
import { userReport } from "@/services/helper";
export default {
    data: () => ({
        overlay: false,
        canAdd: false,
        canEdit: false,
        canDelete: false,
		editedItem: {
            id: '',
			mobile: '',
			username: '',
			email: '',
			first_name: '',
			last_name: '',
            password: '',
            is_ative: true,
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
            { text: 'Active', value: 'is_active' },
            { text: 'Staff', value: 'is_staff' },
            { text: 'Admin', value: 'is_admin' },
		],
    }),

    computed: {
		...mapGetters({
                users: 'USERS',
                collections: "COLLECTIONS",
                roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
                company: 'COMPANY',
                isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add User' : 'Edit User'
		},
    },

    watch: {
		dialog (val) {
			val || this.close()
        },

        overlay (val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 500)
        },
    },
    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
        this.$store.dispatch('GET_USERS');
        this.$store.dispatch("GET_COLLECTIONS");
        this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.$store.dispatch("GET_COMPANY");
        this.checkPermissions();
        this.overlay = true;
    },
    created() {
		EventBus.$on('delete', data => {
			this.delete(data);
		})
	},
    methods: {
		editItem (item) {
			this.editedIndex = this.users.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
            this.dialogItems = this.users;
            this.itemType = "USERS";
			this.isOpen = true;
		},

		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			}, 3000)
		},

		save () {
			if (this.editedIndex > -1) {
                let user = {
                    pk: this.editedItem.id,
                    data: {
                        mobile: this.editedItem.mobile,
                        username: this.editedItem.username,
                        email: this.editedItem.email,
                        first_name: this.editedItem.first_name,
                        last_name: this.editedItem.last_name,
                        is_active: this.editedItem.is_active,
                        is_staff: this.editedItem.is_staff,
                        is_admin: this.editedItem.is_admin
                    }
                };
                this.$store.dispatch('SAVE_USER', user)
			} else {
                let data = {
                    mobile: this.editedItem.mobile,
                    username: this.editedItem.username,
                    email: this.editedItem.email,
                    first_name: this.editedItem.first_name,
                    last_name: this.editedItem.last_name,
                    password: this.editedItem.password,
                    is_active: this.editedItem.is_ative,
                    is_staff: this.editedItem.is_staff,
                    is_admin: this.editedItem.is_admin
                };
                this.$store.dispatch('SAVE_USER', data)
			}
			this.close()
        },
        
        delete(data) {
			if (data.type == "USERS") {
				this.$store.dispatch('DELETE_USER', data);
			}
        },
        
        generateReport() {
			return userReport(this.company[0].name, this.users)
		},

        checkPermissions() {
            const rec = this.collections.filter(item => item.name.toLowerCase() === "users");
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