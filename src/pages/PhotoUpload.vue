<template>
    <file-uploader @upload="getData" @error="handleError"></file-uploader>
</template>

<script>
import FileUploader from "../components/FileUploader.vue";
import { addPhoto } from "../firebase";
export default {
    components: {
        FileUploader
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
