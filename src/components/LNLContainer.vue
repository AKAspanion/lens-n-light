<template>
    <v-layout>
        <v-flex>
            <v-card flat tile :ripple="false">
                <v-container grid-list-md fluid class="pa-0">
                    <v-layout wrap>
                        <v-flex
                            v-for="image in images"
                            :key="image.id"
                            xs6
                            sm4
                            md3
                            lg2
                            d-flex
                            child-flex
                        >
                            <v-hover v-slot:default="{ hover }">
                                <v-card :ripple="false" class="mx-auto" :elevation="hover ? 5 : 2">
                                    <l-n-l-photo :image="image" :no-details="noDetails"></l-n-l-photo>
                                </v-card>
                            </v-hover>
                        </v-flex>
                    </v-layout>
                </v-container>
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