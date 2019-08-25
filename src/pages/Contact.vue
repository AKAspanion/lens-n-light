<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-2">
            <v-toolbar flat height="64" class="px-3">
                <v-btn icon @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-menu left transition="scale-transition" origin="right" z-index="9999">
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-link-variant</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-layout>
                            <template v-for="(link, index) in socialLinks">
                                <v-list-item :key="index" link :href="link.href" target="_blank">
                                    <v-list-item-title>
                                        <v-icon :color="link.color">{{link.iconName}}</v-icon>
                                    </v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-layout>
                    </v-card>
                </v-menu>
            </v-toolbar>
            <v-card flat tile height="calc(100vh - 68px)">
                <v-layout column fill-height justify-center align-center>
                    <v-card-text
                        class="mt-n12 px-8"
                        style="text-align: justify; max-width: 400px; margin: 0 auto;"
                    >
                        <v-form v-model="contactForm" ref="formContact">
                            <v-text-field
                                label="Name"
                                outlined
                                clearable
                                v-model="message.name"
                                :rules="[rules.required]"
                                hint="Your full name."
                                persistent-hint
                            ></v-text-field>
                            <v-text-field
                                label="Email"
                                outlined
                                clearable
                                v-model="message.email"
                                :rules="[rules.required, rules.emailRules]"
                                hint="Your email address."
                                persistent-hint
                            ></v-text-field>
                            <v-textarea
                                label="Message"
                                outlined
                                auto-grow
                                no-resize
                                clearable
                                rows="4"
                                counter="200"
                                v-model="message.message"
                                :rules="[rules.required]"
                                hint="Your message for me."
                                persistent-hint
                            ></v-textarea>
                            <div class="pt-3">
                                <v-btn
                                    block
                                    :disabled="!contactForm"
                                    :loading="addingMessage"
                                    color="primary"
                                    @click="onAddMessage"
                                >Send message</v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-layout>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import { addMessage, fetchMessageByEmail } from "../firebase";
import { Promise } from "q";
export default {
    data() {
        return {
            contactForm: false,
            addingMessage: false,
            rules: {
                required: value => !!value || "Field is Required.",
                emailRules: value =>
                    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ||
                    "Invalid Email address"
            },
            message: {}
        };
    },
    computed: {        
        socialLinks(){
            return this.$store.state.socialLinks;
        }
    },
    methods: {
        goBack() {
            this.$router.push({ path: "/home" });
        },
        clearMessageForm() {
            this.$nextTick(() => this.$refs.formContact.reset());
        },
        onAddMessage() {
            this.addMessage();
        },
        addMessage() {
            this.addingMessage = true;
            this.checkMessageByEmail()
                .then(() => {
                    let { name, email, message } = this.message;
                    addMessage({
                        name: name.trim(),
                        email: email.trim(),
                        message: message.trim()
                    }).then(() => {
                        this.$store.dispatch(
                            "showSnackBar",
                            "Message submitted succesfully!"
                        );
                    });
                })
                .catch(err => {
                    this.$store.dispatch(
                        "showSnackBar",
                        err.heard ||
                            "Error submitting message! please try again later"
                    );
                })
                .then(() => {
                    this.addingMessage = false;
                    this.clearMessageForm();
                });
        },
        checkMessageByEmail() {
            return new Promise((resolve, reject) => {
                fetchMessageByEmail(this.message.email.trim())
                    .then(snapshot => {
                        return this.parseAllMessages(snapshot);
                    })
                    .then(messages => {
                        if (messages.length)
                            reject({
                                heard:
                                    "We heard you! We will contact you soon. :)"
                            });
                        else resolve("No email found, good to go!");
                    })
                    .catch(() => {
                        reject("Error occured! please try again later!");
                    });
            });
        },
        parseAllMessages(snapshot) {
            return new Promise(resolve => {
                let messages = [];
                snapshot.forEach(doc => {
                    messages.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                resolve(messages);
            });
        }
    }
};
</script>