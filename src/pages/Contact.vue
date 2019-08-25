<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-2">
            <v-toolbar flat height="64" class="px-3">
                <v-btn icon @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text
                class="px-10 pb-6 pt-3"
                style="text-align: justify; max-width: 600px; margin: 0 auto;"
            >Contact</v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    methods:{
        goBack(){
            this.$router.push({ path: "/home" });
        }
    }
};
</script>