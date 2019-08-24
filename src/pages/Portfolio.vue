<template>
	<div>
		<v-card flat tile min-height="100vh" class="pt-3">
			<v-toolbar flat height="64" class="px-3">
				<v-btn icon @click="goBack">
					<v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn icon @click="shareDialog = !shareDialog">
					<v-icon>mdi-message-text</v-icon>
				</v-btn>
			</v-toolbar>
			<v-layout column align-center class="ma-0 pa-0 pb-4">
				<v-avatar :size="windowWidth > 600 ? '250':'150'">
					<img class="pa-1" src="../assets/images/profile.jpg" />
				</v-avatar>
				<v-card-title>{{$t('sahoo')}}</v-card-title>
				<div class="overline primary--text text-center">
					<span>{{$t('sahoo.freelance')}}</span>
					<br />
					<span>{{$t('sahoo.owner')}}</span>
				</div>
			</v-layout>
			<div class="px-10 pb-3 text-center">
				<v-chip
					outlined
					link
					class="mr-3"
					href="https://www.facebook.com/amitphotography/"
					target="_blank"
				><v-icon small>mdi-facebook</v-icon></v-chip>
				<v-chip
					outlined
					class="mr-3"
					href="https://www.instagram.com/amitsahoophotography/"
					target="_blank"
				><v-icon small>mdi-instagram</v-icon></v-chip>
			</div>
			<v-card-text
				class="px-10 pb-6 pt-3"
				style="text-align: justify; max-width: 600px; margin: 0 auto;"
			>{{$t('sahoo.desc')}}</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	methods: {
		goBack() {
			this.$router.push({ path: "/home" });
		}
	},
	computed: {
		windowWidth() {
			return this.$store.state.window.width;
		}
	}
};
</script>

<style>
</style>