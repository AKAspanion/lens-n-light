<template>
    <div>
        This is home page
        <v-btn @click="fetch"></v-btn>
    </div>
</template>

<script>
import { fetchPhotosByCategory } from "../firebase";
export default {
    name: "HomePage",
    data() {
        return {};
    },
    methods: {
        fetch() {
            fetchPhotosByCategory({ id: "1" }).then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
        }
    }
};
</script>

<style>
</style>
