<template>
    <file-uploader @upload="getData" @error="handleError"></file-uploader>
</template>

<script>
import FileUploader from "../components/FileUploader.vue";
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
            console.log(uploadData)
            this.$store.dispatch('showSnackBar', 'Photo uploaded successfully!');
        },
        handleError(err) {
            this.$store.dispatch('showSnackBar', err.message);
        }
    }
};
</script>

<style>
</style>
