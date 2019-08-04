<template>
    <div>
        <v-card flat outlined>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex>
                        <v-file-input
                            outlined
                            label="Upload"
                            :disabled="uploading"
                            persistent-hint
                            prepend-icon="mdi-file-upload-outline"
                            placeholder="Pick photo for upload"
                            hint="Pick image of any format from local storage."
                            accept="image/*"
                            :clearable="false"
                            @change="onFilePick"
                        ></v-file-input>
                    </v-flex>
                    <v-flex>
                        <v-select
                            outlined
                            :disabled="uploading"
                            label="Category"
                            persistent-hint
                            prepend-icon="mdi-file-upload-outline"
                            placeholder="Select catogry"
                            hint="Pick category in which you want to upload the image."
                        ></v-select>
                    </v-flex>
                </v-layout>
                <template v-if="loading">
                    <div class="card-shimmer animate"></div>
                </template>
                <div class="pt-4">
                    <v-img
                        v-show="!loading"
                        :src="imageUrl || ''"
                        lazy-src="hey"
                        placeholder="hey"
                        max-height="500"
                        :contain="true"
                        @load="onImageLoad"
                    ></v-img>
                </div>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="uploadPhoto" :loading="uploading">Upload</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { setTimeout } from "timers";
import { uploadFile, getURL } from "../firebase";
export default {
    data() {
        return {
            imageUrl: null,
            image: null,
            loading: false,
            uploading: false
        };
    },
    methods: {
        onFilePick(event) {
            if ((this.image ? this.image.size : "") === (event.size || {}))
                return;
            if (event) {
                this.loading = true;
                const file = event;
                const fileReader = new FileReader();
                fileReader.addEventListener("load", () => {
                    this.imageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(file);
                this.image = file;
            } else {
                this.image = null;
                this.imageUrl = null;
            }
        },
        onImageLoad(val) {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        uploadPhoto() {
            if (this.image !== null) {
                this.uploading = true;
                this.$store.commit("setTopLoader", this.uploading);
                uploadFile(this.image)
                    .then(data => {
                        console.log(data.state);
                        return getURL(data.metadata.fullPath.toString());
                    })
                    .then(url => {
                        console.log(url);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.uploading = false;
                        this.$store.dispatch("setTopLoader", this.uploading);
                    });
            }
        }
    }
};
</script>

<style>
</style>
