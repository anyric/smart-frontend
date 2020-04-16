<template>
  <v-layout row wrap>
    <v-row class="container mx-auto">
      <v-col cols="12" class="sm12">
        <v-data-table
          :headers="headers"
          :items="fares"
          :search="search"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar color="white">
              <h2 class="mr-1" color="teal darken-1">Fares</h2>
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
                  <v-btn
                    color="teal darken-1"
                    dark
                    v-on="on"
                    class="mb-2 button-small"
                    @click="editItem()"
                  >
                    <i class="fas fa-plus mr-1"></i> Add New
                  </v-btn>
                </template>
                <span>Add New Fare</span>
              </v-tooltip>
              <v-dialog v-model="dialog" persistent max-width="500px" max-height="300px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col col="12">
                          <v-select
                            :items="fleetTypes"
                            label="Fleet Type *"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.fleet_type"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col col="12">
                          <v-select
                            :items="routes"
                            label="Routes *"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.trip_route"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col col="12">
                          <v-text-field
                            required
                            v-model="editedItem.price_per_person"
                            label="Fare Per Person *"
                          ></v-text-field>
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
                <v-icon
                  color="primary"
                  small
                  v-on="on"
                  class="mr-2"
                  @click="editItem(item)"
                >mdi-pencil</v-icon>
              </template>
              <span>Edit Fare</span>
            </v-tooltip>
            <v-tooltip bottom color="red">
              <template v-slot:activator="{ on }">
                <v-icon color="red" small v-on="on" @click="openDialog(item)">mdi-delete</v-icon>
              </template>
              <span>Delete Fare</span>
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
      @close-modal="closeDialog"
    ></main-confirm-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({
		editedItem: {
			id: 0,
			fleet_type: 0,
			trip_route: 0,
			price_per_person: 0.0
		},
		isOpen: false,
		dialogId: 0,
		dialogItems: null,
		dialogItem: null,
		dialog: false,
		search: "",
		editedIndex: -1,
		headers: [
		{
			text: "Fleet Type",
			align: "start",
			value: "fleet_type"
		},
		{ text: "Route Name", value: "trip_route" },
		{ text: "Fare Per Person", value: "price_per_person" },
		{ text: "Actions", value: "action", sortable: false }
		]
	}),

	computed: {
		...mapGetters({
			fleetTypes: "FLEET_TYPES",
			routes: "ROUTES",
			fares: "FARES",
			isLoggedIn: "IS_LOGGED_IN"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "Add Fare" : "Edit Fare";
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		}
	},

	mounted() {
		if (!this.isLoggedIn) {
			this.$router.push({ name: "login" });
		}
		this.$store.dispatch("GET_FLEET_TYPES");
		this.$store.dispatch("GET_ROUTES");
		this.$store.dispatch("GET_FARES");
	},

	methods: {
		editItem(item) {
			this.editedIndex = this.fares.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		closeDialog() {
			this.isOpen = false;
		},

		openDialog(item) {
			this.dialogItem = item;
			this.dialogId = item.id;
			this.dialogItems = this.fares;
			this.isOpen = true;
		},

		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			}, 300);
		},

		save() {
			if (this.editedIndex > -1) {
				let fare = {
					pk: this.editedItem.id,
					data:{
						fleet_type: this.editedItem.fleet_type,
						trip_route: this.editedItem.trip_route,
						price_per_person: this.editedItem.price_per_person
					}
				};
				console.log(fare);
				// this.$store.dispatch('SAVE_FARE', fare);
			} else {
				let data = {
					fleet_type: this.editedItem.fleet_type,
					trip_route: this.editedItem.trip_route,
					price_per_person: this.editedItem.price_per_person,
					created_by: JSON.parse(this.$cookie.get('currentUser')).user.pk
				};
				console.log(data);
				// this.$store.dispatch('SAVE_FARE', data)
			}
			this.close();
		}
	}
};
</script>