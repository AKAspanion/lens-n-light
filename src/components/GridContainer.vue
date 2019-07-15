<template>
    <v-container fluid grid-list-xl class="ma-0 pa-3">
        <v-layout row wrap class="ma-0">
            <template v-for="(image, index) in images">
                <v-flex md4 sm6 xs12 :key="index">
                    <v-img :src="image.src" :min-height="image.height"></v-img>
                </v-flex> 
            </template>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: "GridContainer",   
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
