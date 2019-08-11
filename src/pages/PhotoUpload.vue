<template>
    <photo-uploader @upload="getData" @error="handleError"></photo-uploader>
</template>

<script>
import PhotoUploader from "../components/PhotoUploader.vue";
import { addPhoto } from "../firebase";
export default {
    components: {
        PhotoUploader
    },
    data() {
        return {
            imgUrl: false
        };
    },
    methods: {
        getData(uploadData) {
            addPhoto(uploadData)
                .then(()=>{
                    this.$store.dispatch('showSnackBar', 'Photo uploaded successfully!');
                })
        },
        handleError(err) {
            this.$store.dispatch('showSnackBar', err.message);
        }
    }
};
</script>

<style>
</style>
