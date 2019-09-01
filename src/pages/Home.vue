<template>
    <div>
        <!-- loading shimmer -->
        <template v-if="pageLoading">
            <v-card flat tile class="pt-1">
                <v-toolbar
                    flat
                    height="84"
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
        <template v-else>
            <v-card flat tile class="pt-1" min-height="100vh">
                <v-toolbar
                    flat
                    height="84"
                    :color=" themeModel? '#424242':'#fff'"
                    class="toolbar-xs pr-2"
                >
                    <v-layout column class="pa-0 mx-0 pt-2">
                        <v-card-title
                            class="pa-0 pt-2 font-weight-medium"
                            style="margin-left: -4.5px;"
                        >{{$t('lens-n-light')}}</v-card-title>
                        <v-card-title class="pa-0 ml-n1 font-weight-regular subtitle-1">
                            <v-label>{{$t('sahoo.photography')}}</v-label>
                        </v-card-title>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <template v-if="windowWidth > 600">
                        <div class="px-3">
                            <v-btn text @click="routeToPortfolio">{{$t('portfolio')}}</v-btn>
                            <v-btn text @click="routeToContact">{{$t('contact')}}</v-btn>
                        </div>
                        <div class="px-1 pr-2">
                            <template v-for="(link, index) in socialLinks">
                                <v-chip
                                    :key="index"
                                    outlined
                                    small
                                    ripple
                                    class="mr-3"
                                    :href="link.href"
                                    target="_blank"
                                    :color="link.color"
                                >
                                    <v-icon small>{{link.iconName}}</v-icon>
                                </v-chip>
                            </template>
                        </div>
                    </template>
                    <div style="width: 40px; height: 40px;">
                        <v-menu
                            bottom
                            left
                            nudge-bottom="48"
                            transition="scale-transition"
                            origin="top right"
                            z-index="9999"
                            min-width="346"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn fab small v-on="on" class="mr-n1 elevation-3">
                                    <v-avatar small tile size="34">
                                        <img class="pa-1" src="../assets/images/logo-fav.png" />
                                    </v-avatar>
                                </v-btn>
                            </template>
                            <v-list>
                                <template v-if="windowWidth <= 600">
                                    <v-subheader>{{$t('links')}}</v-subheader>
                                    <v-list-item link @click="routeToPortfolio">
                                        <v-list-item-content>
                                            <v-list-item-title>{{$t('portfolio')}}</v-list-item-title>
                                            <v-list-item-subtitle>{{$t('portfolio.goto')}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-avatar @click="routeToPortfolio">
                                            <v-avatar small size="36" class="mr-n1">
                                                <v-icon>mdi-face</v-icon>
                                            </v-avatar>
                                        </v-list-item-avatar>
                                    </v-list-item>
                                    <v-list-item link @click="routeToContact">
                                        <v-list-item-content>
                                            <v-list-item-title>{{$t('contact')}}</v-list-item-title>
                                            <v-list-item-subtitle>{{$t('contact.goto')}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-avatar @click="routeToContact">
                                            <v-avatar small size="36" class="mr-n1">
                                                <v-icon>mdi-message-text</v-icon>
                                            </v-avatar>
                                        </v-list-item-avatar>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                                <v-subheader>{{$t('settings')}}</v-subheader>
                                <v-list-item link>
                                    <v-list-item-content @click="routeToAdmin">
                                        <v-list-item-title>{{$t('admin')}}</v-list-item-title>
                                        <v-list-item-subtitle>{{$t('admin.goto')}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-avatar @click="routeToAdmin">
                                        <v-avatar small class="mr-n1">
                                            <v-icon>mdi-settings</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                </v-list-item>
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
                                <v-divider></v-divider>
                                <v-list-item-content class="pt-5">
                                    <div class="text-center overline made-by">
                                        made with
                                        <span class="px-1">
                                            <img src="../assets/images/heart-icon.png" />
                                        </span> by
                                        <span class="selectable" @click="routeToSpanion">ankit</span>
                                    </div>
                                </v-list-item-content>
                            </v-list>
                        </v-menu>
                    </div>
                </v-toolbar>
                <v-card flat tile class="lnl-tab">
                    <v-tabs
                        v-model="tab"
                        :ripple="false"
                        slider-color="primary"
                        style="margin-left: -24px; width: calc(100% + 24px);"
                    >
                        <v-tab v-for="(i, index) in categories" :key="'tab-'+index">{{ i.title }}</v-tab>
                        <v-tab-item
                            eager
                            v-for="(value, propertyName) in photosByCategory"
                            :key="'item-'+propertyName"
                        >
                            <v-divider class="ma-0 pa-0"></v-divider>
                            <v-card flat tile class="home-grid-xs" min-height="calc(100vh - 145px)">
                                <l-n-l-grid
                                    :images="value"
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
        <l-n-l-search
            v-if="!pageLoading"
            @category-clicked="onCategorySearch"
            @photo-clicked="onPhotoSearch"
            @link-clicked="onLinkSearch"
        ></l-n-l-search>
    </div>
</template>

<script>
import {
    getAllPhotos,
    getAllCategories,
    getImagesByCategory,
    getActiveCategory
} from "../helper";
import LNLLoader from "../components/LNLLoader.vue";
import LNLGrid from "../components/LNLGrid.vue";
import LNLSearch from "../components/LNLSearch.vue";
import { Promise } from "q";
export default {
    name: "Home",
    components: {
        LNLGrid,
        LNLLoader,
        LNLSearch
    },
    data() {
        return {
            tab: null,
            menu: false,
            langs: ["en", "hi", "ba"],
            photos: [],
            categories: [],
            photosByCategory: {},
            pageLoading: false,
            swipeDirection: "None"
        };
    },
    watch: {
        tab: {
            handler(newV) {
                if (this.tab < 0 || this.tab > this.categories.length) return;
                this.$store.dispatch(
                    "ACTIVE_CATEGORY",
                    this.categories[newV].id
                );
            }
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
        },
        windowWidth() {
            return this.$store.state.window.width;
        },
        socialLinks() {
            return this.$store.state.socialLinks;
        }
    },
    methods: {
        routeToAdmin() {
            this.$router.push({ name: "Admin" });
        },
        routeToPortfolio() {
            this.$router.push({ name: "Portfolio" });
        },
        routeToContact() {
            this.$router.push({ name: "Contact" });
        },
        routeToSpanion() {
            window.open("http://www.spanion.xyz", "_blank");
        },
        routeToPhoto(val) {
            this.$router.push({ name: "Photo", params: { id: val.id } });
        },
        goToCategory(val) {
            this.tab = this.categories.findIndex(e => e.id === val.id);
        },
        loadPage() {
            return Promise.all([getAllCategories(), getAllPhotos()]);
        },
        imageClicked(val) {
            this.routeToPhoto(val);
        },
        onLinkSearch(val) {
            switch (val.title) {
                case "Admin":
                    this.routeToAdmin();
                    break;
                case "Contact":
                    this.routeToContact();
                    break;
                case "About":
                    this.routeToPortfolio();
                    break;
                default:
                    break;
            }
        },
        onPhotoSearch(val) {
            this.routeToPhoto(val);
        },
        onCategorySearch(val) {
            this.goToCategory(val);
        }
    },
    mounted() {
        if (!this.$store.getters.landingVisited) {
            this.pageLoading = true;
            this.loadPage()
                .then(response => {
                    this.$store.dispatch("LOAD_CATEGORIES", response[0]);
                    this.$store.dispatch("LOAD_PHOTOS", response[1]);
                    this.$store.dispatch("ACTIVE_CATEGORY", response[0][0].id);
                    this.$store.dispatch("LANDING_VISITED", true);
                    this.categories = response[0];
                    this.photos = response[1];
                    return getImagesByCategory();
                })
                .then(imagesByCategory => {
                    this.$store.dispatch(
                        "LOAD_PHOTOS_BY_CATEGORIES",
                        imagesByCategory
                    );
                    this.photosByCategory = imagesByCategory;
                    this.tab = getActiveCategory().index;
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
            this.photosByCategory = this.$store.getters.photosByCategory;
            this.tab = getActiveCategory().index;
        }
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
.made-by img {
    width: 12px;
    height: 12px;
    -webkit-animation: heartbeat 1s infinite ease;
    animation: heartbeat 1s infinite ease;
}
</style>
