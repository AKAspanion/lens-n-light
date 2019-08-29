<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-2">
            <v-toolbar flat height="64" class="px-3">
                <v-btn icon @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="routeToContact">
                    <v-icon>mdi-message-text</v-icon>
                </v-btn>
            </v-toolbar>
            <v-layout column align-center class="ma-0 pa-0 pb-4">
                <v-avatar :size="windowWidth > 600 ? '250':'150'">
                    <img class="pa-1" src="../assets/images/profile.jpg" />
                </v-avatar>
                <v-card-title>{{$t('sahoo')}}</v-card-title>
                <div class="overline primary--text text-center">
                    <span>{{$t('sahoo.freelance')}}</span>
                    <br />
                    <span>{{$t('sahoo.owner')}}</span>
                </div>
            </v-layout>
            <div class="px-10 pb-3 text-center">
                <template v-for="(link, index) in socialLinks">
                    <v-chip
                        :key="index"
                        outlined
                        ripple
                        class="mr-3"
                        :href="link.href"
                        target="_blank"
                    >
                        <v-icon small>{{link.iconName}}</v-icon>
                    </v-chip>
                </template>
            </div>
            <v-card-text
                class="px-10 pb-6 pt-3"
                style="text-align: justify; max-width: 600px; margin: 0 auto;"
            >
                <v-expansion-panels popout>
                    <v-expansion-panel v-for="(item,i) in panelItems" :key="i">
                        <v-expansion-panel-header>{{$t(item.header)}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="grey--text">{{$t(item.content)}}</div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            panelItems: [
                {
                    header: "sahoo.bio.label",
                    content: "sahoo.desc"
                },
                {
                    header: "sahoo.education.label",
                    content: "sahoo.education"
                },
                {
                    header: "sahoo.experience.label",
                    content: "sahoo.experience"
                }
            ]
        };
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/home" });
        },
        routeToContact() {
            this.$router.push({ name: "Contact" });
        }
    },
    computed: {
        windowWidth() {
            return this.$store.state.window.width;
        },
        socialLinks() {
            return this.$store.state.socialLinks;
        }
    }
};
</script>

<style>
</style>