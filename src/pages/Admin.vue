<template>
    <div>
        This is Admin
        <v-btn @click="logout">Sign out</v-btn>
        <router-view></router-view>
    </div>
</template>
<script>
import { signOut } from "../firebase";
export default {
    name: 'Admin',
    methods: {
        logout() {
            signOut().then(() => {
                this.$store.dispatch("showSnackBar", "Logout");
            });
        }
    }
}
</script>