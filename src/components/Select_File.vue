<template>
    <div>
        <v-select
                v-model="model"
                :items="items"
                label="select your file"
                outlined
        ></v-select>
    </div>
</template>

<script>
    export default{
        data: () => ({
            items: ['a', 'b', 'c'],
            model: null
        }),
    }
</script>