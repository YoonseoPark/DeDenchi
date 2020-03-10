<template>
    <div class="sub-container">
        <div class="root-wrapper">
            <div class="function">
                <v-btn class="btn-function" fab small
                       router :to="{ name:'create' }"><i class="fas fa-plus fa-1x"></i></v-btn>
                <v-btn class="btn-function" fab small
                       router :to="{ name:'edit', params: { file_name: selected_file_name, name_list: name_lists } }"><i class="far fa-edit fa-1x"></i></v-btn>
                <v-btn class="btn-function" fab small
                       @click="delete_file"><i class="far fa-trash-alt fa-1x"></i></v-btn>
            </div>
            <div class="wrapper">
                <v-select
                        v-model="selected_file_name"
                        :items="file_name_list"
                        label="select your file"
                        class="file-selecter"
                        outlined
                        height="20%"
                        hide-details
                ></v-select>
                <div>{{ `Total ${this.people_num}` }}</div>
                <div class="input-wrapper">
                    <button class="btn-arrow"
                        @click="countDown">
                        <i class="fas
                                  fa-caret-left
                                  fa-2x"/>
                    </button>
                    <v-text-field
                            v-model="divide_num"
                            class="people-input"
                            hide-details
                            solo
                            flat
                    ></v-text-field>
                    <button class="btn-arrow"
                         @click="countUp">
                        <i class="fas
                                  fa-caret-right
                                  fa-2x"/>
                    </button>
                </div>
                <div class="btn-result">
                    <v-btn class="mx-2" width="150px" x-large dark color="dark"
                           router :to="{ name:'result', params: { name_List: name_lists, divide_Num: divide_num } }">
                        SHUFFLE
                    </v-btn>
                </div>
            </div>
            <v-alert
                    type="error"
                    class="alert"
                    :value="alert">
                <strong>{{ this.alert_message }}</strong>
            </v-alert>
        </div>
    </div>
</template>

<script>
    export default{
        data: () => ({
            file_name_list: [],
            name_lists: [],
            selected_file_name: null,
            object_json: null,
            alert: false,
            divide_num: 0,
            people_num: 0,
            alert_message: null,
        }),
        created() {
            const fs = require('fs')
            let isExist = fs.existsSync('nameList.json' )
                if(isExist) {
                    console.log("The file is exist")
                    fs.readFile('nameList.json', 'utf8', (err, data) => {
                        if(err) throw console.log(err + " 리드파일 오류")

                        //__ob__삭제
                        let test = JSON.parse(data)
                        let test2 = JSON.parse(JSON.stringify(test))

                        this.file_name_list = Object.getOwnPropertyNames(test2)
                        this.object_json = test2
                    })
                }
                else {
                    fs.writeFile('nameList.json', JSON.stringify({}, null, 2), (err) => {
                        if(err) throw console.log(err + " 파일쓰기 오류")
                            console.log("There is no File")
                            console.log("create File")
                    })
                }
            if(this.$route.params.alert){
                this.alert = true
                this.alert_message = this.$route.params.alert_message
            }
        },
        methods: {
            countDown: function () {
                if(this.divide_num > 0 && this.selected_file_name != null) this.divide_num -= 1
            },
            countUp: function () {
                if(this.divide_num < this.people_num && this.selected_file_name != null) this.divide_num += 1
            },
            delete_file: function () {
                if( this.selected_file_name == null ){
                    this.alert = true
                    this.alert_message = "Select a file you delete"
                }
                const fs = require('fs')
                fs.readFile('nameList.json', 'utf8', (err, data) => {
                    if(err) throw console.log(err)

                    let test = JSON.parse(data)
                    delete test[this.selected_file_name]
                    let test2 = JSON.parse(JSON.stringify(test))
                    this.file_name_list = Object.getOwnPropertyNames(test2)
                    this.name_lists = []

                    fs.writeFile('nameList.json', JSON.stringify(test2, null, 2), (err)=> {
                        if(err) throw console.log(err)
                        console.log("DATA IS DELETED")
                    })


                })
            }
        },
        watch: {
            peopleInput: function(val) {
                console.log(val)
              if(val < 0){
                  this.peopleInput = 0
              }
            },
            selected_file_name: function(val) {
                this.name_lists = []
                this.divide_num = 0
                this.people_num = this.object_json[val].length
                for(var i=0; i<this.object_json[val].length; i++){
                    this.name_lists.push(this.object_json[val][i])
                }
                this.alert = false
            }
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .sub-container {
        position: absolute;
        top: 10em;
        bottom: 0;
        left: 0;
        right: 0;

        min-width: 370px;
        width: 35%;
        height: 60%;
        background-color: white;
        margin: 0 auto auto;
    }
    .wrapper > p {
        margin: 0;
        font-size: 34px;
        width: 150px;
        border-bottom: 5px solid black;
        color: red;
        font-weight: bold;
    }
    .root-wrapper {
        width: 100%;
        height: 100%;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 15px 15px 15px;
        align-items: center;
        justify-items: center;
    }
    .function {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: -3.7em;
        float: right;
    }
    .btn-function {
        margin-bottom: 5px;
    }
    .edit-btn {
        display: inline-block;
    }
    .file-selecter {
        flex: 1;
        align-items: center;
        width: 150px;
    }
    .input-wrapper {
        flex: 1;
        display: flex;
    }
    .btn-arrow {
        flex: 2;
        align-self: center;
        opacity: 0.5;
        border: 0;
        outline: 0;
    }
    .people-input {
        flex: 1;
        align-items: center;
        font-size: 40px;
        margin: 0;
        padding: 0;
    }
    .people-input >>> input {
        text-align: center;
    }
    .btn-result {
        flex: 1;
        display: flex;
    }
    .btn-result a {
        align-self: center;
    }
    .alert {
        flex: 1;
    }
</style>
