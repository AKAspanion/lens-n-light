<template>
    <v-menu
        top
        left
        nudge-top="48"
        transition="scale-transition"
        origin="bottom right"
        z-index="9999"
        min-width="346"
        :close-on-content-click="false"
        v-model="menuSearch"
        style="position: fixed;"
    >
        <template v-slot:activator="{ on }">
            <v-btn fab fixed small bottom right v-on="on" class="mr-2 mb-2 elevation-3">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>
        <v-list height="300">
            <v-list-item>
                <v-list-item-content class="pa-0 px-1 py-2">
                    <v-text-field solo height placeholder="Search"></v-text-field>
                </v-list-item-content>
            </v-list-item>
            <div class="mt-n5">
                <v-list-item link>
                    <v-list-item-content class="pa-0 px-1">s1</v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-content class="pa-0 px-1">s1</v-list-item-content>
                </v-list-item>
            </div>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            menuSearch: false
        };
    }
};
</script>

<style>
</style>