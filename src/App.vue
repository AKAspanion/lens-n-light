<template>
  <div id="app">
    <v-app>
      <grid-container :images="images"></grid-container>
    </v-app>
  </div>
</template>

<script>
import DataService from "./dataproviders/DataService";
import GridContainer from './components/GridContainer.vue'

export default {
  name: 'app',
  components: {
    GridContainer
  },
  data(){
      return {
          images: []
      }
  },
  methods: {
      fetchData() {
          DataService
              .getImages()
              .then(response => {
                  this.images = response.data.images;
              });
      }
  },
  created() {
      this.fetchData();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.test{
    background: red;
    
}
</style>
