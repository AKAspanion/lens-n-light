<template>
    <v-card tile flat>
        <v-dialog persistent v-model="categoryDialog" max-width="450">
            <v-form v-model="categoryForm">
                <v-card>
                    <v-card-title class="pa-4">Add a category</v-card-title>
                    <v-card-text class="pa-4">
                        <v-layout column>
                            <v-text-field
                                v-model="category.title"
                                outlined
                                label="Title"
                                :rules="[rules.required]"
                                hint="Title for the category."
                                persistent-hint
                            ></v-text-field>
                            <v-textarea
                                v-model="category.description"
                                outlined
                                auto-grow
                                no-resize
                                label="Description"
                                :rules="[rules.required]"
                                hint="Description for the category."
                                persistent-hint
                            ></v-textarea>
                            <v-text-field
                                v-model="category.icon"
                                outlined
                                label="Icon"
                                hint="A material icon name for the category. <br>Refer to https://materialdesignicons.com/"
                                :append-icon="iconName"
                                persistent-hint
                            ></v-text-field>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="categoryDialog = false"
                            :disabled="addingCategory"
                        >Cancel</v-btn>
                        <v-btn
                            color="primary"
                            text
                            :loading="addingCategory"
                            @click="addNewCategory()"
                            :disabled="!categoryForm"
                        >Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <v-toolbar flat color="primary" dark>
            <v-card-title class="pa-0">Lens-n-Light</v-card-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="px-4">
                <v-label dark>{{userName}}</v-label>
            </v-toolbar-title>
            <v-btn light @click="logout">Sign out</v-btn>
            <template #extension>
                <v-list-item-title>Manage Photos</v-list-item-title>
            </template>
        </v-toolbar>
        <v-container class="pa-0" fluid>
            <v-layout row wrap class="ma-0">
                <v-flex md2 xs12 class="pa-0">
                    <v-toolbar height="56" flat>
                        <v-toolbar-title>
                            <v-label>Category</v-label>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list class="pa-0">
                        <template v-if="categoryLoading">
                            <v-list-item v-for=" i in 4" :key="i">
                                <v-list-item-icon>
                                    <div class="icon-shimmer animate"></div>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <div class="comment-shimmer animate"></div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item-group v-model="categoryIndex" mandatory color="primary">
                            <v-list-item
                                v-for="(item, i) in categories"
                                :key="i"
                                :disabled="photosLoading"
                            >
                                <template v-slot:default="{ active }">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon v-if="active">mdi-chevron-right</v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                        </v-list-item-group>
                        <v-list-item
                            @click="categoryDialog = !categoryDialog"
                            :disabled="photosLoading || event === 'upload'"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Add</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-flex>
                <v-flex md10 xs12 class="pa-0">
                    <v-toolbar flat height="56">
                        <template v-if="event === 'upload'">
                            <v-btn icon small @click="event = 'photos'">
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                            <v-toolbar-title class="px-2">
                                <v-label>Upload in {{selectedCategory.title}}</v-label>
                            </v-toolbar-title>
                        </template>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" depressed @click="goToUpload">
                            <v-icon left>mdi-upload</v-icon>Upload
                        </v-btn>
                    </v-toolbar>
                    <v-card flat tile min-height="calc(100vh - 170px)" class="pa-2 pt-0 nmt-1">
                        <template v-if="event === 'photos'">
                            <template v-if="photosLoading || categoryLoading">
                                <div class="loader-container full-loader">
                                    <l-n-l-loader :loading="photosLoading || categoryLoading"></l-n-l-loader>
                                </div>
                            </template>
                            <template v-else>
                                <!-- <grid-container :images="photos"></grid-container> -->
                                <l-n-l-container :images="photos"></l-n-l-container>
                            </template>
                        </template>
                        <template v-else-if="event === 'upload'">
                            <div class="pa-2">
                                <photo-uploader @upload="getUploadData" @error="handleError"></photo-uploader>
                            </div>
                        </template>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
import { signOut } from "../firebase";
import LNLLoader from "../components/LNLLoader.vue";
import GridContainer from "../components/GridContainer.vue";
import LNLContainer from "../components/LNLContainer.vue";
import PhotoUploader from "../components/PhotoUploader.vue";
import {
    addPhoto,
    addCategory,
    fetchAllCategory,
    fetchPhotosByCategory
} from "../firebase";
export default {
    name: "Admin",
    components: {
        LNLContainer,
        PhotoUploader,
        LNLLoader
    },
    data() {
        return {
            event: "photos",
            drawer: true,
            categoryDialog: false,
            addingCategory: false,
            categoryLoading: true,
            categoryIndex: 0,
            selectedCategory: null,
            panel: [0],
            categoryForm: false,
            category: {
                title: "",
                icon: "",
                description: ""
            },
            categories: [],
            rules: {
                required: value => !!value || "Field is Required."
            },
            photosLoading: false,
            photos: []
        };
    },
    watch: {
        categoryIndex: {
            handler(val) {
                this.selectedCategory = this.categories[val];
                this.onCategorySelect();
            }
        }
    },
    computed: {
        userName() {
            return "Ankit Kumar";
        },
        iconName() {
            return "mdi-" + this.category.icon;
        }
    },
    methods: {
        onCategorySelect() {
            this.getPhotosByCategory();
        },
        goToUpload() {
            this.event = "upload";
        },
        goToPhotos() {
            this.event = "photos";
        },
        getUploadData(uploadData) {
            addPhoto({
                categoryId: this.selectedCategory.id,
                ...uploadData
            }).then(() => {
                this.$store.dispatch(
                    "showSnackBar",
                    "Photo uploaded successfully!"
                );
            });
        },
        handleError(err) {
            this.$store.dispatch("showSnackBar", err.message);
        },
        getPhotosByCategory() {
            this.photosLoading = true;
            fetchPhotosByCategory(this.selectedCategory)
                .then(snapshot => {
                    return this.parseAllPhotosByCategory(snapshot);
                })
                .then(photos => {
                    this.photos = photos;
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Getting photos. Please try later!"
                    );
                })
                .then(() => {
                    this.photosLoading = false;
                });
        },
        parseAllPhotosByCategory(snapshot) {
            return new Promise((resolve, reject) => {
                let photos = [];
                snapshot.forEach(doc => {
                    photos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                resolve(photos);
            });
        },
        addNewCategory() {
            this.addingCategory = true;
            let { title, description, icon } = this.category;
            addCategory({
                title,
                description,
                icon: icon === "" ? "mdi-image" : this.iconName
            })
                .then(res => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Category added successfully!"
                    );
                    this.getAllCatgories();
                    this.categoryDialog = false;
                    this.addingCategory = false;
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Adding category. Please try later!"
                    );
                });
        },
        getAllCatgories() {
            this.categoryLoading = true;
            fetchAllCategory()
                .then(snapshot => {
                    return this.parseAllCategories(snapshot);
                })
                .then(categories => {
                    this.categories = categories;
                    this.selectedCategory = categories[0];
                    this.onCategorySelect();
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Getting all categoriess. Please try later!"
                    );
                })
                .then(() => {
                    this.categoryLoading = false;
                });
        },
        parseAllCategories(snapshot) {
            return new Promise((resolve, reject) => {
                let categories = [];
                snapshot.forEach(doc => {
                    categories.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                resolve(categories);
            });
        },
        logout() {
            signOut()
                .then(() => {
                    this.$store.dispatch("showSnackBar", "Signout Succes!");
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Signing out. Please try later!"
                    );
                });
        }
    },
    mounted() {
        this.getAllCatgories();
    }
};
</script>
<style scoped>
.border-left {
    border-left: 1px solid rgba(0, 0, 0, 0.21);
}
</style>