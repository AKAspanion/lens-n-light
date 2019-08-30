import store from '../store';

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

export const getTags = (description) =>{  
    description = description.trim(); 
    let hashtagRE = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,100})(\b|\r)/g;
    let hashtags =description.match(hashtagRE);
    
    description = description.replace(hashtagRE, "").replace(/#/g, "");
    let newHashtags = [];
    if (hashtags !== null) newHashtags = hashtags.map(e => e.substr(1))
    return {
        hashtags: newHashtags,
        description: description.trim()
    }
}

export const getCategory = (id) => {
    return store.getters.categories.find(
        e => e.id == id
    )
}
export const getActiveCategory = () => {
    let index = store.getters.categories.findIndex(
        e => e.id == store.getters.activeCategory
    )
    return {
        index,
        ...store.getters.categories[index]
    };
}
export const getImagesByCategory = () => {
    return new Promise(resolve => {
        let imagesByCategory = {};
        store.getters.categories.forEach(c => {
            imagesByCategory[c.id] = store.getters.photos.filter(
                e => e.categoryId === c.id
            );
        });
        resolve(imagesByCategory);
    });
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
            let data = doc.data();
            let description = data.description.trim(); 
            let hashtagRE = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,100})(\b|\r)/g;
            let hashtags =description.match(hashtagRE);            
            description = description.replace(hashtagRE, "");
            description = description.replace(/#/g, "");
            let newHashtags = [];
            if (hashtags !== null) newHashtags = hashtags.map(e => e.substr(1))
            photos.push({
                id: doc.id,
                ...data,
                hashtags: newHashtags,
                description: description.trim()
            });
        });
        resolve(photos);
    });
}