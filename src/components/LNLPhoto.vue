<template>
    <v-card flat class="mx-auto">
        <v-dialog v-model="dialog" fullscreen persistent v-if="!noDialog">
            <v-card flat tile :color="$vuetify.theme.dark ? 'rgba(66,66,66)' :'rgba(255,255,255)'">
                <v-toolbar absolute :elevation="2" class="pr-2">
                    <v-toolbar-title>
                        <v-label>{{image.caption}}</v-label>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false; descDialog  = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <div :class="windowWidth <= 600 ? 'zoom-xs':'zoom'">
                    <v-layout column fill-height align-center justify-center>
                        <v-zoomer style="width: calc(100vw - 32px); height: calc(100vh - 86px)">
                            <img
                                :src="image.src"
                                style="object-fit: contain; width: 100%; height: 100%;"
                            />
                        </v-zoomer>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>

        <div v-if="loading">
            <div
                class="animate"
                :class="[noDetails? 'photo-shimmer':'photo-card-shimmer', fullHeight?'full-photo-shimmer':'']"
            ></div>
            <v-list-item v-if="!noDetails">
                <v-list-item-content>
                    <div class="title-shimmer animate mb-2"></div>
                    <div class="comment-shimmer animate"></div>
                </v-list-item-content>
                <v-list-item-action>
                    <div class="icon-shimmer animate"></div>
                </v-list-item-action>
            </v-list-item>
        </div>
        <v-card flat v-show="!loading" class="pa-0 ma-0" :class="noDetails? 'selectable':''">
            <v-img
                :src="image.src"
                :alt="image.caption"
                @load="onPhotoLoad"
                aspect-ratio="1"
                max-width="400"
                width="auto"
                @click="onImageClick"
            ></v-img>
            <v-card-title class="pt-2" v-if="!noDetails">
                <v-layout row justify-space-between align-center>
                    <v-flex class="pa-0" xs8>
                        <v-list-item-title>{{image.caption}}</v-list-item-title>
                        <v-list-item-subtitle class="nmt-1">{{image.description}}</v-list-item-subtitle>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex shrink class="pa-0">
                        <v-btn icon small @click="dialog = !dialog">
                            <v-icon>mdi-fullscreen</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-title>
        </v-card>
    </v-card>
</template>

<script>
import LNLLoader from "../components/LNLLoader.vue";
export default {
    name: "LNLPhoto",
    components: {
        LNLLoader
    },
    props: {
        image: {
            type: Object,
            required: true
        },
        noDetails: Boolean,
        noDialog: Boolean,
        fullHeight: Boolean
    },
    data() {
        return {
            loading: true,
            dialog: false,
            descDialog: false
        };
    },
    computed: {
        windowWidth() {
            return this.$store.state.window.width;
        }
    },
    methods: {
        onPhotoLoad(event) {
            this.loading = false;
        },
        onImageClick(e) {
            if (this.noDetails && !this.noDialog) this.dialog = true;
            if (this.noDialog) this.$emit("image-clicked");
        }
    }
};
</script>
<style scoped>
* {
    transition: all 0.3s ease;
}
.zoom{
    padding-top: 74px;
}
.zoom-xs{
    padding-top: 72px;
}
</style>