<template>
    <div class="login-container">
        <v-layout row fill-height justify-center align-center class="pa-0 pr-3 pl-4">
            <v-card outlined width="400" class="pb-4">
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
                                :disabled="isSignedIn"
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
                                type="password"
                                :disabled="isSignedIn"
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
                            <span v-if="!isSignedIn">Login</span>
                            <v-icon v-else>mdi-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <v-card-actions v-show="isSignedIn" class="pa-0 pt-4">
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                depressed
                                type="submit"
                                height="36"
                                color="primary"
                            >Go to admin page</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-expand-transition>
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
    computed: {
        isSignedIn() {
            let user = getUser();
            return user !== null && user !== undefined;
        }
    },
    methods: {
        onSignIn() {
            if (!this.isSignedIn) {
                if (this.signInForm) {
                    this.signingIn = true;
                    signIn(this.user)
                        .then(resp => {
                            this.$store.dispatch(
                                "showSnackBar",
                                "Login Success!"
                            );
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
            } else this.$router.replace("/admin");
        }
    }
};
</script>

<style scoped>
.login-container {
    height: calc(100vh - 24px);
}
</style>
