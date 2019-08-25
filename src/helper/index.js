import {
    fetchAllPhotos,
    fetchAllCategory,
    fetchAllMessages
} from "../firebase";

export const getAllMessages = () => {
    return new Promise((resolve, reject) => {
        fetchAllMessages()
            .then(snapshot => {
                return parseAllMessages(snapshot);
            })
            .then(messages => {
                resolve(messages);
            })
            .catch(() => {
                reject("Error getting messages. Please try later!")
            })
    })
};

export const getAllPhotos = () => {
    return new Promise((resolve, reject) => {
        fetchAllPhotos()
            .then(snapshot => {
                return parseAllPhotos(snapshot);
            })
            .then(photos => {
                resolve(photos);
            })
            .catch(() => {
                reject("Error getting photos. Please try later!")
            })
    })
};
export const getAllCategories = () => {
    return new Promise((resolve, reject) => {
    fetchAllCategory()
        .then(snapshot => {
            return parseAllCategories(snapshot);
        })
        .then(categories => {
            resolve(categories);
        })
        .catch(() => {
            reject("Error getting all categories. Please try later!")
        })
    })
}
const parseAllMessages = (snapshot) => {
    return new Promise((resolve) => {
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
const parseAllCategories = (snapshot) => {
    return new Promise((resolve) => {
        let categories = [];
        snapshot.forEach(doc => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        resolve(categories);
    });
}
const parseAllPhotos = (snapshot) => {
    return new Promise((resolve) => {
        let photos = [];
        snapshot.forEach(doc => {
            photos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        resolve(photos);
    });
}