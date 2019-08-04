<template>
    <photo-uploader></photo-uploader>
</template>

<script>
import PhotoUploader from '../components/PhotoUploader.vue'
export default {
    components: {
        PhotoUploader
    },
    data() {
        return {
            model: false
        };
    },
    computed: {
        themeModel: {
            get() {
                return this.$store.getters.loadTheme;
            },
            set(val) {
                this.$store.dispatch("toggleTheme", val);
            }
        }
    }
};
</script>

<style>
</style>
