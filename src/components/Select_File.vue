<template>
    <div class="root-wrapper">
        <div class="select-wrapper">
            <div class="select-file">
                <v-select
                        v-model="selectedFileName"
                        :items="jsonKey"
                        label="select your file"
                        outlined
                ></v-select>
            </div>
            <div class="edit-btn">
                <v-btn class="mx-2" height="56px" dark color="dark"
                       router :to="{ name:'edit', params: { fileName: selectedFileName, nameList: nameLists } }">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        <v-alert
                type="error"
                :value="alert">
            <strong>ファイルを選択し、人数やチーム数を入力したか確認してください。</strong>
        </v-alert>
            <div class="info-divide">
                <div class="input-count">
                    <v-row align="center">
                        <v-checkbox
                                v-model="checkBox_first"
                                hide-details
                                class="shrink mr-2 mt-0"
                        ></v-checkbox>
                        <v-text-field
                                :disabled="first_textField_state"
                                v-model="getPeopleNum"
                                name="getPeopleNum"
                                label="人数で分ける"
                        ></v-text-field>
                    </v-row>
                    <v-row align="center">
                        <v-checkbox
                                v-model="checkBox_second"
                                hide-details
                                class="shrink mr-2 mt-0"
                        ></v-checkbox>
                        <v-text-field
                                :disabled="second_textField_state"
                                v-model="getTeamNum"
                                name="getTeamNum"
                                label="チーム数で分ける"
                        ></v-text-field>
                    </v-row>
                </div>
                <div class="info-count">
                    <div>TOTAL</div>
                    <div class="info-count-totalNum">{{ this.countPeople }}</div>
                </div>
            </div>
        <div class="result-btn-wrapper">
            <div class="result-btn">
                <v-btn class="mx-2" x-large dark color="dark"
                       router :to="{ name:'result', params: { nameList: nameLists, divideNum: divideNum, switchChanger: switchChanger } }">
                    SHUFFLE
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        data: () => ({
            jsonKey: [],
            selectedFileName: null,
            nameLists: [],
            getJsonData: null,
            countPeople: 0,
            divideNum: null,
            checkBox_first: false,
            checkBox_second: false,
            first_textField_state: true,
            second_textField_state: true,
            getPeopleNum: null,
            getTeamNum: null,
            switchChanger: null,
            alert: false
        }),
        created() {
            const files = require('../assets/save/nameList.json')
            this.getJsonData = JSON.stringify(files) //getJsonData 에 json 형식의 String 데이터를 삽입
            this.jsonKey = Object.getOwnPropertyNames(files)
            if(this.$route.params.alert){
                this.alert = true
            }
        },
        methods: {
        },
        watch: {
            selectedFileName: function(val) {
                // 키를 받으면 json 형식의 데이터를 파싱한 후, 받은 키값의 value 를 리턴
                var getJson = JSON.parse(this.getJsonData)
                this.countPeople = getJson[val].length
                for(var i=0; i<getJson[val].length; i++){
                    this.nameLists.push(getJson[val][i])
                }
                this.alert = false
            },
            checkBox_first: function (val) {
                if(this.checkBox_first == true){
                    this.switchChanger = true
                    this.checkBox_second = false
                    this.first_textField_state = !val
                    this.second_textField_state = val
                }
            },
            checkBox_second: function (val) {
                if(this.checkBox_second == true){
                    this.switchChanger = false
                    this.checkBox_first = false
                    this.second_textField_state = !val
                    this.first_textField_state = val
                }
            },
            getPeopleNum: function (val) {
                this.divideNum = val
            },
            getTeamNum: function (val) {
                this.divideNum = val
            }
        }
    }
</script>

<style scoped>
    .root-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 15px;
    }
    .select-wrapper {
        flex: 1;
        display: inline-block;
        padding: 15px 15px 0;
    }
    .select-file {
        display: inline-block;
        width: 50%;
    }
    .edit-btn {
        display: inline-block;
    }
    .info-divide {
        display: flex;
        justify-content: center;
    }
    .input-count {
        display: inline-block;
        width: 320px;
    }
    .info-count {
        display: inline-block;
        margin-left: 10px;
    }
    .info-count-totalNum {
        width: 100px;
        height: 100px;
        border: solid;
        border-radius: 10px;

        display: table-cell;
        vertical-align: middle;
        font-size: 40px;
        font-weight: bold;
    }
    .row {
        margin: 0;
    }
</style>