<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <div class="main-container">
          <router-view></router-view>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .container {
    padding: 0px;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    background: #AABBCC;
    height: 100vh;
    max-width: none;
    text-align: center;


  }
  .sub-container > div {
    width: 100%;
    height: 100%;
  }
</style>
