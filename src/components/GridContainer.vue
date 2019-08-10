<template>
    <v-container fluid grid-list-md class="ma-0 pa-0">
        <v-layout row wrap class="ma-0">
            <template v-for="(image, index) in images">
                <v-flex xs4 :key="index">
                    <v-img :src="image.src" :height="300"></v-img>
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
