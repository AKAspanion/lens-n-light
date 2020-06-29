# Lens-n-Light

![](https://firebasestorage.googleapis.com/v0/b/lens-n-light.appspot.com/o/photos%2Fsmartmockups_k0a3apv1.png?alt=media&token=0ba2d720-1f53-449a-8319-7899ec857381)

This is a web application.

* People visiting here, view it as a Portfolio/Photography website.
* Owner of this site can perform CRUD operations from Admin page and manage photos that appear on site.

## Live View
* View the production site at [Lens-and-Light](https://lens-n-light.web.app)
* To enter the Admin page you can login as **Demo** user using the following credentials [ _Note: Demo user can't use CUD operations_ ]
  * Email: `demouser@lnl.com`
  * Password: `password`

## Getting Started

### Prerequisites
You need to install [node](https://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](https://es6.ruanyifeng.com/), [vue](https://vuejs.org/), [vuex](https://vuex.vuejs.org/), [vue-router](https://router.vuejs.org/zh-cn/),  [vuetify](https://vuetifyjs.com) and [firebase](http://firebase.google.com/). Understanding and learning this knowledge in advance will greatly help the use of this project. 

This project uses firebase for backend.\
To use this project, you must create a web-app project on firebase.

### Installing

```bash
# clone the project
git clone https://github.com/AKAspanion/Lens-n-Light.git

# enter the project directory
cd Lens-n-Light
```

Before going into development, you need to configure .env file.

Go to the settings page of firebase project you created, and look for a config option under 'Firebase SDK snippet'.
```js
// It should look something like this
const firebaseConfig = {
  apiKey: "XYZ...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
}; 
```
Populate the above values into the .env file without quotes.
```
VUE_APP_API_KEY=XYZ...
VUE_APP_AUTH_DOMAIN=...
VUE_APP_DATABASE_URL=...
VUE_APP_PROJECT_ID=...
VUE_APP_STORAGE_BUCKET=...
VUE_APP_MESSAGING_SENDER_ID=...
VUE_APP_APP_ID=...
```
Project is now pointing to your firebase.

Create authentication in firebase using email and password which can be used to login to admin page.

```bash
# install dependency
npm install

# develop
npm run serve
```
Project will launch at http://localhost:8080

## Deployment
```bash
#compiles and minifies for production
npm run buid
```
The `/dist` directory is ready to be deployed
## Built With
* [Vue.js]() - SPA JavaScript Framework
* [Vuetify]() - Frontend Components Framework
* [Firebase]() - Backend and Hosting
## Author
[**Ankit Kumar Pandit**](http://spanion.xyz)