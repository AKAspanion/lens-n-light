<template>
    <div>
        <template v-if="photosLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="photosLoading || categoryLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-if="!photosLoading">
            <v-toolbar
                flat
                color="primary"
                dark
                :class="windowWidth > 600 ? 'toolbar':'toolbar-xs'"
            >
                <v-btn v-if="windowWidth < 600" icon small class="nmr-0">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-card-title class="pa-0">Lens-n-Light</v-card-title>
                <template #extension>
                    <v-layout row wrap justify-space-between align-start class="pa-0 ma-0 pt-4">
                        <div>
                            <v-list-item-title>Manage Photos</v-list-item-title>
                        </div>
                        <div>
                            <v-switch v-model="themeModel" color="secondary"></v-switch>
                        </div>
                    </v-layout>
                </template>
            </v-toolbar>
            <v-card flat tile :class="windowWidth > 600 ? 'home-grid':'home-grid-xs'">
                <l-n-l-grid :images="photos" gutter="xl" flat no-details></l-n-l-grid>
            </v-card>
        </template>
    </div>
</template>

<script>
import { fetchAllPhotos } from "../firebase";
import LNLLoader from "../components/LNLLoader.vue";
import LNLGrid from "../components/LNLGrid.vue";
export default {
    name: "HomePage",
    components: {
        LNLGrid,
        LNLLoader
    },
    data() {
        return {
            photos: [],
            photosLoading: false,
            windowWidth: null
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

    computed: {
        themeModel: {
            get() {
                return this.$vuetify.theme.dark;
            },
            set(val) {
                this.$vuetify.theme.dark = val;
            }
        }
    },
    created() {
        this.getAllPhotos();
        this.windowWidth = this.$store.state.window.width;
    }
};
</script>

<style scoped>
.home-grid {
    padding: 32px 40px;
}
.home-grid-xs {
    padding: 16px 24px;
}
.toolbar {
    padding-left: 24px;
    padding-right: 24px;
}
.toolbar-xs {
    padding-left: 12px;
    padding-right: 12px;
}
</style>
