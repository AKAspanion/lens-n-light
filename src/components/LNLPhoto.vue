<template>
	<v-card flat class="mx-auto">
		<v-dialog v-model="dialog" max-width="80vw">
			<v-card height="85vh" class="pa-4">
				<v-img :src="image.src" contain max-height="calc(85vh - 32px)"></v-img>
			</v-card>
		</v-dialog>
		<div v-if="loading">
			<div :class="noDetails? 'photo-shimmer':'photo-card-shimmer'" class="animate"></div>
			<v-list-item v-if="!noDetails">
				<v-list-item-content>
					<div class="title-shimmer animate mb-2"></div>
					<div class="comment-shimmer animate"></div>
				</v-list-item-content>
				<v-list-item-action>
					<div class="icon-shimmer animate"></div>
				</v-list-item-action>
			</v-list-item>
		</div>
		<v-card flat v-show="!loading">
			<v-img
				:src="image.src"
				:alt="image.caption"
				@load="onPhotoLoad"
				aspect-ratio="1"
				:height="noDetails?'':'200px'"
			></v-img>
			<v-card-title class="pt-2" v-if="!noDetails">
				<v-layout row justify-space-between align-center>
					<v-flex class="pa-0" xs8>
						<v-list-item-title>{{image.caption}}</v-list-item-title>
						<v-list-item-subtitle class="nmt-1">{{image.description}}</v-list-item-subtitle>
					</v-flex>
					<v-spacer></v-spacer>
					<v-flex shrink class="pa-0">
						<v-btn icon small @click="dialog = !dialog">
							<v-icon>mdi-fullscreen</v-icon>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-card-title>
		</v-card>
	</v-card>
</template>

<script>
import LNLLoader from "../components/LNLLoader.vue";
export default {
	name: "LNLPhoto",
	components: {
		LNLLoader
	},
	props: {
		image: {
			type: Object,
			required: true
		},
		noDetails: Boolean
	},
	data() {
		return {
			loading: true,
			dialog: false
		};
	},
	methods: {
		onPhotoLoad(event) {
			this.loading = false;
		}
	}
};
</script>