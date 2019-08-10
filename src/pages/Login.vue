<template>
    <div>
        <v-card tile flat height="calc(100vh - 24px)">
            <v-layout row fill-height justify-center align-center>
                <v-card outlined width="400">
                    <v-form v-model="signInForm" @submit.prevent="onSignIn">
                        <v-layout column wrap align-center class="pt-4">
                            <div class="pt-4 title">Lens-n-Light</div>
                            <div class="pa-2 caption font-weight-light">Login to admin page</div>
                        </v-layout>
                        <v-card-text class="pb-0">
                            <v-flex>
                                <v-text-field
                                    v-model="user.email"
                                    outlined
                                    label="Email"
                                    hint="Enter your email"
                                    persistent-hint
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-text-field
                                    v-model="user.password"
                                    outlined
                                    label="Password"
                                    hint="Enter your password"
                                    persistent-hint
                                    :rules="[rules.required]"
                                ></v-text-field>
                            </v-flex>
                        </v-card-text>
                        <v-card-actions class="pa-4 mx-1">
                            <v-btn
                                type="submit"
                                block
                                :loading="signingIn"
                                height="48"
                                color="primary"
                                class="px-3"
                            >Login</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import { signIn } from "../firebase";
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
            } else {
                this.$store.dispatch("showSnackBar", "Please fill form");
            }
        }
    }
};
</script>

<style>
</style>
