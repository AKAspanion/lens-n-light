<template>
    <div>
        <template v-if="pageLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="pageLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-if="!pageLoading">
            <v-card flat tile min-height="100vh" class="pt-3">
                <v-dialog v-model="shareDialog">
                    <v-card>
                        <v-layout row align-center class="ma-0 px-4 pt-2">
                            <v-toolbar-title>Share</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon small @click="shareDialog = !shareDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-layout row align-center class="ma-0 px-4">
                            <v-text-field id="share-link" v-model="shareLink" readonly></v-text-field>
                            <v-spacer></v-spacer>
                            <v-btn depressed color="primary" @click="copyLink">Copy</v-btn>
                        </v-layout>
                    </v-card>
                </v-dialog>
                <v-toolbar flat height="64" class="px-4">
                    <v-btn icon small @click="goBack">
                        <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon small @click="shareDialog = !shareDialog; createLink()">
                        <v-icon>mdi-share</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card flat class="px-7 py-4" style="border-radius: 4px !important;">
                    <l-n-l-photo :image="photo" no-details></l-n-l-photo>
                    <v-card-title class="px-0 pt-5">{{photo.caption}}</v-card-title>
                    <v-card-text class="px-0">{{photo.description}}</v-card-text>
                </v-card>
            </v-card>
        </template>
    </div>
</template>

<script>
import LNLPhoto from "../components/LNLPhoto.vue";
import LNLLoader from "../components/LNLLoader.vue";
import { getAllPhotos, getAllCategories } from "../helper";
export default {
    components: {
        LNLPhoto,
        LNLLoader
    },
    data() {
        return {
            pageLoading: false,
            shareDialog: false,
            shareLink: "amitsahoophotography.xyz",
            photo: {}
        };
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/home" });
        },
        getPhoto() {
            this.photo = this.$store.getters.photos.filter(
                e => e.id === this.$route.params.id
            )[0];
        },
        loadPage() {
            return Promise.all([getAllCategories(), getAllPhotos()]);
        },
        createLink() {
            this.shareLink =
                "amitsahoophotography.xyz" + this.$router.currentRoute.fullPath;
        },
        copyLink() {
            document.querySelector("#share-link").select();
            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                this.$store.dispatch("showSnackBar", "Copied to clipboard");
            } catch (err) {
                this.$store.dispatch("showSnackBar", "Oops, unable to copy");
            }
            this.shareDialog = false;
        }
    },
    mounted() {
        if (!this.$store.getters.landingVisited) {
            this.pageLoading = true;
            this.loadPage()
                .then(response => {
                    this.categories = response[0];
                    this.photos = response[1];
                    this.$store.dispatch("LOAD_CATEGORIES", response[0]);
                    this.$store.dispatch("LOAD_PHOTOS", response[1]);
                    this.$store.dispatch("landingVisited", true);
                    this.getPhoto();
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.pageLoading = false;
                });
        } else {
            this.getPhoto();
        }
    }
};
</script>

<style>
</style>