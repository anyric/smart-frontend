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
                                    @change="updatePermissions"
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
                                        <th class="text-left">
                                            Full
                                        </th>
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
                                        <td class=""><input type="checkbox" value="full" :id="item.name + 'full'" @click="fullAccessControl(item.name)"></td>
                                        <td class="px-0"><input type="checkbox" :name="item.name" value="add" :id="item.name + 'add'" @click="updateFullControl(item.name)"></td>
                                        <td class="px-0"><input type="checkbox" :name="item.name" value="edit" :id="item.name + 'edit'" @click="updateFullControl(item.name)"></td>
                                        <td class="px-0"><input type="checkbox" :name="item.name" value="retrieve" :id="item.name + 'retrieve'" @click="updateFullControl(item.name)"></td>
                                        <td class="px-0"><input type="checkbox" :name="item.name" value="delete" :id="item.name + 'delete'" @click="updateFullControl(item.name)"></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-container>
                </v-card-text>

                <v-card-actions class="pr-3">
                    <v-spacer></v-spacer>
                    <v-btn color="teal darken-1" dark class="mb-3 mr-10" id="save" @click="save" :disabled="isDisabled">Save</v-btn>
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
import { EventBus } from "@/services/bus";
export default {
    data: () => ({
        overlay: false,
        roleId: 1,
        data: [],
        isChecked: false,
        roleHasPermissions: false,
        permissionsAlertShown: false,
        isDisabled: true
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
                this.updatePermissions();
                this.overlay = false
            }, 1000)
        },
    },

    mounted() {
        if(!this.isLoggedIn){
            this.$router.push({name: 'login'});
        }
        this.$store.dispatch('GET_ROLEOBJECTPERMISSIONS');
        this.$store.dispatch('GET_ROLES');
        this.$store.dispatch('GET_PERMISSIONS');
        this.$store.dispatch('GET_COLLECTIONS');
        this.overlay = true;
    },

    methods: {
		fullAccessControl(name) {
            const fullCheckBox = document.querySelector(`input[id="${name + 'full'}"]`);
            const checkBoxes = document.querySelectorAll(`input[name="${name}"]`);
            if(fullCheckBox.checked){
                checkBoxes.forEach((cb) => {
                    cb.checked = true;
                });
            }
            if(!fullCheckBox.checked){
                checkBoxes.forEach((cb) => {
                    cb.checked = false;
                });
            }

		},

        updateFullControl(name){
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);

            if(checkboxes.length === 4){
                document.querySelector(`input[id="${name + 'full'}"]`).checked = true;
            }

            if(checkboxes.length < 4){
                document.querySelector(`input[id="${name + 'full'}"]`).checked = false;
            }
        },

		save() {
            if (this.roleId === 0 ) {
                EventBus.$emit("show-snackbar", {
                    text: "Role can't be empty!",
                    color: "red",
                });
                return
            } 
            this.collections.forEach(entity =>{
                const data = this.generateRoleObjectPermissions(entity);
                if(Object.keys(data).length > 0){
                    this.$store.dispatch('SAVE_ROLEOBJECTPERMISSIONS', data)
                    this.$router.push({name: 'role-permissions'})
                }
            });
            this.roleHasPermissions = false;
            this.permissionsAlertShown = false;
        },
        getSelectedCheckboxValues(name) {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            let values = [];
            if(checkboxes.length > 0){
                checkboxes.forEach((checkbox) => {
                    values.push(checkbox.value);
                });
                this.roleHasPermissions = true;
            }
            return values;
        },
        generateRoleObjectPermissions(entity){
            const selectedPermissions = this.getSelectedCheckboxValues(entity.name)

            if(this.roleHasPermissions & selectedPermissions.length > 0){
                const recordExist =  this.roleObjectPermissions.filter(record => record.objectId == entity.id & record.roleId == this.roleId)
                if(recordExist.length > 0){
                    if(recordExist[0].permissions.split(',').sort().join(',') === selectedPermissions.sort().join(',')){
                        let updatedroleObjectPermissions = {
                            pk: recordExist[0].id,
                            data:{
                                roleId: parseInt(this.roleId),
                                objectId: parseInt(entity.id),
                                permissions: selectedPermissions.toString(),
                                created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
                            }
                        }
                        return updatedroleObjectPermissions;
                    }
                }
                let newroleObjectPermissions = {
                    roleId: parseInt(this.roleId),
                    objectId: parseInt(entity.id),
                    permissions: selectedPermissions.toString(),
                    created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
                }
                return newroleObjectPermissions;
            }
            if(!this.roleHasPermissions & !this.permissionsAlertShown){
                EventBus.$emit("show-snackbar", {
                    text: "Please assign atleast permission for one item!",
                    color: "red",
                });
                this.permissionsAlertShown = true;
            }
            return [];
        },
        updatePermissions() {
            const selectedRolePermissions = this.roleObjectPermissions.filter(item => item.roleId === this.roleId)
            if(selectedRolePermissions.length > 0){
                this.collections.forEach(rec => {
                    selectedRolePermissions.forEach(el => {
                        if(rec.id === el.objectId){
                            el.permissions.split(",").forEach(x =>{
                                if(x === 'add'){
                                    document.getElementById(rec.name+'add').checked = true;
                                }
                                if(x === 'edit'){
                                    document.getElementById(rec.name+'edit').checked = true;
                                }
                                if(x === 'retrieve'){
                                    document.getElementById(rec.name+'retrieve').checked = true;
                                }
                                if(x === 'delete'){
                                    document.getElementById(rec.name+'delete').checked = true;
                                }
                            });
                        }
                    })

                    this.updateFullControl(rec.name);
                    const record =  this.roleObjectPermissions.filter(record => record.objectId == rec.id & record.roleId == this.roleId)
                    if(record.length > 0){
                        if(record[0].permissions.split(',').includes('add') & record[0].permissions.split(',').includes('edit') & rec.name.toLowerCase() === 'role permissions'){
                            this.isDisabled = false;
                        }
                    }

                });
            }else{
                this.collections.forEach(rec => {
                    document.getElementById(rec.name+'add').checked = false;
                    document.getElementById(rec.name+'edit').checked = false;
                    document.getElementById(rec.name+'retrieve').checked = false;
                    document.getElementById(rec.name+'delete').checked = false;
                    document.getElementById(rec.name + 'full').checked = false;
                });
            }
        }
    },
}
</script>