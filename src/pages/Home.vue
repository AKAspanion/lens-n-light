<template>
    <div
        v-touch="{
            left: () => swipe('LEFT'),
            right: () => swipe('RIGHT'),
            up: () => swipe('UP'),
            down: () => swipe('DOWN')
        }"
    >
        <template v-if="photosLoading">
            <div class="loader-container page-loader">
                <l-n-l-loader :loading="photosLoading || categoryLoading"></l-n-l-loader>
            </div>
        </template>
        <template v-if="!photosLoading">
            <v-toolbar
                flat
                height="64"
                :color=" themeModel? '#424242':'#fff'"
                class="toolbar-xs"
            >
                <v-card-title class="pa-0" style="margin-left: -4.5px;">Lens-n-Light</v-card-title>
                <v-spacer></v-spacer>
                <v-menu
                    v-model="menu"
                    bottom
                    left
                    nudge-bottom="48"
                    transition="scroll-y-transition"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn icon small v-on="on">
                            <v-avatar small tile size="34">
                                <img class="pa-1" src="../assets/images/logo-fav.png" />
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-title>{{themeModel? 'Light':'Dark'}}</v-list-item-title>
                                <v-list-item-subtitle>Toggle theme to {{themeModel? 'light':'dark'}} mode</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-switch v-model="themeModel"></v-switch>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <!-- <v-switch v-model="themeModel" class="pt-4 mt-2"></v-switch> -->
            </v-toolbar>
            <v-card flat tile class="lnl-tab">
                <v-tabs
                    v-model="tab"
                    :ripple="false"
                    slider-color="primary"
                    style="margin-left: -24px;"
                >
                    <v-tab v-for="i in tabItems" :key="i" :href="'#tab-' + i">{{ i }}</v-tab>
                </v-tabs>
            </v-card>
            <v-divider class="ma-0 pa-0"></v-divider>
            <v-card flat tile class="home-grid-xs">
                <l-n-l-grid :images="photos" gutter="xl" no-details></l-n-l-grid>
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
            menu: false,
            tabItems: ["Nature", "Animal", "Portrait", "Abstract"],
            photos: [],
            photosLoading: false,
            windowWidth: null,
            swipeDirection: "None"
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
        },
        swipe(direction) {
            this.swipeDirection = direction;
            if (direction === "RIGHT") this.openMenu;
        },
        openMenu() {
            if (!this.menu) this.menu = true;
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
.lnl-tab {
    padding: 0px 0 0 24px;
    overflow: hidden;
}
.lnl-tab >>> .v-tab {
    padding: 0 24px;
    margin-left: 0px !important;
    text-transform: capitalize !important;
}
.lnl-tab >>> .v-tabs-slider {
    width: calc(100% - 48px) !important;
    margin: 0px 24px !important;
}
</style>
