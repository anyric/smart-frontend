<template>
	<v-dialog v-model="open" persistent max-width="520">
		<v-card>
			<v-card-title class="headline teal darken-3">Change Password</v-card-title>
			<v-card-text>
                <v-alert dense outlined text v-if="loginError" type="error">{{loginError}}</v-alert>
                <v-form>
                    <v-text-field
                        :type="showOldPassword ? 'text' : 'password'"
                        label="Old Password"
                        v-model="form.old_password"
                        :append-icon="showOldPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        @click:append="showOldPassword = !showOldPassword"
                    ></v-text-field>
                     <v-text-field
                        :type="showNewPassword1 ? 'text' : 'password'"
                        label="New Password"
                        v-model="form.new_password1"
                        :append-icon="showNewPassword1 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        @click:append="showNewPassword1 = !showNewPassword1"
                    ></v-text-field>
                     <v-text-field
                        :type="showNewPassword2 ? 'text' : 'password'"
                        label="Confirm Password"
                        v-model="form.new_password2"
                        :append-icon="showNewPassword2 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                        @click:append="showNewPassword2 = !showNewPassword2"
                        @keyup.enter="changePassword"
                    ></v-text-field>
                </v-form>
            </v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="white" class="red mr-5" dark text @click="closeModal">Cancel</v-btn>
				<v-btn
                    color="white"
                    class="teal darken-1"
                    dark
                    text
                    @click="changePassword"
                    :disabled="!(form.old_password && form.new_password1 && form.new_password2)"
                >Update</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import Form from "@/services/Form";
export default {
    props: {
        open: {
            type:Boolean,
            default: false
        },
    },

    data: () => ({
        showOldPassword: false,
        showNewPassword1: false,
        showNewPassword2: false,
        form: new Form({
            old_password: '',
            new_password1: '',
            new_password2: ''
        }),
        loginError: '',
    }),

	methods: {
		closeModal() {
			this.$emit("close-modal");
        },

        async changePassword() {
            if (!(this.form.new_password1 === this.form.new_password2)) {
                this.loginError = "New Password and Confirm Password must be the same!"
                this.form.reset()
            }else {
                await this.$store.dispatch('CHANGE_PASSWORD', {
                    old_password: this.form.old_password,
                    new_password1: this.form.new_password1,
                    new_password2: this.form.new_password2
                });
                setTimeout(() => {
                    this.$emit("close-modal");
                }, 1000);
            }

        }
	},
}
</script>