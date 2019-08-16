<template>
    <v-layout>
        <v-flex>
            <v-card flat tile :ripple="false">
                <v-container fluid class="pa-0" :class="'grid-list-' + gutter">
                    <v-layout wrap class="">
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
                                <v-card :ripple="false" class="mx-auto" :elevation="getElevation(flat, hover)">
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
        flat: Boolean,
        gutter: {
            type: String,
            default: 'md'
        }
    },
    methods:{
        getElevation(flat, hover){
            if(hover)
                return 5;
            if(!flat)
                return 2;
            return 0;
        }
    }
};
</script>

<style>
</style>