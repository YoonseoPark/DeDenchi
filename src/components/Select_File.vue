<template>
    <div class="root-wrapper">
        <div class="select-file">
            <v-select
                    v-model="selectedFileName"
                    :items="jsonKey"
                    label="select your file"
                    outlined
            ></v-select>
        </div>
        <div class="edit-btn">
            <v-btn class="mx-2" fab dark color="dark" router :to="{ name:'edit', params: { fileName: selectedFileName, nameList: nameLists } }">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>

    export default{
        data: () => ({
            jsonKey: [],
            selectedFileName: null,
            nameLists: [],
            getJsonData: null
        }),
        created() {
            const files = require('../assets/save/nameList.json')
            this.getJsonData = JSON.stringify(files) //getJsonData 에 json 형식의 String 데이터를 삽입
            for(var i=0; i<(Object.keys(files)).length; i++){
                this.jsonKey = Object.getOwnPropertyNames(files)
            }
        },
        methods: {
        },
        watch: {
            selectedFileName: function(val) {
                this.nameLists = []
                // 키를 받으면 json 형식의 데이터를 파싱한 후, 받은 키값의 value 를 리턴
                var getJson = JSON.parse(this.getJsonData)
                for(var i=0; i<getJson[val].length; i++){
                    this.nameLists.push(getJson[val][i])
                }
            }
        }
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