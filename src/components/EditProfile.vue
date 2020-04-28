<template>
    <v-dialog v-model="open" persistent max-width="700px" max-height="300px">
        <v-card>
            <v-card-title>
                <span class="headline">Edit Profile</span>
            </v-card-title>
            <v-card-text>
                <v-form>
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
                            <v-text-field required v-model="editedItem.username" label="Username"></v-text-field>
                        </v-col>
                        <v-col cols="6" class="sm12">
                            <v-text-field required v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" dark class="mb-2 mr-5" @click="closeModal">Cancel</v-btn>
                <v-btn color="teal darken-1" dark class="mb-2" @click="editProfile">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            open: {
                type:Boolean,
                default: false
            }
        },

        data: () => ({
            editedItem: {
            pk: '',
			username: '',
			email: '',
			first_name: '',
			last_name: '',
            },
        }),

        created() {
            let user = this.$cookie.get('currentUser');
            if(user){
                this.userData = JSON.parse(user).user;
                this.editItem(this.userData);
            }
        },

        methods: {
            editItem (item) {
                this.editedItem = Object.assign({}, item);
            },
            closeModal() {
                this.$emit("close-modal");
            },

            async editProfile () {
                let user = {
                    pk: this.editedItem.pk,
                    username: this.editedItem.username,
                    email: this.editedItem.email,
                    first_name: this.editedItem.first_name,
                    last_name: this.editedItem.last_name
                };
                this.$store.dispatch('EDIT_PROFILE', user)
                this.$emit("close-modal");
                // alert("Edit Successful!");
                // console.log(user)
            },
        },
    }
</script>
