<template>
    <div>
        <v-card height="100vh" width="100vw">
            <v-container grid-list-md fluid fill-height>
                <v-layout column wrap justify-space-between align-center>
                    <div class="text-center pt-4">
                        <div class="display-1 font-weight-bold pt-12">LENS-N-LIGHT</div>
                        <div class="pt-2">
                            <v-label>Amit Sahoo Photography</v-label>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/images/logo-fav.png" height="100px"/>
                    </div>
                    <div class="text-center">
                        <div class="pb-12 mb-4">
                            <v-btn color="primary" @click="navigateToHome">
                                Explore
                                <v-icon right style="transform: rotate(-45deg)">mdi-arrow-bottom-right</v-icon>
                            </v-btn>
                        </div>
                        <div class="overline grey--text">&copy; Amit Sahoo | 2019</div>
                    </div>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    methods:{
        navigateToHome(){
            this.$router.push({name: 'Home'})
        }
    }
};
</script>