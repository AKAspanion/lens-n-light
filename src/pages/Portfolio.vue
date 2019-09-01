<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-2">
            <v-toolbar flat height="64" class="px-3">
                <v-btn icon @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-chip outlined>{{$t('portfolio')}}</v-chip>
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
            <div
                class="px-10 pb-3 text-center"
                style="text-align: justify; max-width: 400px; margin: 0 auto;"
            >
                <template v-for="(link, index) in socialLinks">
                    <v-chip
                        :key="index"
                        outlined
                        ripple
                        small
                        class="mr-2 mb-1"
                        :href="link.href"
                        target="_blank"
                    >
                        <v-icon small>{{link.iconName}}</v-icon>
                    </v-chip>
                </template>
                <br>
                <template v-for="(link, index) in otherLinks">
                    <v-chip
                        :key="link.name + index"
                        outlined
                        ripple
                        small
                        class="mr-2"
                        :href="link.href"
                        target="_blank"
                    >
                        <template v-if="link.iconName === 'flickr'">
                            <img
                                v-if="isDarkTheme"
                                src="../assets/images/flickr-dark.svg"
                                style="width: 16px; height: 16px;"
                            />
                            <img
                                v-else
                                src="../assets/images/flickr-light.svg"
                                style="width: 16px; height: 16px;"
                            />
                        </template>
                        <template v-if="link.iconName === 'getty'">
                            <img
                                v-if="isDarkTheme"
                                src="../assets/images/getty-dark.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                            <img
                                v-else
                                src="../assets/images/getty-light.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                        </template>
                        <template v-if="link.iconName === '500px'">
                            <img
                                v-if="isDarkTheme"
                                src="../assets/images/500px-dark.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                            <img
                                v-else
                                src="../assets/images/500px-light.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                        </template>
                        <template v-if="link.iconName === 'gurushots'">
                            <img
                                v-if="isDarkTheme"
                                src="../assets/images/gurushots-dark.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                            <img
                                v-else
                                src="../assets/images/gurushots-light.svg"
                                style="width: 16px; height: 16px; padding: 2px;"
                            />
                        </template>
                        <template v-if="link.iconName === 'eyeem'">
                            <img
                                v-if="isDarkTheme"
                                src="../assets/images/eyeem-dark.svg"
                                style="width: 24px; height: 24px;"
                            />
                            <img
                                v-else
                                src="../assets/images/eyeem-light.svg"
                                style="width: 24px; height: 24px;"
                            />
                        </template>
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
                            <template v-if="Array.isArray(item.content)">
                                <div
                                    class="pb-2 caption"
                                    v-for="(content, i) in item.content"
                                    :key="i"
                                >{{$t(content)}}</div>
                            </template>
                            <template v-else>
                                <div class="pb-2 caption">{{$t(item.content)}}</div>
                            </template>
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
                    content: [
                        "sahoo.bio.1",
                        "sahoo.bio.2",
                        "sahoo.bio.3",
                        "sahoo.bio.4"
                    ]
                },
                {
                    header: "sahoo.education.label",
                    content: "sahoo.education"
                },
                {
                    header: "sahoo.experience.label",
                    content: [
                        "sahoo.experience",
                        "sahoo.experience.1",
                        "sahoo.experience.2",
                        "sahoo.experience.3",
                        "sahoo.experience.4",
                        "sahoo.experience.5"
                    ]
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
        },
        getLink() {
            return "../assets/images/flickr.svg";
        }
    },
    computed: {
        windowWidth() {
            return this.$store.state.window.width;
        },
        socialLinks() {
            return this.$store.state.socialLinks;
        },
        otherLinks() {
            return this.$store.state.otherLinks;
        },
        isDarkTheme(){
            return this.$vuetify.theme.dark;
        }
    }
};
</script>

<style>
</style>