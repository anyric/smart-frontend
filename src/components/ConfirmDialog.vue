<template>
	<v-dialog v-model="open" persistent max-width="320">
		<v-card>
			<v-card-title class="headline teal darken-3">Confirm Deletion</v-card-title>
			<v-card-text>Are you sure you want to delete this item?</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="white" class="primary" text @click="closeModal">Cancel</v-btn>
				<v-btn color="white" class="red" text @click="confirmActive">Yes</v-btn>
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
        },
        id: {
			type: Number
        },
        item: {
			type: Object,
			default: null
        },
        items: {
			type: Array,
			default: null
        },
    },
	computed: {
	},
	methods: {
		closeModal() {
			this.$emit("close-modal");
		},
		confirmActive() {
			const index = this.items.indexOf(this.item)
			this.items.splice(index, 1)
			this.$emit("close-modal");
		}
	},
}
</script>