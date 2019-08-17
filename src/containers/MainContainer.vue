<template>
    <div>
        <!-- <v-progress-linear indeterminate :active="topLoader"></v-progress-linear> -->
        <!-- <v-overlay :value="topLoader" :z-index="100"></v-overlay> -->
        <v-snackbar v-model="snackbar.model" bottom :timeout="6000">
            {{ snackbar.text }}
            <v-btn dark text @click="snackbar.model = false">Close</v-btn>
        </v-snackbar>
        <v-container fluid grid-list-md class="pa-0">
            <transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "MainContainer",
    data() {
        return {
            transitionName: "slide-left"
        };
    },
    methods: {
        handleResize() {
            this.$store.state.window.width = window.innerWidth;
            this.$store.state.window.height = window.innerHeight;
        }
    },
    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.$router.beforeEach((to, from, next) => {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName =
                toDepth < fromDepth ? "slide-right" : "slide-left";
            next();
        });
    },
    computed: {
        themeModel: {
            get() {
                return this.$vuetify.theme.dark;
            },
            set(val) {
                this.$vuetify.theme.dark = val;
            }
        },
        snackbar: {
            get() {
                return this.$store.getters.snackBar;
            }
        }
    }
};
</script>

<style>
body {
    overflow: hidden;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
}
</style>
