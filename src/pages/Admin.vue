<template>
    <v-card tile>
        <v-toolbar extended flat color="primary" dark>
            <v-toolbar-title>Manage Photos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="px-4">
                <v-label dark>{{userName}}</v-label>
            </v-toolbar-title>
            <v-btn light @click="logout">Sign out</v-btn>
        </v-toolbar>
        <v-container class="pa-0 pb-3" fluid>
            <v-layout row wrap class="ma-0">
                <v-flex md2 xs12 class="pa-0">
                    <v-toolbar height="56" flat>
                        <v-toolbar-title class="lnl-header">Category</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn icon small color="primary" v-on="on">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Add Category</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-list class="pa-0">
                        <v-list-item-group v-model="model" mandatory color="primary">
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <template v-slot:default="{ active }">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon v-if="active">mdi-chevron-right</v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-flex>
                <v-flex md10 xs12 class="pa-0">
                    <v-toolbar height="56" flat>
                        <v-toolbar-title class="lnl-header">Photos</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn icon small color="primary" v-on="on">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Add photo</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-container class="pa-0 px-2" style="margin-top: -4px;">
                        <grid-container :images="images"></grid-container>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
import { signOut } from "../firebase";
import GridContainer from "../components/GridContainer.vue";
export default {
    name: "Admin",
    components: {
        GridContainer
    },
    data() {
        return {
            drawer: true,
            model: 0,
            items: [
                { title: "Nature", icon: "mdi-nature" },
                { title: "Portrait", icon: "mdi-account" },
                { title: "Abstract", icon: "mdi-image" }
            ],
            images: [
                {
                    src:
                        "https://amp.businessinsider.com/images/526ebac569bedd56578b457b-750-562.jpg",
                    height: "200px"
                },
                {
                    src:
                        "https://amp.businessinsider.com/images/526ebac569bedd56578b457b-750-562.jpg",
                    height: "100px"
                },
                {
                    src:
                        "https://amp.businessinsider.com/images/526ebac569bedd56578b457b-750-562.jpg",
                    height: "600px"
                },
                {
                    src:
                        "https://amp.businessinsider.com/images/526ebac569bedd56578b457b-750-562.jpg",
                    height: "200px"
                },
                {
                    src:
                        "https://amp.businessinsider.com/images/526ebac569bedd56578b457b-750-562.jpg",
                    height: "400px"
                }
            ]
        };
    },
    computed: {
        userName() {
            return "Ankit Kumar";
        }
    },
    methods: {
        logout() {
            signOut()
                .then(() => {
                    this.$store.dispatch("showSnackBar", "Signout Succes!");
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Signing out. Please try later!"
                    );
                });
        }
    }
};
</script>
<style scoped>
.border {
    border-left: 5px solid #1976d2;
}
.lnl-header{
    color: rgba(0,0,0,0.54) !important;
    font-size: 16px !important;
}
</style>