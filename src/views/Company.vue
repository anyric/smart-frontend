<template>
    <div>
        <div class="container justify-center">
            <div>
                <form>
                    <v-card class=" ml-4 mr-8 mt-20 px-3 py-5">
                        <h3 class="px-4 mb-3">Company Details</h3>
                        <v-alert type="error" v-if="emptyField">
                            {{ message }} 
                        </v-alert>
                        <div class="px-4">
                            <v-text-field
                                v-model="name"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="box_no"
                                label="P.0.Box"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="district"
                                label="District/City"
                                required
                            ></v-text-field>
                            <v-subheader class="pl-0">Logo</v-subheader>
                            <input @change="selectLogo" type="file" name="logo" accept="image/*">
                            <img :src="logo" style="width: 40px; height: 40px">
                            <v-subheader class="pl-0">Color</v-subheader>
                             <v-color-picker
                                small
                                hide-canvas
                                hide-mode-switch
                                mode="hexa"
                                show-swatches
                                swatches-max-height="200"
                                width="100%"
                                v-model="color"
                            ></v-color-picker>
                            <v-btn class="success mt-3" block @click="save('company')" v-if="canAdd">Save</v-btn>
                        </div>
                    </v-card>
                </form>
            </div>
        </div>
        <v-row class="container pl-8">
            <v-col cols="12" class="sm12 justify-center">
                <v-data-table
                    :headers="headers"
                    :items="branches"
                    :search="search"
                    sort-by="id"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar color="white">
                            <h4 class="mr-1" color="teal darken-1">Branches</h4>
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
                            <v-tooltip bottom color="green" v-if="canAdd">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="teal darken-1" dark v-on="on" class="mb-2 button-small" @click="editItem()"><i class="fas fa-plus mr-1"></i> Add New</v-btn>
                                </template>
                                <span>Branch</span>
                            </v-tooltip>
                            <v-dialog v-model="dialog" persistent max-width="500px" max-height="300px">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-text-field required v-model="editedItem.name" label="Name"></v-text-field>
                                            <v-text-field required v-model="editedItem.mobile" label="Mobile"></v-text-field>
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
                            <span>Edit Branch</span>
                        </v-tooltip>
                        <v-tooltip bottom color="red" v-if="canDelete">
                            <template v-slot:activator="{ on }">
                                <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
                            </template>
                            <span>Delete Branch</span>
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
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data: () => ({
        name: '',
        box_no: 0,
        district: '',
        color: '',
        logo: null,
        base64TextString: '',
        overlay: false,
        canAdd: false,
        canEdit: false,
        canDelete: false,
        editedItem: {
			id: 0,
			name: '',
            mobile: ''
		},
        emptyField: false,
        message: 'Please select your pick up, stop point and seat to continue!',
        search: '',
        isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		itemType: "",
        dialog: false,
        editedIndex: -1,
        headers: [
			{
			text: 'SL',
			align: 'start',
			value: 'id',
			},
			{ text: 'Name', value: 'name' },
            { text: 'Mobile', value: 'mobile' },
		],
    }),

    computed: {
		...mapGetters({
                company: 'COMPANY',
                branches: 'BRANCH',
                collections: "COLLECTIONS",
                roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
                isLoggedIn: "IS_LOGGED_IN"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Branch' : 'Edit Branch'
		},
    },

    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
		}
        this.$store.dispatch("GET_COMPANY");
        this.$store.dispatch("GET_BRANCH");
        this.$store.dispatch("GET_COLLECTIONS");
		this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.checkPermissions();
        this.overlay = true;
    },
    watch: {
        overlay (val) {
            val && setTimeout(() => {
                this.name = this.company[0].name;
                this.box_no = this.company[0].box_no;
                this.district = this.company[0].district;
                this.color = this.company[0].color;
                this.logo = this.company[0].logo;
                this.overlay = false;
            }, 500)
        },
    },
    methods: {
		editItem (item) {
			this.editedIndex = this.branches.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
            this.dialogItems = this.branches;
            this.itemType = "BRANCH";
			this.isOpen = true;
		},

		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			}, 3000)
		},

		save(item) {
            if(item === 'company'){
                if (this.company.length > 0) {
                    let company = {
                        pk: this.company[0].id,
                        data: {
                            name: this.name,
                            box_no: this.box_no,
                            district: this.district,
                            color: this.color,
                            logo: this.logo
                        }
                    };
                    this.$store.dispatch('SAVE_COMPANY', company)
                } else {
                    let data = {
                        name: this.name,
                        box_no: this.box_no,
                        district: this.district,
                        color: this.color,
                        created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk,
                        logo: this.logo
                    };
                    this.$store.dispatch('SAVE_COMPANY', data)
                }
            }else{
                if (this.editedIndex > -1) {
                    let branch = {
                        pk: this.editedItem.id,
                        data: {
                            name: this.editedItem.name,
                            mobile: this.editedItem.mobile,
                        }
                    };
                    this.$store.dispatch('SAVE_BRANCH', branch)
                } else {
                    let data = {
                        company: this.company[0].id,
                        name: this.editedItem.name,
                        mobile: this.editedItem.mobile,
                        created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
                    };
                    this.$store.dispatch('SAVE_BRANCH', data)
                }
            }
			this.close()
        },
        
        delete(data) {
			if (data.type == "BRANCH") {
				this.$store.dispatch('DELETE_BRANCH', data);
			}
        },

        selectLogo(){
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.logo = e.target.result;
            }
            reader.readAsDataURL(file);
        },

        checkPermissions() {
            const rec = this.collections.filter(item => item.name.toLowerCase() === "company");
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