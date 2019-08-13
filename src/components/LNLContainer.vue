<template>
    <v-layout>
        <v-flex>
            <v-card flat tile :ripple="false">
                <v-item-group>
                    <v-container grid-list-md fluid class="pa-0">
                        <v-layout wrap>
                            <v-flex v-for="image in images" :key="image.id" xs6 sm4 md3 lg-2 d-flex child-flex>
                                <v-item v-slot:default="{ active, toggle }">
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card
                                            :ripple="false"
                                            class="mx-auto"
                                            :elevation="active || hover ? 5 : 2"
                                        >
                                            <l-n-l-photo :image="image" :no-details="noDetails"></l-n-l-photo>
                                        </v-card>
                                    </v-hover>
                                </v-item>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-item-group>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import LNLPhoto from "../components/LNLPhoto.vue";
export default {
    name: "LNLContainer",
    components: {
        LNLPhoto
    },
    props: {
        images: {
            type: Array,
            default: []
        },
        noDetails: Boolean
    }
};
</script>

<style>
</style>