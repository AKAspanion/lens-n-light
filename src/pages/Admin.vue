<template>
    <v-card tile flat>
        <v-dialog v-model="messagesDialog" max-width="450">
            <v-card>
                <v-card-title class="px-4">
                    All messages
                    <v-spacer></v-spacer>
                    <v-btn icon @click="messagesDialog = !messagesDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="px-4 mt-n2 pb-1">
                    <template v-if="!messages.length">
                        <v-card class="pa-2 my-3 text-center">No messages yet</v-card>
                    </template>
                    <template v-else v-for="(message, index) in messages">
                        <v-card :key="index" class="pa-2 my-3">
                            <div class="title font-weight-regular">{{message.name}}</div>
                            <div class="caption mt-n1">{{message.email}}</div>
                            <div class="body-2 py-2">{{message.message}}</div>
                        </v-card>
                    </template>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- dialog for adding/editing category -->
        <v-dialog persistent v-model="categoryDialog" max-width="450">
            <v-form v-model="categoryForm" ref="formCategory">
                <v-card>
                    <v-card-title class="pa-4">{{isCategoryAdd ? 'Add' : 'Edit'}} category</v-card-title>
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
                            @click="clearCategoryForm()"
                            :disabled="addingCategory || editingCategory"
                        >Cancel</v-btn>
                        <v-btn
                            color="primary"
                            text
                            :loading="addingCategory || editingCategory"
                            @click="onCategorySubmit()"
                            :disabled="!categoryForm"
                        >{{isCategoryAdd ? 'Add' : 'Edit'}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <!-- dialog for editing phot -->
        <v-dialog persistent v-model="photoDialog" max-width="450">
            <v-form v-model="photoForm" ref="formPhoto">
                <v-card>
                    <v-card-title class="pa-4">Edit photo</v-card-title>
                    <v-card-text class="pa-4">
                        <v-layout column>
                            <v-text-field
                                v-model="photo.caption"
                                outlined
                                label="Caption"
                                :rules="[rules.required]"
                                hint="Caption for the photo."
                                persistent-hint
                            ></v-text-field>
                            <v-text-field
                                v-model="photo.location"
                                outlined
                                label="Location"
                                :rules="[rules.required]"
                                hint="Location for the photo."
                                persistent-hint
                            ></v-text-field>
                            <v-textarea
                                v-model="photo.description"
                                outlined
                                auto-grow
                                no-resize
                                label="Description"
                                :rules="[rules.required]"
                                hint="Description for the photo."
                                persistent-hint
                            ></v-textarea>
                            <v-select
                                v-model="photo.categoryId"
                                outlined
                                :items="categories"
                                item-text="title"
                                item-value="id"
                                label="Category"
                                :rules="[rules.required]"
                                hint="Category for the photo."
                                persistent-hint
                            ></v-select>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="clearPhotoForm()"
                            :disabled="editingPhoto"
                        >Cancel</v-btn>
                        <v-btn
                            color="primary"
                            text
                            :loading="editingPhoto"
                            @click="onPhotoSubmit()"
                            :disabled="!photoForm"
                        >Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <!-- dialog for deleting category -->
        <v-dialog persistent v-model="deleteDialog" max-width="450">
            <v-card>
                <v-card-title class="pa-4">Delete photo</v-card-title>
                <v-card-text class="pa-4">Are you sure you want to delete the photo?</v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="deleteDialog = !deleteDialog; imageToDelete = null;"
                        :disabled="deletingPhoto"
                    >No</v-btn>
                    <v-btn
                        color="primary"
                        text
                        :loading="deletingPhoto"
                        @click="onDeletePhoto()"
                    >Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-toolbar flat color="primary" dark>
            <v-card-title class="pa-0 selectable" @click="navigateToHome">Lens-n-Light</v-card-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="px-4">
                <v-label dark>{{userName}}</v-label>
            </v-toolbar-title>
            <v-btn light @click="logout">Sign out</v-btn>
            <template #extension>
                <v-list-item-title>Manage Photos</v-list-item-title>
                <v-spacer></v-spacer>
                <div>
                    <v-tooltip left offset-overflow transition="scroll-x-reverse-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                small
                                v-on="on"
                                @click="messagesDialog = !messagesDialog"
                                :loading="messagesLoading"
                            >
                                <v-icon small>mdi-message-text</v-icon>
                            </v-btn>
                        </template>
                        <span>View contact messages.</span>
                    </v-tooltip>
                </div>
            </template>
        </v-toolbar>
        <v-container class="pa-0" fluid>
            <v-layout row wrap class="ma-0">
                <v-flex md3 xs12 class="pa-0">
                    <v-toolbar height="56" flat>
                        <v-toolbar-title>
                            <v-label>Category</v-label>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-list class="pa-0">
                        <template v-if="categoryLoading">
                            <v-list-item v-for=" i in totalCategories" :key="i">
                                <v-list-item-icon>
                                    <div class="icon-shimmer animate"></div>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <div class="comment-shimmer animate"></div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-else>
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
                                            <v-tooltip
                                                right
                                                nudge-left="12"
                                                offset-overflow
                                                color="primary"
                                                transition="scroll-x-transition"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-list-item-title
                                                        v-text="item.title"
                                                        v-on="on"
                                                    ></v-list-item-title>
                                                </template>
                                                <span>{{item.description}}</span>
                                            </v-tooltip>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn
                                                icon
                                                small
                                                v-if="active"
                                                color="primary"
                                                @click="onCategoryEdit"
                                            >
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                        <v-list-item-action>
                                            <v-icon v-if="active">
                                                <template
                                                    v-if="windowWidth >= 960"
                                                >mdi-chevron-right</template>
                                                <template v-else>mdi-chevron-down</template>
                                            </v-icon>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </v-list-item-group>
                            <v-list-item
                                @click="categoryDialog = !categoryDialog; isCategoryAdd = true;"
                                :disabled="photosLoading || event === 'upload'"
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-plus</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>ADD</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                    <v-divider v-if="windowWidth <= 600"></v-divider>
                </v-flex>
                <v-flex md9 xs12 class="pa-0">
                    <v-toolbar flat height="56">
                        <template v-if="event === 'upload'">
                            <v-btn icon @click="event = 'photos'">
                                <v-icon>mdi-close</v-icon>
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
                                <l-n-l-grid
                                    :images="photos"
                                    @grid-image-edit-clicked="onEditImage"
                                    @grid-image-delete-clicked="onDeleteImage"
                                ></l-n-l-grid>
                            </template>
                        </template>
                        <template v-else-if="event === 'upload'">
                            <div class="pa-2">
                                <l-n-l-uploader @upload="onPhotoUpload" @error="handleUploadError"></l-n-l-uploader>
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
import LNLGrid from "../components/LNLGrid.vue";
import LNLUploader from "../components/LNLUploader.vue";
import {
    getUser,
    addPhoto,
    editPhoto,
    deletePhoto,
    addCategory,
    editCategory,
    fetchAllMessages,
    fetchAllCategory,
    fetchPhotosByCategory,
    deletePhotoFromStorage
} from "../firebase";
export default {
    name: "Admin",
    components: {
        LNLGrid,
        LNLLoader,
        LNLUploader
    },
    data() {
        return {
            event: "photos",
            editingPhoto: false,
            photoForm: false,
            photoDialog: false,
            deleteDialog: false,
            deletingPhoto: false,
            isCategoryAdd: false,
            categoryDialog: false,
            addingCategory: false,
            editingCategory: false,
            categoryLoading: true,
            messagesDialog: false,
            messagesLoading: false,
            imageToDelete: null,
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
            photo: {
                id: "",
                caption: "",
                location: "",
                description: ""
            },
            photosLoading: false,
            photos: [],
            users: {
                "panditankit1995@gmail.com": "Ankit Kumar",
                "amitsahoo94@gmail.com": "Amit Sahoo"
            },
            messages: []
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
            return this.users[getUser().email] || "Admin";
        },
        iconName() {
            return "mdi-" + this.category.icon;
        },
        totalCategories() {
            return this.categories.length > 3 ? this.categories.length : 3;
        },
        windowWidth() {
            return this.$store.state.window.width;
        }
    },
    methods: {
        onEditImage(image) {
            this.photo = {
                id: image.id,
                caption: image.caption,
                location: image.location,
                categoryId: image.categoryId,
                description: image.description
            };
            this.photoDialog = true;
        },
        onDeleteImage(image) {
            this.deleteDialog = true;
            this.imageToDelete = image;
        },
        onDeletePhoto() {
            this.deletePhoto(this.imageToDelete);
        },
        onCategoryEdit() {
            this.category = {
                ...this.selectedCategory,
                icon: this.selectedCategory.icon.substr(4)
            };
            this.isCategoryAdd = false;
            this.categoryDialog = true;
        },
        onPhotoSubmit() {
            this.editPhoto();
        },
        onCategorySubmit() {
            if (this.isCategoryAdd) {
                this.addNewCategory();
            } else {
                this.isCategoryAdd = false;
                this.editCategory();
            }
        },
        onCategorySelect() {
            this.getPhotosByCategory();
        },
        onPhotoUpload(uploadData) {
            this.$store.dispatch("LANDING_VISITED", false);
            this.addPhoto(uploadData);
        },
        goToUpload() {
            this.event = "upload";
        },
        goToPhotos() {
            this.event = "photos";
        },
        getAllMessages() {
            this.messagesLoading = true;
            fetchAllMessages()
                .then(snapshot => {
                    return this.parseAllMessages(snapshot);
                })
                .then(messages => {
                    this.messages = messages;
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error getting messages. Please try later!"
                    );
                })
                .then(() => {
                    this.messagesLoading = false;
                });
        },
        deletePhotoTrace(image) {
            return Promise.all([
                deletePhoto(image.id),
                deletePhotoFromStorage(image.fullPath)
            ]);
        },
        deletePhoto(image) {
            if (image) {
                this.deletingPhoto = true;
                this.deletePhotoTrace(image)
                    .then(() => {
                        this.$store.dispatch(
                            "showSnackBar",
                            "Photo deleted successfully!"
                        );
                        this.getPhotosByCategory();
                    })
                    .catch(() => {
                        this.$store.dispatch(
                            "showSnackBar",
                            "Error deleting photo. Please try later!"
                        );
                    })
                    .then(() => {
                        this.deletingPhoto = false;
                        this.deleteDialog = false;
                        this.imageToDelete = null;
                    });
            } else {
                this.$store.dispatch(
                    "showSnackBar",
                    "Error deleting photo. Please try later!"
                );
            }
        },
        editPhoto() {
            this.editingPhoto = true;
            let { id, caption, location, description, categoryId } = this.photo;
            editPhoto({
                id,
                caption,
                location,
                categoryId,
                description
            })
                .then(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Photo edited successfully!"
                    );
                    this.getPhotosByCategory();
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error editing photo. Please try later!"
                    );
                })
                .then(() => {
                    this.editingPhoto = false;
                    this.photoDialog = false;
                });
        },
        addPhoto(data) {
            this.goToPhotos();
            this.photosLoading = true;
            addPhoto({
                categoryId: this.selectedCategory.id,
                ...data
            })
                .then(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Photo uploaded successfully!"
                    );
                    this.getPhotosByCategory();
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error uploading photo. Please try later!"
                    );
                })
                .then(() => {
                    this.photosLoading = false;
                });
        },
        handleUploadError(err) {
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
        clearCategoryForm() {
            this.categoryDialog = false;
            this.$nextTick(() => this.$refs.formCategory.reset());
        },
        clearPhotoForm() {
            this.photoDialog = false;
            this.$nextTick(() => this.$refs.formPhoto.reset());
        },
        editCategory() {
            this.editingCategory = true;
            let { title, description, icon } = this.category;
            let id = this.selectedCategory.id;
            editCategory({
                id,
                title,
                description,
                icon: icon === "" ? "mdi-image" : this.iconName
            })
                .then(res => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Category edited successfully!"
                    );
                    this.getAllCatgories(false);
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Adding category. Please try later!"
                    );
                })
                .then(() => {
                    this.editingCategory = false;
                    this.categoryDialog = false;
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
                })
                .catch(() => {
                    this.$store.dispatch(
                        "showSnackBar",
                        "Error Adding category. Please try later!"
                    );
                    this.categoryDialog = false;
                })
                .then(() => {
                    this.categoryDialog = false;
                    this.addingCategory = false;
                });
        },
        getAllCatgories(loadPhotos = true) {
            this.categoryLoading = true;
            fetchAllCategory()
                .then(snapshot => {
                    return this.parseAllCategories(snapshot);
                })
                .then(categories => {
                    this.categories = categories;
                    if (loadPhotos) {
                        this.selectedCategory = categories[0];
                        this.onCategorySelect();
                    }
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
        },
        navigateToHome() {
            this.$router.replace("/home");
        }
    },
    mounted() {
        this.getAllCatgories();
        this.getAllMessages();
    }
};
</script>
<style scoped>
.border-left {
    border-left: 1px solid rgba(0, 0, 0, 0.21);
}
</style>