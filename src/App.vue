<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <div class="main-container">
          <div class="main-title">De-Den-Chi<span style="font-size:15px">1.0v</span></div>
          <div class="sub-container">
            <router-view></router-view>
          </div>
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
    background: linear-gradient(45deg, #46E0E6, #00FFC3);
    height: 100vh;
    max-width: none;
    text-align: center;
  }
  .sub-container {
    flex: 1;
    position: absolute;
    top: 12em;
    bottom: 0;
    left: 0;
    right: 0;

    width: 60%;
    height: 60%;
    background-color: white;
    margin: 0 auto auto;
    border-radius: 15px;
  }
  .main-title {
    flex: 1;
    position: absolute;
    top: 1em;
    left: 0%;
    right: 0%;

    font-size: 70px;
    font-weight: bold;
    color: white;

  }
</style>
