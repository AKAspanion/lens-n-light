<template>
    <div>
        <v-file-input
            outlined
            v-model="imageUrl"
            label="Upload"
            prepend-icon="mdi-file-image-outline"
            placeholder="Select photos for upload"
            accept="image/*"
        ></v-file-input>
        <v-img :src="imageUrl"></v-img>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imageUrl: null
        }
    },
    watch: {
        imageUrl(val){
            console.log(val)
        }
    }
};
</script>

<style>
</style>
