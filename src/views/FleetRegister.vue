<template>
	<v-layout row wrap>
    <v-row class="container mx-auto">
        <v-col cols="12" class="sm12">
				<v-data-table
				:headers="headers"
				:items="fleets"
				:search="search"
				sort-by="mobile"
				class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar color="white">
							<h2 class="mr-1" color="teal darken-1">Fleets</h2>
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
								<span>Fleet</span>
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
													<v-text-field required v-model="editedItem.registrationNo" label="Registration No"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.engineNo" label="Engine No"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.chasisNo" label="Chasis No"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.modelNo" label="Model No"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.fleetType" label="Fleet Type"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.layout" label="Layout"></v-text-field>
												</v-col>
											</v-row>
											<v-row>
												<v-col col="6" class="sm12">
													<v-text-field required v-model="editedItem.seatNos" label="Seat No"></v-text-field>
												</v-col>
												<v-col col="6" class="sm12">
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
							<span>Edit Fleet</span>
						</v-tooltip>
						<v-tooltip bottom color="red">
							<template v-slot:activator="{ on }">
								<v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
							</template>
							<span>Delete Fleet</span>
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
			id: 0,
			registrationNo: '',
			engineNo: '',
			chasisNo: '',
			modelNo: '',
			fleetType: '',
			layout: '',
			seatNos: 0,
			status: true,
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
				text: 'Id',
				align: 'start',
				value: 'id',
			},
			{text: 'Registration No', value: 'registrationNo',},
			{ text: 'Engine No', value: 'engineNo' },
			{ text: 'Chasis No', value: 'chasisNo' },
			{ text: 'Model No', value: 'modelNo' },
			{ text: 'Fleet Type', value: 'fleetType' },
			{ text: 'Layout', value: 'layout' },
			{ text: 'Seat No', value: 'seatNos' },
			{ text: 'Status', value: 'status' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    }),

    computed: {
		...mapGetters({
				fleets: 'FLEETS',
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Fleet' : 'Edit Fleet'
		},
    },

    watch: {
		dialog (val) {
			val || this.close()
		},
    },

    methods: {
		editItem (item) {
			this.editedIndex = this.fleets.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item){
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.fleets
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
			Object.assign(this.fleets[this.editedIndex], this.editedItem)
			} else {
			this.users.push(this.editedItem)
			}
			this.close()
		},
    },
}
</script>