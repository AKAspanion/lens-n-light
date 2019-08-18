<template>
    <div class="login-container">
        <v-layout row fill-height justify-center align-center class="pa-0 px-8">
            <v-card outlined width="400px" class="pb-4">
                <v-form v-model="signInForm" @submit.prevent="onSignIn">
                    <v-layout column wrap align-center class="pt-4">
                        <div class="pt-4 title selectable" @click="navigateToHome">{{$t('lens-n-light')}}</div>
                        <div class="pa-2 caption font-weight-light">{{$t('login.toadmin')}}</div>
                    </v-layout>
                    <v-card-text class="pb-0">
                        <v-flex>
                            <v-text-field
                                v-model="user.email"
                                outlined
                                :label="$t('email')"
                                :hint="$t('email.enter')"
                                persistent-hint
                                :rules="[rules.required]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                v-model="user.password"
                                outlined
                                :label="$t('password')"
                                :hint="$t('password.enter')"
                                persistent-hint
                                :rules="[rules.required]"
                                type="password"
                            ></v-text-field>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions class="pa-4 pb-0 mx-1">
                        <v-btn
                            type="submit"
                            block
                            :loading="signingIn"
                            height="48"
                            color="primary"
                            class="px-3"
                        >
                            <span>{{$t('login')}}</span>
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import { signIn, getUser } from "../firebase";
export default {
    name: "Login",
    data() {
        return {
            signingIn: false,
            signInForm: false,
            rules: {
                required: value => !!value || "Field is Required."
            },
            user: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        onSignIn() {
            if (this.signInForm) {
                this.signingIn = true;
                signIn(this.user)
                    .then(resp => {
                        this.$store.dispatch("showSnackBar", "Login Success!");
                        this.$router.replace("/admin");
                    })
                    .catch(err => {
                        console.log(err);
                        this.$store.dispatch(
                            "showSnackBar",
                            err.message || "Error"
                        );
                    })
                    .then(() => {
                        this.signingIn = false;
                    });
            } else this.$store.dispatch("showSnackBar", "Please fill form");
        },
        navigateToHome(){
            this.$router.replace("/home");
        }
    }
};
</script>

<style scoped>
.login-container {
    height: 100vh;
}
</style>
