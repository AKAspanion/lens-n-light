<template>
    <v-card flat class="mx-auto">
        <v-scale-transition>
            <div class="zoom-buttons" v-if="dialog">
                <v-btn-toggle rounded class="elevation-2">
                    <v-btn
                        :disabled="dialogImageHeight <= 40 ? true:false"
                        @click="dialogImageHeight = dialogImageHeight - 10"
                    >
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn
                        :disabled="dialogImageHeight == 70 ? true:false"
                        @click="dialogImageHeight = 70"
                    >
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn
                        :disabled="dialogImageHeight >= 100 ? true:false"
                        @click="dialogImageHeight = dialogImageHeight + 10"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>
        </v-scale-transition>
        <v-fab-transition>
            <div class="desc-button" v-if="dialog">
                <v-btn
                    fab
                    height="48"
                    width="48"
                    class="elevation-3"
                    @click="descDialog = !descDialog"
                >
                    <v-icon>mdi-information-variant</v-icon>
                </v-btn>
            </div>
        </v-fab-transition>
        <v-slide-x-reverse-transition origin="bottom left">
            <div class="desc-container" v-if="descDialog && dialog">
                <v-card height="100%" elevation="3" class="pa-2">{{image.description}}</v-card>
            </div>
        </v-slide-x-reverse-transition>
        <v-dialog v-model="dialog" fullscreen persistent>
            <v-card
                flat
                tile
                :color="$vuetify.theme.dark ? 'rgba(48,48,48,0.95)' :'rgba(255,255,255,0.95)'"
            >
                <v-toolbar absolute :elevation="2" class="pr-2">
                    <v-toolbar-title>
                        <v-label>{{image.caption}}</v-label>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false; descDialog  = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <div style="height: calc(100vh);">
                    <v-layout column fill-height align-center justify-center>
                        <v-img :src="image.src" contain :max-height="dialogImageHeight + 'vh'" max-width="100vw">
                            <template #placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <l-n-l-loader :loading="true"></l-n-l-loader>
                                </v-row>
                            </template>
                        </v-img>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>

        <div v-if="loading">
            <div :class="noDetails? 'photo-shimmer':'photo-card-shimmer'" class="animate"></div>
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
        noDetails: Boolean
    },
    data() {
        return {
            loading: true,
            dialog: false,
            descDialog: false,
            dialogImageHeight: 70
        };
    },
    methods: {
        onPhotoLoad(event) {
            this.loading = false;
        },
        onImageClick() {
            if (this.noDetails) this.dialog = true;
        }
    }
};
</script>
<style scoped>
* {
    transition: all 0.3s ease;
}
.zoom-buttons {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 9999;
}
.desc-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}
.desc-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    max-width: 350px;
    z-index: 9999;
}
</style>