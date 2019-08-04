<template>
    <div id="app">
        <v-app id="ankit" :dark="themeModel">
            <v-progress-linear indeterminate :active="topLoader"></v-progress-linear>
            <v-container fluid grid-list-md>
                <v-layout align-center>
                    <v-flex>Theme</v-flex>
                    <v-spacer></v-spacer>
                    <v-flex shrink>
                        <v-switch v-model="themeModel" label="Dark Theme"></v-switch>
                    </v-flex>
                </v-layout>
                <router-view :key="Math.random(1,100)"></router-view>
            </v-container>
        </v-app>
    </div>
</template>

<script>
export default {
    name: "app",
    components: {},
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
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.test {
    background: red;
}
</style>
