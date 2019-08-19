<template>
    <div>
        <template v-if="pageLoading">
            <v-card flat tile class="pt-3">
                <v-toolbar
                    flat
                    height="64"
                    :color=" themeModel? '#424242':'#fff'"
                    class="toolbar-xs"
                >
                    <v-card-title class="home-title-shimmer animate ml-n1"></v-card-title>
                    <v-list-item-avatar class="avatar-shimmer animate mr-n1"></v-list-item-avatar>
                </v-toolbar>
                <v-layout class="px-7 pt-1 pb-2">
                    <div class="tab-shimmer animate"></div>
                    <div class="tab-shimmer animate"></div>
                    <div class="tab-shimmer animate"></div>
                    <div class="tab-shimmer animate"></div>
                </v-layout>
                <v-divider></v-divider>
                <div class="loader-container full-loader">
                    <l-n-l-loader :loading="pageLoading"></l-n-l-loader>
                </div>
            </v-card>
        </template>
        <template v-if="!pageLoading">
            <v-card flat tile class="pt-3" min-height="100vh">
                <v-toolbar
                    flat
                    height="64"
                    :color=" themeModel? '#424242':'#fff'"
                    class="toolbar-xs"
                >
                    <v-card-title
                        class="pa-0 font-weight-medium"
                        style="margin-left: -4.5px;"
                    >{{$t('lens-n-light')}}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-menu
                        bottom
                        left
                        nudge-bottom="48"
                        transition="scroll-y-transition"
                        style="z-index: 9999"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn fab small v-on="on" class="mr-n1 elevation-3">
                                <v-avatar small tile size="34">
                                    <img class="pa-1" src="../assets/images/logo-fav.png" />
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-subheader>{{$t('links')}}</v-subheader>
                            <v-list-item link @click="routeToPortfolio">
                                <v-list-item-content>
                                    <v-list-item-title>{{$t('portfolio')}}</v-list-item-title>
                                    <v-list-item-subtitle>{{$t('portfolio.goto')}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar>
                                    <v-avatar small size="36" class="mr-n1">
                                        <img src="../assets/images/profile.jpg" />
                                    </v-avatar>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-content @click="routeToAdmin">
                                    <v-list-item-title>{{$t('admin')}}</v-list-item-title>
                                    <v-list-item-subtitle>{{$t('admin.goto')}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-avatar @click="routeToAdmin">
                                    <v-avatar small size="36" class="mr-n1">
                                        <v-icon>mdi-settings</v-icon>
                                    </v-avatar>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-subheader>{{$t('settings')}}</v-subheader>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{themeModel? $t('light'): $t('dark')}}</v-list-item-title>
                                    <v-list-item-subtitle>{{themeModel? $t('light.toggle'): $t('dark.toggle')}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-switch v-model="themeModel"></v-switch>
                                </v-list-item-action>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>{{$t('language')}}</v-list-item-title>
                                    <v-list-item-subtitle>{{$t('language.change')}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn-toggle
                                        v-model="$i18n.locale"
                                        mandatory
                                        rounded
                                        class="lnl-lang-btn"
                                    >
                                        <v-btn
                                            v-for="(lang, i) in langs"
                                            :key="`Lang${i}`"
                                            :value="lang"
                                        >{{ lang }}</v-btn>
                                    </v-btn-toggle>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
                <v-card flat tile class="lnl-tab">
                    <v-tabs
                        v-model="tab"
                        :ripple="false"
                        slider-color="primary"
                        style="margin-left: -24px; width: calc(100% + 24px);"
                    >
                        <v-tab v-for="(i, index) in categories" :key="'tab-'+index">{{ i.title }}</v-tab>
                        <v-tab-item v-for="(j, index) in imagesByCategory" :key="'item-'+index">
                            <v-divider class="ma-0 pa-0"></v-divider>
                            <v-card flat tile class="home-grid-xs" min-height="calc(100vh - 125px)">
                                <l-n-l-grid
                                    :images="j"
                                    gutter="xl"
                                    no-details
                                    no-dialog
                                    @grid-image-clicked="imageClicked"
                                ></l-n-l-grid>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-card>
        </template>
    </div>
</template>

<script>
import { getAllPhotos, getAllCategories } from "../helper";
import LNLLoader from "../components/LNLLoader.vue";
import LNLGrid from "../components/LNLGrid.vue";
import { Promise } from "q";
var _ = require('lodash');
export default {
    name: "Home",
    components: {
        LNLGrid,
        LNLLoader
    },
    data() {
        return {
            tab: null,
            menu: false,
            langs: ["en", "hi", "ba"],
            photos: [],
            categories: [],
            imagesByCategory: [],
            pageLoading: false,
            windowWidth: null,
            swipeDirection: "None"
        };
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
    methods: {
        routeToAdmin() {
            this.$router.push({ name: "Login" });
        },
        routeToPortfolio() {
            this.$router.push({ name: "Portfolio" });
        },
        loadPage() {
            return Promise.all([getAllCategories(), getAllPhotos()]);
        },
        parseImages() {
            this.imagesByCategory = this.categories.map(c => {
                return _.shuffle(this.photos.filter(e => e.categoryId === c.id));
            });
        },
        imageClicked(val) {
            this.$router.push({ name: "Photo", params: { id: val.id } });
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
                    this.parseImages();
                })
                .catch(err => {
                    this.$store.dispatch("showSnackBar", err);
                })
                .then(() => {
                    this.pageLoading = false;
                });
        } else {
            this.photos = this.$store.getters.photos;
            this.categories = this.$store.getters.categories;
            this.parseImages();
        }
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
.lnl-lang-btn >>> .v-btn {
    height: 36px !important;
}
</style>
