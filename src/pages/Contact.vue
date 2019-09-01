<template>
    <div>
        <v-card flat tile min-height="100vh" class="pt-2">
            <v-toolbar flat height="64" class="px-3">
                <v-btn icon @click="goBack">
                    <v-icon style="transform: rotate(135deg)">mdi-arrow-bottom-right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-chip outlined>{{$t('contact')}}</v-chip>
                <v-spacer></v-spacer>
                <div style="width: 48px; height: 48px;">
                    <v-menu left transition="scale-transition" origin="top right" z-index="9999">
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-link-variant</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-layout>
                                <template v-for="(link, index) in socialLinks">
                                    <v-list-item
                                        :key="index"
                                        link
                                        :href="link.href"
                                        target="_blank"
                                    >
                                        <v-list-item-title>
                                            <v-icon :color="link.color">{{link.iconName}}</v-icon>
                                        </v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-layout>
                            <v-layout column>                                
                                <template v-for="(link, index) in otherLinks">
                                    <v-list-item
                                        :key="link.name + index"
                                        link
                                        :href="link.href"
                                        target="_blank"
                                    >
                                        <v-list-item-avatar tile>
                                            <template v-if="link.iconName === 'flickr'">
                                                <img
                                                    src="../assets/images/flickr.svg"
                                                    style="width: 24px; height: 24px;"
                                                />
                                            </template>
                                            <template v-if="link.iconName === 'getty'">
                                                <img
                                                    src="../assets/images/getty.svg"
                                                    style="width: 24px; height: 24px; padding: 2px;"
                                                />
                                            </template>
                                            <template v-if="link.iconName === '500px'">
                                                <img
                                                    src="../assets/images/500px.svg"
                                                    style="width: 24px; height: 24px; padding: 2px;"
                                                />
                                            </template>
                                            <template v-if="link.iconName === 'gurushots'">
                                                <img
                                                    src="../assets/images/gurushots.svg"
                                                    style="width: 24px; height: 24px; padding: 2px;"
                                                />
                                            </template>
                                            <template v-if="link.iconName === 'eyeem'">
                                                <img
                                                    src="../assets/images/eyeem.svg"
                                                    style="width: 36px; height: 36px;"
                                                />
                                            </template>
                                        </v-list-item-avatar >
                                        <v-list-item-subtitle>{{$t(link.name)}}</v-list-item-subtitle>
                                    </v-list-item>
                                </template>
                                </v-layout>
                        </v-card>
                    </v-menu>
                </div>
            </v-toolbar>
            <v-card flat tile height="calc(100vh - 68px)">
                <v-layout column fill-height justify-center align-center>
                    <v-card-text
                        class="mt-n12 px-10"
                        style="text-align: justify; max-width: 400px; margin: 0 auto;"
                    >
                        <v-form v-model="contactForm" ref="formContact">
                            <v-text-field
                                :label="$t('name')"
                                outlined
                                clearable
                                v-model="message.name"
                                :rules="[rules.required]"
                                :hint="$t('name.full')"
                                persistent-hint
                            ></v-text-field>
                            <v-text-field
                                :label="$t('email')"
                                outlined
                                clearable
                                v-model="message.email"
                                :rules="[rules.required, rules.emailRules]"
                                :hint="$t('email.address')"
                                persistent-hint
                            ></v-text-field>
                            <v-textarea
                                :label="$t('message')"
                                outlined
                                auto-grow
                                no-resize
                                clearable
                                rows="4"
                                counter="200"
                                v-model="message.message"
                                :rules="[rules.required]"
                                :hint="$t('message.full')"
                                persistent-hint
                            ></v-textarea>
                            <div class="pt-3">
                                <v-btn
                                    block
                                    :disabled="!contactForm"
                                    :loading="addingMessage"
                                    color="primary"
                                    @click="onAddMessage"
                                >{{$t('message.send')}}</v-btn>
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
                required: value => !!value || this.$t("field.required"),
                emailRules: value =>
                    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ||
                    this.$t("field.email")
            },
            message: {}
        };
    },
    computed: {
        socialLinks() {
            return this.$store.state.socialLinks;
        },
        otherLinks() {
            return this.$store.state.otherLinks;
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