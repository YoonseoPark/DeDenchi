<template>
    <div class="container">
        <div class="about">
            <div class="text">
                This is Freeware<br>
                Make random team project<br>
                Beta
            </div>
            <div class="image">
                <img src="@/assets/yamami.png">
            </div>
        </div>
        <div class="my-2 start">
            <v-btn x-large color="success" dark min-width="300px" min-height="80px"
                   router :to="{name:'about'}">START</v-btn>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .container {
        display: flex;
        height: 100%;
        flex-direction: column;
        overflow: hidden;
        flex-wrap: wrap;
    }
    .about {
        display: flex;
        flex: 2;
        margin: 15px;
        align-items: center;
    }
    .text {
        flex: 1;
        font-size: 2em;
        font-weight: bold;
        line-height: 2em;
        text-align: right;
    }
    .image {
        flex: 1;
    }
    img {
        height: 300px;
    }
    .start {
        flex: 1;
        margin: 20px;
    }
</style>