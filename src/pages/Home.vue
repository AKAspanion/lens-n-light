<template>
	<div>
		<template v-if="photosLoading">
			<div class="loader-container page-loader">
				<l-n-l-loader :loading="photosLoading || categoryLoading"></l-n-l-loader>
			</div>
		</template>
		<template v-if="!photosLoading">
			<div class="pa-2">
				<l-n-l-container :images="photos" :no-details="true"></l-n-l-container>
			</div>
		</template>
	</div>
</template>

<script>
import { fetchAllPhotos } from "../firebase";
import LNLLoader from "../components/LNLLoader.vue";
import LNLContainer from "../components/LNLContainer.vue";
export default {
	name: "HomePage",
	components: {
		LNLContainer,
		LNLLoader
	},
	data() {
		return {
			photos: [],
			photosLoading: false
		};
	},
	methods: {
		getAllPhotos() {
			this.photosLoading = true;
			fetchAllPhotos()
				.then(snapshot => {
					return this.parseAllPhotos(snapshot);
				})
				.then(photos => {
					this.photos = photos;
				})
				.catch(() => {
					this.$store.dispatch(
						"showSnackBar",
						"Error Getting photos. Please try later!"
					);
				})
				.then(() => {
					this.photosLoading = false;
				});
		},
		parseAllPhotos(snapshot) {
			return new Promise((resolve, reject) => {
				let photos = [];
				snapshot.forEach(doc => {
					photos.push({
						id: doc.id,
						...doc.data()
					});
				});
				resolve(photos);
			});
		}
	},
	created() {
		this.getAllPhotos();
	}
};
</script>

<style>
</style>
