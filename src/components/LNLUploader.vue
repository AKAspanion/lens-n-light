<template>
    <div>
        <v-card flat tile>
            <v-card-text class="pa-0">
                <v-form v-model="uploadForm">
                    <v-layout row wrap>
                        <v-flex xs12 md6>
                            <v-file-input
                                outlined
                                v-model="file.image"
                                label="File"
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
                        <v-flex xs12 md6>
                            <v-text-field
                                outlined
                                v-model="file.caption"
                                label="Caption"
                                :rules="[rules.required]"
                                persistent-hint
                                clearable
                                prepend-icon="mdi-format-title"
                                hint="Write a caption for the photo."
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                outlined
                                v-model="file.description"
                                label="Description"
                                :rules="[rules.required]"
                                :rows="2"
                                persistent-hint
                                clearable
                                auto-grow
                                prepend-icon="mdi-file-document-box-outline"
                                hint="Write a description about the photo."
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-form>
                <template v-if="loading">
                    <div class="img-loader-container">
                        <v-progress-circular
                            indeterminate
                            :size="80"
                            :active="loading"
                            :width="8"
                            color="primary"
                        ></v-progress-circular>
                    </div>
                </template>
                <div class="pt-4">
                    <v-img
                        v-show="!loading"
                        :src="file.imageUrl || ''"
                        placeholder="hey"
                        max-height="500"
                        :contain="true"
                        @load="onImageLoad"
                    ></v-img>
                </div>
            </v-card-text>
            <v-card-actions class="pa-0 pt-2">
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="!uploadForm"
                    color="primary"
                    @click="uploadPhoto"
                    :loading="uploading"
                >Upload</v-btn>
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
            uploadForm: false,
            image: null,
            loading: false,
            uploading: false,
            file: {
                imageUrl: "",
                caption: "",
                description: ""
            },
            rules: {
                required: value => !!value || "Field is Required."
            }
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
                    this.file.imageUrl = fileReader.result;
                });
                fileReader.readAsDataURL(file);
                this.image = file;
            } else {
                this.image = null;
                this.file.imageUrl = null;
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
                uploadFile(this.image)
                    .then(data => {
                        return getURL(data.metadata.fullPath.toString());
                    })
                    .then(src => {
                        this.$emit("upload", {
                            src,
                            caption: this.file.caption,
                            description: this.file.description
                        });
                    })
                    .catch(err => {
                        this.$emit("error", err);
                    })
                    .then(() => {
                        this.uploading = false;
                    });
            }
        }
    }
};
</script>

<style scoped>
.img-loader-container {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
