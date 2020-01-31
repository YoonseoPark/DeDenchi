<template>
    <div class="root-wrapper">
        <div class="select-file">
            <v-select
                    v-model="model"
                    :items="items"
                    label="select your file"
                    outlined
            ></v-select>
        </div>
        <div class="edit-btn">
            <v-btn class="mx-2" fab dark color="dark" router :to="{ name:'edit' }">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default{
        data: () => ({
            items: [],
            model: null
        }),
        created() {
            const files = require.context(
                '@/assets/save',
                true,
                /^.*\.txt$/
            )
            this.items = files.keys()
            console.log(files.keys())
        },
        methods: {

        },
    }
</script>

<style scoped>
    .root-wrapper {
        display: flex;
        flex-direction: column;
        margin: 15px;
    }

    .select-file {
        flex: 1;
    }
    .edit-btn {
        flex: 1;
    }
</style>