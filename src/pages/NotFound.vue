<template>
    <div>
        <v-card flat tile height="calc(100vh)" color="#e5e5e5">
            <div class="container-404">
                <v-layout column align-center class="pt-4">
                    <div class="display-1 font-weight-medium pb-2">Caught you sneaking around!</div>
                    <div class="body-1 pb-2">Quickly, run away before the internet police comes.</div>
                    <v-btn text color="primary" @click="goHome">Run to home</v-btn>
                </v-layout>
            </div>
            <div class="cam-flash" :class="flash ? 'flash':''"></div>
            <v-container fluid class="pa-0 ma-0">
                <v-layout column>
                    <v-flex xs12>
                        <v-card flat tile height="calc(90vh)" color="#e5e5e5">
                            <v-layout align-center justify-center row fill-height>
                                <div class="letter-4 white--text">4</div>
                                <div class="camera">
                                    <div class="circle one"></div>
                                    <div class="circle two"></div>
                                    <div class="circle three"></div>
                                    <div class="circle four"></div>
                                    <div
                                        class="circle"
                                        :class="expand ? 'camera-five-click':'five'"
                                    ></div>
                                    <div class="circle six"></div>
                                    <div
                                        class="circle"
                                        :class="expand ? 'camera-seven-click':'seven'"
                                    ></div>
                                    <div class="circle eight"></div>
                                    <div class="circle nine"></div>
                                </div>
                                <div class="letter-4 white--text">4</div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
    data() {
        return {
            expand: true,
            flash: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.expand = false;
            this.flash = true;
        }, 600);
        setTimeout(() => {
            this.flash = false;
        }, 700);
        setTimeout(() => {
            this.expand = true;
        }, 1000);
    },
    methods: {
        goHome() {
            this.$router.replace({ path: "/" });
        }
    }
};
</script>
<style scoped>
.container-404 {
    height: 200px;
    width: 500px;
    position: absolute;
    left: 50%;
    margin-left: -240px;
    top: 50%;
    margin-top: 70px;
    z-index: 100;
    z-index: 50;
}
.letter-4 {
    font-size: 200px;
    color: white;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
        0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
        0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
        0 20px 20px rgba(0, 0, 0, 0.15);
}
.cam-flash {
    background: #fff;
    height: 2000px;
    width: 2000px;
    position: absolute;
    left: 50%;
    margin-left: -1000px;
    top: 50%;
    margin-top: -1000px;
    z-index: 100;
    border-radius: 50%;
    transform: scale(0);
}
.flash {
    -webkit-animation: mymove 0.1s infinite; /* Safari 4.0 - 8.0 */
    animation: mymove 0.1s infinite;
}
@keyframes mymove {
    to {
        transform: scale(1);
    }
}
.camera {
    width: 120px;
    height: 120px;
    margin: 0 20px;
    overflow: hidden;
    background: #fff;
    -moz-border-radius: 20%;
    -webkit-border-radius: 20%;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
        0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
        0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
        0 20px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.1s;
}
.camera .one {
    background: #afdceb;
    width: 75%;
    height: 75%;
    margin-left: -37.5%;
    margin-top: -37.5%;
    position: absolute;
    left: 50%;
    top: 50%;
    background: #fff;
    -moz-box-shadow: #eee 0px 10px 10px;
    -webkit-box-shadow: #eee 0px 10px 10px;
    box-shadow: #eee 0px 10px 10px;
}
.camera .two {
    background: #afdceb;
    width: 70%;
    height: 70%;
    margin-left: -35%;
    margin-top: -35%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .three {
    background: #86cae1;
    width: 50%;
    height: 50%;
    margin-left: -25%;
    margin-top: -25%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .four {
    background: #1a5468;
    width: 45%;
    height: 45%;
    margin-left: -22.5%;
    margin-top: -22.5%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .five {
    background: #154453;
    width: 30%;
    height: 30%;
    margin-left: -15%;
    margin-top: -15%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .six {
    background: #174a5b;
    width: 28.75%;
    height: 28.75%;
    margin-left: -14.375%;
    margin-top: -14.375%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .seven {
    background: #0b222a;
    width: 17.5%;
    height: 17.5%;
    margin-left: -8.75%;
    margin-top: -8.75%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera .eight {
    background: #5db8d7;
    width: 1.5%;
    height: 1.5%;
    margin-left: -0.75%;
    margin-top: -0.75%;
    position: absolute;
    left: 50%;
    top: 50%;
    top: 51%;
    left: 45%;
}
.camera .nine {
    background: #1f657c;
    width: 4%;
    height: 4%;
    margin-left: -2%;
    margin-top: -2%;
    position: absolute;
    left: 50%;
    top: 50%;
    top: 48%;
    left: 54%;
}
.camera .ten {
    background: #1f657c;
    width: 4%;
    height: 4%;
    margin-left: -2%;
    margin-top: -2%;
    position: absolute;
    left: 50%;
    top: 50%;
    background: #ca0000;
    top: 89%;
    left: 89%;
}
.camera .circle {
    -moz-border-radius: 400px;
    -webkit-border-radius: 400px;
    border-radius: 400px;
}
.camera-five-click {
    background: #1a5468;
    width: 35%;
    height: 35%;
    margin-left: -17.5%;
    margin-top: -17.5%;
    position: absolute;
    left: 50%;
    top: 50%;
}
.camera-seven-click {
    background: #0b222a;
    width: 25%;
    height: 25%;
    margin-left: -12.5%;
    margin-top: -12.5%;
    position: absolute;
    left: 50%;
    top: 50%;
}
</style>