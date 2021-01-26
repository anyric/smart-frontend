<template>
    <v-layout row wrap>
        <v-container class="container mx-auto">
            <v-card class="mx-10 my-3">
                <v-card-title>
                    <span class="headline">Assigned Permissions</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col class="sm12">
                                <v-select
                                    :items="roles"
                                    label="Role *"
                                    item-text="name"
                                    item-value="id"
                                    v-model="roleId"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-container class="px-0"><h6>Permissions </h6></v-container>
                        <v-simple-table
                            fixed-header
                            height="350px"
                            class="table-responsive container px-0"
                        >
                            <template v-slot:default>
                                <thead>
                                    <tr class="px-0">
                                        <th class="px-0">Item</th>
                                        <th class="text-left px-0">
                                            Add
                                        </th>
                                        <th class="text-left px-0">
                                            Edit
                                        </th>
                                        <th class="text-left px-0">
                                            View
                                        </th>
                                        <th class="text-left px-0">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in collections"
                                        :key="item.id"
                                        class="px-0"
                                    >
                                        <td class="px-0">{{ item.name }}</td>
                                        <td class="px-0"><v-checkbox name="add" :id="item.name + '-add'" @change="verifyState(item, 'add')"></v-checkbox></td>
                                        <td class="px-0"><v-checkbox name="edit" :id="item.name + '-edit'" @change="verifyState(item, 'edit')"></v-checkbox></td>
                                        <td class="px-0"><v-checkbox name="retrieve" :id="item.name + '-retrieve'" @change="verifyState(item, 'retrieve')"></v-checkbox></td>
                                        <td class="px-0"><v-checkbox name="delete" :id="item.name + '-delete'" @change="verifyState(item, 'delete')"></v-checkbox></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-container>
                </v-card-text>

                <v-card-actions class="pr-3">
                    <v-spacer></v-spacer>
                    <v-btn color="teal darken-1" dark class="mb-3 mr-10" @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-layout>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data: () => ({
        overlay: false,
        roleId: 0,
        assignedPermissions: []
    }),

    computed: {
		...mapGetters({
                roles: "ROLES",
                collections: "COLLECTIONS",
                permissions: "PERMISSIONS",
                roleObjectPermissions: "ROLEOBJECTPERMISSIONS",
                isLoggedIn: "IS_LOGGED_IN"
			}),
    },

    watch: {
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
        this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.$store.dispatch('GET_ROLES');
        this.$store.dispatch('GET_PERMISSIONS');
        this.$store.dispatch('GET_COLLECTIONS');
    },

    methods: {
		verifyState (item, action) {
            if(this.roleId < 1){
                alert("Role can't be empty");
            }else{
                // const isChecked = document.getElementById(id).checked
                // console.log(isChecked);
                console.log("verify: ", this.roleId + " " + action + " " + item.name);
                let permission = this.permissions.filter(perm => perm.name.toLowerCase() === action)
                const data = {
                    roleId : this.roleId,
                    permissionId: permission[0].id,
                    objectId: item.id
                }
                this.assignedPermissions.push(data)
            }
            console.log(this.assignedPermissions);
		},

		save () {
            console.log()
			// if (this.editedIndex > -1) {
            //     let collection = {
            //         pk: this.editedItem.id,
            //         data: {
            //             name: this.editedItem.name,
            //             description: this.editedItem.description
            //         }
            //     };
            //     this.$store.dispatch('SAVE_ROLEOBJECTPERMISSION', collection)
			// } else {
            //     let collection = {
            //         name: this.editedItem.name,
            //         description: this.editedItem.description,
            //         created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
            //     };
            //     this.$store.dispatch('SAVE_ROLEOBJECTPERMISSIONS', collection)
			// }
        },
    },
}
</script>