<template>
    <v-container fluid grid-list-md class="ma-0 pa-0">
        <v-layout row wrap class="ma-0">
            <template v-for="(image) in images">
                <v-flex xs4 :key="image.id">
                    <l-n-l-photo :image="image"></l-n-l-photo>
                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>

<script>

import LNLPhoto from "../components/LNLPhoto.vue";
export default {
    name: "GridContainer",
    components: {
        LNLPhoto
    },
    props: {
        images: {
            type: Array,
            default: []
        }
    }
};
</script>

<style>
</style>
