<template>
    <div>
        <template v-if="pageLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="pageLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-else>
            <v-card min-height="100vh" width="100vw">
                <div class="d-flex align-center justify-center flex-wrap">
                    <div class="pa-0 img-container" :class="`item-${small ? 'small-top':'large'}`">
                        <img src="../assets/images/profile.jpg" />
                    </div>
                    <div :class="`item-${small ? 'small-bottom':'large'}`">                        
                        <v-container grid-list-md fluid fill-height>
                            <v-layout column wrap justify-space-between align-center>
                                <div class="text-center pt-4">
                                    <div class="display-1 font-weight-bold pt-12">LENS-AND-LIGHT</div>
                                    <div class="pt-2">
                                        <v-label>Amit Sahoo Photography</v-label>
                                    </div>
                                </div>
                                <div>
                                    <img src="../assets/images/logo-fav.png" height="100px" />
                                </div>
                                <div class="text-center">
                                    <div class="pb-12 mb-4 d-flex flex-wrap align-center justify-center">
                                        <v-btn class="ma-4" height="40" dark @click="navigateTo('Home')">
                                            Showcase
                                        </v-btn>
                                        <v-btn class="ma-4" height="40" dark @click="navigateTo('Portfolio')">
                                            Amit's Life
                                        </v-btn>
                                        <v-btn class="ma-4" height="40" dark @click="navigateTo('Contact')">
                                            INQUIRIES
                                        </v-btn>
                                    </div>
                                    <div class="overline grey--text">&copy; Amit Sahoo | 2019</div>
                                </div>
                            </v-layout>
                        </v-container>
                    </div>
                </div>
            </v-card>
        </template>
    </div>
</template>

<script>
import { getAllPhotos, getAllCategories, getImagesByCategory } from "../helper";
import LNLLoader from "../components/LNLLoader.vue";
export default {
    components: {
        LNLLoader
    },
    data() {
        return {
            pageLoading: false
        };
    },
    computed: {
        small() {
            return this.$vuetify.breakpoint.smAndDown
        }
    },
    methods: {
        navigateTo(name) {
            this.$store.dispatch("LANDING_VISITED", true);
            this.$router.push({ name });
        },
        loadPage() {
            return Promise.all([getAllCategories(), getAllPhotos()]);
        }
    },
    mounted() {
        if (!this.$store.getters.landingVisited) {
            this.pageLoading = true;
            this.loadPage()
                .then(response => {
                    this.$store.dispatch("LOAD_CATEGORIES", response[0]);
                    this.$store.dispatch("LOAD_PHOTOS", response[1]);
                    this.$store.dispatch("ACTIVE_CATEGORY", response[0].id);
                    return getImagesByCategory();
                })
                .then(response => {
                    this.$store.dispatch("LOAD_PHOTOS_BY_CATEGORIES", response);
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.pageLoading = false;
                });
        }
    }
};
</script>

<style scoped>
.img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
}
.item-small-top {
    height: 40vh;
    width: 100vw;
}
.item-small-bottom {
    height: 100vh;
    width: 100vw;
}
.item-large {
    width: 50%;
    height: 100vh;
}
</style>