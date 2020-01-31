<template>
  <v-app>
  <div class="main-container">
    <div class="title">De-Den-Chi</div>
    <div class="sub-container">
      <router-view></router-view>
    </div>
  </div>
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
  .main-container {
    background-color: powderblue;
    height: 100vh;
    max-width: none;
    text-align: center;
  }
  .sub-container {
    position: absolute;
    top: 250px;
    bottom: 0;
    left: 0;
    right: 0;

    width: 60%;
    height: 60%;
    background-color: white;
    margin: auto;
    margin-top: 0;
    border-radius: 15px;
  }
  .title {
    position: absolute;
    top: 100px;
    left: 0%;
    right: 0%;

    font-size: 60px;
    font-weight: bold;
    color: white;

  }
</style>
