<template>
    <div class="text-center">
        <v-dialog
            v-model="open"
            width="500"
        >
            <v-card id="ticket">
                <div class="mt-0 pt-0 text-right">
                        <v-btn
                            color="red"
                            text
                            @click="open = false"
                        >
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </v-btn>
                </div>
                <v-card-subtitle class="mb-0 pb-0">
                    <v-row>
                        <v-col cols="9" class="sm12 font-weight-bold py-1">
                            <i class="fas fa-bus-alt mr-1"></i>ZAWADI BUS SERVICES
                        </v-col>
                        <v-col cols="3" class="sm12 py-1 text-right ">
                        </v-col>
                    </v-row>
                    <v-row class="mt-0 mb-0">
                        <v-col cols="5" class="sm12 py-1">
                            <div class="ml-5 pl-0">P.O.Box 770 Arua</div>
                        </v-col>
                        <v-col cols="7" class="sm12 pb-0 pt-1 text-right">
                            <small> SEAT NO. <strong> {{ viewTicket.seat}} </strong></small>
                            
                        </v-col>
                    </v-row>
                </v-card-subtitle>

                <v-card-text class="mt-0 pt-0">
                    <v-row>
                        <v-col cols="5" class="mt-0 mb-0 pb-0 pt-0"> 
                            <small> BUS NO.<strong> {{ viewTicket.fleet_registration_no }} </strong></small>
                        </v-col>
                        <v-col cols="7" class=" mt-0 mb-0 pb-0 pt-0">
                            <small> RECEIPT NO. <strong> {{ viewTicket.ticket_no }} </strong></small>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="7" class="sm12 pt-2">
                            <strong> NAME OF PASSENGER </strong> <br />
                            {{ viewTicket.passenger_name }}
                        </v-col>
                        <v-col cols="5" class="sm12 pt-2">
                            <strong> JOURNEY: </strong>
                            <br />
                            {{ viewTicket.ticket_trip }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="sm12 pt-0">
                            <strong> BOOKING DATE: </strong>
                        </v-col>
                        <v-col cols="3" class="sm12 pt-0">
                            {{  viewTicket.trip_start_date }}
                        </v-col>
                        <v-col cols="5" class="sm12 pt-0">
                            <strong> TRIP TYPE: </strong>
                            <br />
                            {{ viewTicket.fleet_type }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="sm12 pt-0">
                            <strong> TRAVEL DATE: </strong> <br />
                        </v-col>
                        <v-col cols="3" class="sm12 pt-0">
                            {{  viewTicket.trip_start_date }}
                        </v-col>
                        <v-col cols="5" class="sm12 pt-0">
                            <strong> BOOKING CLERK: </strong>
                            <br />
                            {{ viewTicket.created_by }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="sm12 pt-0">
                            <strong> REPORTING TIME: </strong> <br />
                        </v-col>
                        <v-col cols="3" class="sm12 pt-0">
                            {{  viewTicket.departure_time }}
                        </v-col>
                        <v-col cols="5" class="sm12 pt-0">
                            <strong> FARE: </strong>
                            <br />
                            {{ viewTicket.price }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="sm12 pt-0">
                            <strong> DEPARTURE TIME: </strong>
                        </v-col>
                        <v-col cols="4" class="sm12 pt-0">
                            {{  viewTicket.departure_time }}
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <small><b> Valid Only For The Date of Travel</b></small>
                    <v-spacer></v-spacer>
                    <v-btn
                        outlined
                        text
                        rounded
                        small
                        @click="printTicket()"
                    >
                        <i class="fa fa-print" aria-hidden="true"></i> Print
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import { EventBus } from "@/services/bus";
export default {
  props: {
        open: {
            type:Boolean,
            default: false
		},
		// id: {
		// 	type: Number
		// },
        // itemType: {
		// 	type: String
        // },
        // item: {
		// 	type: Object,
		// 	default: null
        // },
        // items: {
		// 	type: Array,
		// 	default: null
        // },
    },
	methods: {
		closeModal() {
			this.$emit("close-modal");
		},
		confirmActive() {
			const index = this.items.indexOf(this.item)
			this.items.splice(index, 1)
			EventBus.$emit("delete", {
					id: this.item.id,
					type: this.itemType
                });
			this.$emit("close-modal");
		}
	},
}
</script>