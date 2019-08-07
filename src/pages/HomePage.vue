<template>
    <div>
        This is home page
        <v-btn @click="fetch"></v-btn>
    </div>
</template>

<script>

import { fetchPhotosByCategory } from "../firebase";
export default {
    name: 'HomePage',
    data(){
        return {
        }
    },
    methods: {
        fetch(){
            fetchPhotosByCategory({id: '1'})
                .then(r => {
                    console.log(r);
                })
        }
    }
}
</script>

<style>

</style>
