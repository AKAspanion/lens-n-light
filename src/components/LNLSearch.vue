<template>
    <v-menu
        top
        left
        nudge-bottom="4"
        transition="scale-transition"
        origin="bottom right"
        z-index="9999"
        min-width="346"
        :close-on-content-click="false"
        v-model="menuSearch"
        style="position: fixed;"
    >
        <template v-slot:activator="{ on }">
            <v-btn fab fixed small bottom right v-on="on" class="mr-2 mb-2" style="z-index: 999;" @click="onSearchClick">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>
        <v-list :height="currentLanguage == 'en' ? '256':'72'">
            <v-list-item class="px-3">
                <v-list-item-content class="pa-0 px-1 py-2">
                    <v-text-field
                        ref="searchInput"
                        v-model="searchText"
                        outlined
                        height
                        v-if="currentLanguage == 'en'"
                        placeholder="Search"
                    ></v-text-field>
                </v-list-item-content>
            </v-list-item>
            <div class="mt-n5">
                <template v-if="showHelp">
                    <v-card flat tile :height="currentLanguage == 'en' ? '156':'0'" class="loader-container">
                        <div class="subtitle-2 grey--text">
                            <template
                                v-if="currentLanguage !='en'"
                            >Search doesn't work in selected language</template>
                            <template v-else>Search in Lens-n-Light</template>
                        </div>
                    </v-card>
                </template>
                <template v-else>
                    <template v-if="listLoading">
                        <v-list-item link class="px-3" v-for="i in 4" :key="i">
                            <v-list-item-content class="pa-0 px-2">
                                <div class="title-shimmer animate"></div>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-card flat tile>
                            <template v-if="searchListItems.length">
                                <v-list-item
                                    link
                                    class="px-3"
                                    v-for="(item, i) in searchListItems"
                                    :key="i"
                                    @click="onSearchListItemClick(item); menuSearch = !menuSearch; searchText = ''"
                                >
                                    <v-list-item-content class="pa-0 px-2">{{item.title}}</v-list-item-content>
                                    <v-list-item-avatar>
                                        <v-icon>{{item.icon}}</v-icon>
                                    </v-list-item-avatar>
                                </v-list-item>
                            </template>
                            <template v-else>
                                <v-card flat tile height="156" class="loader-container">no result found</v-card>
                            </template>
                            
                        </v-card>
                    </template>
                </template>
            </div>
        </v-list>
    </v-menu>
</template>

<script>
import { constants } from "crypto";
import { setTimeout } from "timers";
export default {
    data() {
        return {
            showHelp: true,
            listLoading: false,
            menuSearch: false,
            searchText: "",
            searchListItems: []
        };
    },
    watch: {
        searchText: {
            handler(value) {
                if (value.trim() === "") {
                    this.showHelp = true;
                    return;
                } else {
                    this.showHelp = false;
                    this.onSearchChange();
                }
            }
        }
    },
    computed: {
        lowerCaseSearchText() {
            return this.searchText.toLowerCase();
        },
        currentLanguage() {
            return this.$i18n.locale;
        }
    },
    methods: {
        onSearchChange() {
            this.listLoading = true;
            let photos = this.$store.getters.photos;
            let categories = this.$store.getters.categories;
            let searchItems = [];
            let linkItems = [];
            searchItems.push(
                ...categories.filter(e => {
                    let { title } = e;
                    return title
                        .toLowerCase()
                        .includes(this.lowerCaseSearchText);
                })
            );
            searchItems.push(
                ...photos.filter(e => {
                    let { caption } = e;
                    return caption
                        .toLowerCase()
                        .includes(this.lowerCaseSearchText);
                })
            );
            if ("about".includes(this.lowerCaseSearchText)) {
                linkItems.push({
                    title: "About",
                    type: "link",
                    icon: "mdi-face"
                });
            }
            if ("contact".includes(this.lowerCaseSearchText)) {
                linkItems.push({
                    title: "Contact",
                    type: "link",
                    icon: "mdi-message-text"
                });
            }
            if ("admin".includes(this.lowerCaseSearchText)) {
                linkItems.push({
                    title: "Admin",
                    type: "link",
                    icon: "mdi-settings"
                });
            }
            setTimeout(() => {
                this.searchListItems = [
                    ...searchItems.map(e => {
                        return {
                            id: e.id,
                            title: e.hasOwnProperty("title")
                                ? e.title
                                : e.caption,
                            type: e.hasOwnProperty("title")
                                ? "category"
                                : "photo",
                            icon: e.hasOwnProperty("title")
                                ? "mdi-shape"
                                : "mdi-image"
                        };
                    }),
                    ...linkItems
                ];
                this.listLoading = false;
            }, 250);
        },
        onSearchListItemClick(item) {
            this.$emit(`${item.type}-clicked`, item);
        },
        onSearchClick() {
            if(this.currentLanguage == 'en')
                this.focusSearch();
        },
        focusSearch() {
            setTimeout(() => {
                this.$nextTick(() => this.$refs.searchInput.focus());
            }, 250);
        }
    }
};
</script>

<style>
</style>