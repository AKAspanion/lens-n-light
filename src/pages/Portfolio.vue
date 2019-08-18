<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-3">
            <v-toolbar flat height="64" class="px-4">
                <v-btn icon small @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
            </v-toolbar>
            <v-layout column align-center class="ma-0 pa-0 pb-4">
                <v-avatar size="250">
                    <img class="pa-1" src="../assets/images/profile.jpg" />
                </v-avatar>
                <v-card-title>Amit Sahoo</v-card-title>
                <div class="overline primary--text">
                    Freelance Photographer.
                    <br />Owner of Lens and Light.
                </div>
            </v-layout>
            <div class="px-10 pb-3 text-center">
                    <v-chip outlined link class=" mr-3">Facebook</v-chip>                    
                    <v-chip outlined link class=" mr-3">Instagram</v-chip>
            </div>
            <v-divider></v-divider>
            <v-card-text class="px-10 pb-6 pt-3" style="text-align: justify;">
                I used to love clicking, from my childhood, holding my camera was great fun.
                I used to have a small Digi cam in my hands, without being worried about the number of
                photos can be taken and camera rolls to be put, I started my saga of clicking.
                Initially, it was great fun capturing moments, people, beautiful scenery and everything around.
                Slowly perspective seeped in, I started taking photos with a feeling and sense.
                Now I wanted my photos to tell a story.
                That's how my interest, my passion, my hobby became my new found everlasting love.
                Photography became a way for me to express my feelings, my thoughts, my emotions.
                Finally, I found something that I could call my own.
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push({ path: "/home" });
        }
    }
};
</script>

<style>
</style>