<template>
    <div id="app">
        <v-app id="ankit">
            <main-container></main-container>
        </v-app>
    </div>
</template>

<script>
import MainContainer from "./containers/MainContainer.vue";
export default {
    name: "app",
    components: {
        MainContainer
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
