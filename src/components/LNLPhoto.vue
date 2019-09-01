<template>
    <v-card flat class="mx-auto">
        <v-dialog v-model="dialog" fullscreen persistent v-if="!noDialog">
            <v-card flat tile min-height="100vh" class="pt-3">
                <v-toolbar flat height="64" class="px-3">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <div>
                    <v-layout column fill-height align-center justify-center>
                        <v-zoomer style="width: calc(100vw - 17px); height: calc(100vh - 80px)">
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
        <v-card flat v-show="!loading" class="pa-0 ma-0" >
            <v-img
                :src="image.src"
                :alt="image.caption"
                @load="onPhotoLoad"
                aspect-ratio="1"
                max-width="400"
                width="auto"
                @click="onImageClick"
                :class="noDetails? 'selectable':''"
            ></v-img>
            <v-card-title class="pt-2" v-if="!noDetails">
                <v-layout row justify-space-between align-center>
                    <v-flex class="pa-0" xs8>
                        <v-list-item-title>{{image.caption}}</v-list-item-title>
                        <v-tooltip
                            bottom
                            offset-overflow
                            nudge-right="24"
                            transition="scroll-y-transition"
                        >
                            <template v-slot:activator="{ on }">
                                <v-list-item-subtitle class="nmt-1" v-on="on">{{image.description}}</v-list-item-subtitle>
                            </template>
                            <span>{{image.description}}</span>
                        </v-tooltip>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex shrink class="pa-0">
                        <v-menu
                            offset-x
                            nudge-left="140"
                            nudge-top="10"
                            close-on-click
                            close-on-content-click
                            transition="scale-transition"
                            origin="right"
                        >
                            <template v-slot:activator="{ on }">
                                <v-btn icon small v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-layout>
                                    <v-list-item link @click="onDeleteClick">
                                        <v-list-item-title>
                                            <v-icon small>mdi-delete</v-icon>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link @click="onEditClick">
                                        <v-list-item-title>
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link @click="dialog = !dialog">
                                        <v-list-item-title>
                                            <v-icon small>mdi-fullscreen</v-icon>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-layout>
                            </v-card>
                        </v-menu>
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
            dialog: false
        };
    },
    computed: {
        windowWidth() {
            return this.$store.state.window.width;
        }
    },
    methods: {
        onPhotoLoad() {
            this.loading = false;
        },
        onImageClick() {
            if (this.noDetails && !this.noDialog) this.dialog = true;
            if (this.noDialog) this.$emit("image-clicked");
        },
        onDeleteClick() {
            if (!this.noDetails) this.$emit("delete-clicked");
        },
        onEditClick() {
            if (!this.noDetails) this.$emit("edit-clicked");
        }
    }
};
</script>
<style scoped>
* {
    transition: all 0.3s ease;
}
</style>