<template>
    <div class="container">
        <div class="about">
            <div class="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                PageMaker including versions of Lorem Ipsum.
            </div>
            <div class="image">
                <img src="@/assets/yamami.png">
            </div>
        </div>
        <div class="my-2 start">
            <v-btn x-large color="success" dark min-width="200px"
                   router :to="{name:'about'}">START</v-btn>
        </div>
    </div>
</template>=

<script>
    export default {

    }
</script>

<style scoped>
    .container {

        height: 100%;
    }
    .about {
        display: flex;
        margin: 15px;
        margin-top: 40px;
    }
    .text {
        flex: 2;
        font-size: 10px;
        line-height: 2em;
    }
    .image {
        flex: 1;
    }
    img {
        height: 150px;
    }
    .start {
        position: absolute;
        left: 0%;
        right: 0%;
        bottom: 40px;
        margin: auto;
        width: 200px;
    }
</style>