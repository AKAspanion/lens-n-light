<template>
    <div>
        <v-progress-linear indeterminate :active="topLoader"></v-progress-linear>
        <!-- <v-overlay :value="topLoader" :z-index="100"></v-overlay> -->
        <v-snackbar v-model="snackbar.model" bottom :timeout="6000">
            {{ snackbar.text }}
            <v-btn dark text @click="snackbar.model = false">Close</v-btn>
        </v-snackbar>
        <v-container fluid grid-list-md class="pa-0">
            <v-layout align-center>
                <v-flex>Theme</v-flex>
                <v-spacer></v-spacer>
                <v-flex shrink>
                    <v-switch v-model="themeModel" label="Dark Theme"></v-switch>
                </v-flex>
            </v-layout>
            <router-view :key="Math.random(1,100)"></router-view>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "MainContainer",
    data() {
        return {};
    },
    methods: {},
    computed: {
        themeModel: {
            get() {
                return this.$vuetify.theme.dark;
            },
            set(val) {
                this.$vuetify.theme.dark = val;
            }
        },
        topLoader: {
            get() {
                return this.$store.getters.topLoader;
            }
        },
        snackbar: {
            get() {
                return this.$store.getters.snackBar;
            }
        }
    }
};
</script>

<style>
</style>
