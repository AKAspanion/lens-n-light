<template>
    <v-layout>
        <v-flex>
            <v-card flat tile :ripple="false">
                <v-container fluid class="pa-0" :class="'grid-list-' + gutter">
                    <v-layout wrap>
                        <template v-if="!images.length">
                            <div class="loader-container full-loader" style="width: 100%">
                                <div>No image available</div>
                            </div>
                        </template>
                        <template v-else>
                            <v-flex
                                v-for="image in images"
                                :key="image.id"
                                xs6
                                sm4
                                md3
                                d-flex
                                child-flex
                                :class="!noDetails ? 'lg2':''"
                            >
                                <v-hover v-slot:default="{ hover }">
                                    <v-card
                                        :ripple="false"
                                        class="mx-auto"
                                        :elevation="getElevation(flat, hover)"
                                    >
                                        <v-expand-transition>
                                            <div v-if="hover && noDetails" class="lnl-photo-hover">
                                                <div class="lnl-photo-hover-item">
                                                    <div
                                                        class="overline lnl-photo-hover-text"
                                                        >{{image.caption}}</div>
                                                </div>
                                            </div>
                                        </v-expand-transition>
                                        <l-n-l-photo
                                            :image="image"
                                            :no-details="noDetails"
                                            :no-dialog="noDialog"
                                            @image-clicked="onImageClick(image)"
                                            @delete-clicked="onDeleteClick(image)"
                                            @edit-clicked="onEditClick(image)"
                                        ></l-n-l-photo>
                                    </v-card>
                                </v-hover>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import LNLPhoto from "../components/LNLPhoto.vue";
export default {
    name: "LNLGrid",
    components: {
        LNLPhoto
    },
    props: {
        images: {
            type: Array,
            default: []
        },
        noDetails: Boolean,
        noDialog: Boolean,
        flat: Boolean,
        gutter: {
            type: String,
            default: "md"
        }
    },
    methods: {
        getElevation(flat, hover) {
            if (hover) return 5;
            if (!flat) return 2;
            return 0;
        },
        onImageClick(image) {
            if (this.noDialog) this.$emit("grid-image-clicked", image);
        },
        onEditClick(image) {
            if (!this.noDetails) this.$emit("grid-image-edit-clicked", image);
        },
        onDeleteClick(image) {
            if (!this.noDetails) this.$emit("grid-image-delete-clicked", image);
        }
    }
};
</script>

<style>
.lnl-photo-hover {
    cursor: default;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    height: 50px;
    width: 100%;
    text-align: center;
    z-index: 100;
    height: 50px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.25);
}
.lnl-photo-hover-item {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 150px;
    height: 50px;
    margin: 0 auto;
}
.lnl-photo-hover-text {
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>