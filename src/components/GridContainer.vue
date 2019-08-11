<template>
    <v-container fluid grid-list-md class="ma-0 pa-0">
        <v-layout row wrap class="ma-0">
            <template v-for="(image) in images">
                <v-flex xs4 :key="image.id">
                    <v-img :src="image.src" :loading="loading" :height="300" @load="onImageLoad"></v-img>
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
    },
    data() {
        return {
            loading: true
        };
    },
    methods: {
        onImageLoad(val) {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    }
};
</script>

<style>
</style>
