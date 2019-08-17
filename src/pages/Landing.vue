<template>
    <div>
        <template v-if="photosLoading || categoriesLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="photosLoading || categoriesLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-if="!(photosLoading && categoriesLoading)">
            <v-card height="100vh" width="100vw">
                <v-container grid-list-md fluid fill-height>
                    <v-layout column wrap justify-space-between align-center>
                        <div class="text-center pt-4">
                            <div class="display-1 font-weight-bold pt-12">LENS-N-LIGHT</div>
                            <div class="pt-2">
                                <v-label>Amit Sahoo Photography</v-label>
                            </div>
                        </div>
                        <div>
                            <img src="../assets/images/logo-fav.png" height="100px" />
                        </div>
                        <div class="text-center">
                            <div class="pb-12 mb-4">
                                <v-btn color="primary" @click="navigateToHome">
                                    Explore
                                    <v-icon
                                        right
                                        style="transform: rotate(-45deg)"
                                    >mdi-arrow-bottom-right</v-icon>
                                </v-btn>
                            </div>
                            <div class="overline grey--text">&copy; Amit Sahoo | 2019</div>
                        </div>
                    </v-layout>
                </v-container>
            </v-card>
        </template>
    </div>
</template>

<script>
import { getAllPhotos, getAllCategories } from "../helper";
import LNLLoader from "../components/LNLLoader.vue";
export default {
    components: {
        LNLLoader
    },
    data() {
        return {
            photosLoading: false,
            categoriesLoading: false
        };
    },
    methods: {
        navigateToHome() {
            this.$store.dispatch("landingVisited", true);
            this.$router.push({ name: "Home" });
        }
    },
    mounted() {
        if (!this.$store.getters.landingVisited) {
            this.photosLoading = true;
            this.categoriesLoading = true;
            getAllCategories()
                .then(response => {
                    this.$store.dispatch("LOAD_CATEGORIES", response);
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.categoriesLoading = false;
                });

            getAllPhotos()
                .then(response => {
                    this.$store.dispatch("LOAD_PHOTOS", response);
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.photosLoading = false;
                });
        }
    }
};
</script>