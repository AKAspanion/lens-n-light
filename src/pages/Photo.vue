<template>
    <div>
        <v-btn
            fab
            left
            fixed
            small
            elevation="3"
            v-if="!pageLoading"
            @click="routeToPreviousPhoto"
            :disabled="currentPhotoIndex === 0"
            :class=" windowWidth > 600 ?'left-button' :'left-button-xs'"
        >
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
            fab
            right
            fixed
            small
            elevation="3"
            v-if="!pageLoading"
            @click="routeToNextPhoto"
            :disabled="currentPhotoIndex === totalPhotos - 1"
            :class=" windowWidth > 600 ?'right-button' :'right-button-xs'"
        >
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <template v-if="pageLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="pageLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-if="!pageLoading">
            <v-card flat tile min-height="100vh" class="pt-2">
                <v-dialog v-model="shareDialog" max-width="400">
                    <v-card>
                        <v-layout row align-center class="ma-0 px-4 pt-2">
                            <v-toolbar-title>Share</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="shareDialog = !shareDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-layout row align-baseline class="ma-0 px-4">
                            <v-text-field id="share-link" v-model="shareLink" readonly class="pr-2"></v-text-field>
                            <v-btn depressed color="primary" @click="copyLink">Copy</v-btn>
                        </v-layout>
                    </v-card>
                </v-dialog>
                <v-toolbar flat height="64" class="px-3">
                    <v-btn icon @click="goBack">
                        <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-chip outlined>{{activeCategory.title}}</v-chip>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="shareDialog = !shareDialog; createLink()">
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                </v-toolbar>
                <template v-if="windowWidth >= 1160">
                    <v-card
                        flat
                        class="px-7"
                        style="border-radius: 4px !important;"
                        min-height="calc(100vh - 76px)"
                    >
                        <v-container fluid grid-list-md fill-height class="ma-0 pa-0">
                            <v-layout row wrap justify-center align-start class="ma-0 pa-0">
                                <v-flex xs6 class="ma-0 pa-0 text-center">
                                    <v-layout
                                        row
                                        justify-center
                                        align-center
                                        style="height: calc(100vh - 110px)"
                                        class="ma-0 pa-0"
                                    >
                                        <v-flex
                                            class="ma-0 pa-0"
                                            style="padding-left: calc(((100vw / 2) - 400px) / 2) !important"
                                        >
                                            <l-n-l-photo :image="photo" no-details full-height></l-n-l-photo>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6 class="ma-0 pa-0">
                                    <v-layout
                                        row
                                        justify-center
                                        align-center
                                        style="height: calc(100vh - 110px)"
                                        class="ma-0 pa-0"
                                    >
                                        <v-flex
                                            class="ma-0 pa-0"
                                            style="min-height: 440px; padding-right: calc((50vw - 400px) / 2) !important;"
                                        >
                                            <v-card-title class="px-0 pt-5">{{photo.caption}}</v-card-title>
                                            <v-card-text class="px-0">{{photo.description}}</v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </template>
                <template v-else>
                    <v-container fluid class="ma-0 pa-0" v-if="windowWidth < 1160">
                        <v-layout column justify-center align-center fill-height class="ma-0 pa-0">
                            <v-card
                                flat
                                class="px-8 py-4"
                                width="456"
                                style="border-radius: 4px !important;"
                            >
                                <l-n-l-photo :image="photo" no-details full-height></l-n-l-photo>
                                <v-card-title class="px-0 pt-5">{{photo.caption}}</v-card-title>
                                <v-card-text class="px-0">
                                    {{photo.description}}
                                    <v-chip
                                        outlined
                                        small
                                        link
                                        class="mr-1"
                                        style="margin: 2px 0; "
                                        :href="`https://www.instagram.com/explore/tags/${tag}/?hl=en`"
                                        target="_blank"
                                        v-for="(tag, index) in photo.hashtags"
                                        :key="index"
                                    >{{'#'+tag}}</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-layout>
                    </v-container>
                </template>
            </v-card>
        </template>
    </div>
</template>

<script>
import LNLPhoto from "../components/LNLPhoto.vue";
import LNLLoader from "../components/LNLLoader.vue";
import {
    getTags,
    getAllPhotos,
    getAllCategories,
    getImagesByCategory,
    getActiveCategory
} from "../helper";
import { Promise } from "q";
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
            photo: {},
            scrollList: [],
            activeCategory: {},
            hashtags: []
        };
    },
    computed: {
        windowWidth() {
            return this.$store.state.window.width;
        },
        currentPhotoIndex() {
            return this.scrollList.findIndex(
                e => e.id === this.$route.params.id
            );
        },
        totalPhotos() {
            return this.scrollList.length;
        }
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/home" });
        },
        setPhoto() {
            this.photo = this.$store.getters.photos.filter(
                e => e.id === this.$route.params.id
            )[0];
        },
        setScrollList() {
            this.activeCategory = getActiveCategory();
            this.scrollList = this.$store.getters.photosByCategory[
                this.activeCategory.id
            ];
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
        },
        routeToPreviousPhoto() {
            if (this.currentPhotoIndex === 0)
                this.routeToPhoto(this.totalPhotos - 1, false);
            else this.routeToPhoto(this.currentPhotoIndex - 1, false);
        },
        routeToNextPhoto() {
            if (this.currentPhotoIndex === this.totalPhotos - 1)
                this.routeToPhoto(0, true);
            else this.routeToPhoto(this.currentPhotoIndex + 1, true);
        },
        routeToPhoto(index, next) {
            this.$router.replace({
                name: "Photo",
                params: { id: this.scrollList[index].id },
                query: { next }
            });
        }
    },
    mounted() {
        if (!this.$store.getters.landingVisited) {
            this.pageLoading = true;
            this.loadPage()
                .then(response => {
                    this.$store.dispatch("LOAD_CATEGORIES", response[0]);
                    this.$store.dispatch("LOAD_PHOTOS", response[1]);
                    this.$store.dispatch("LANDING_VISITED", true);
                    this.setPhoto();
                    this.$store.dispatch(
                        "ACTIVE_CATEGORY",
                        this.photo.categoryId
                    );
                    return getImagesByCategory();
                })
                .then(imagesByCategory => {
                    this.$store.dispatch(
                        "LOAD_PHOTOS_BY_CATEGORIES",
                        imagesByCategory
                    );
                    this.setScrollList();
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.pageLoading = false;
                });
        } else {
            this.setPhoto();
            this.$store.dispatch("ACTIVE_CATEGORY", this.photo.categoryId);
            this.setScrollList();
        }
    }
};
</script>

<style scoped>
.left-button,
.right-button {
    top: 47.5%;
}
.left-button {
    left: 6% !important;
}
.right-button {
    right: 6% !important;
}
.left-button-xs,
.right-button-xs {
    bottom: 24px !important;
}
.right-button-xs {
    right: 24px !important;
}
.left-button-xs {
    left: 24px !important;
}
</style>