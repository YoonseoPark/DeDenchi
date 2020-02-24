<template>
    <div class="container">
         <div class="list-view">
            <h3>File name : {{ this.fileName }}</h3>
             <div class="delete"><v-btn color="black" large dark @click="deleteAll">Delete All</v-btn></div>

             <div id="list-item">
                 <v-list>
                     <v-list-item-group
                             multiple
                             v-model="clickedIndex"
                     >
                         <template v-for="(item, i) in nameList">
                             <v-list-item
                                     :key="item+i"
                                     :value="i"
                                     active-class="blue--text text--accent-4"
                             >
                                 <template v-slot:default="{ active, toggle }">
                                     <v-list-item-action>
                                         <v-checkbox
                                                 :input-value="active"
                                                 color="blue accent-4"
                                                 @click="toggle"
                                         />
                                     </v-list-item-action>
                                     <v-list-item-content>
                                         <v-list-item-title class="font-weight-bold" v-text="item"></v-list-item-title>
                                     </v-list-item-content>
                                 </template>
                             </v-list-item>
                         </template>
                     </v-list-item-group>
                 </v-list>
             </div>
             <div class="delete">
                 <v-btn color="black" large dark @click="btn_delete">Delete</v-btn>
             </div>
         </div>
        <div class="info-view">
            <div class="info-item-view-1">
                <div>
                    <v-text-field
                            v-model="input_name"
                            label="Name"
                            class="nameInput"
                            @keypress.enter="pushName"
                    >
                    </v-text-field>
                    <v-btn color="black" small dark @click="pushName">ADD</v-btn>
                    <v-dialog
                            v-model="checkData.dialog_inputTextIsEmpty"
                            max-width="290"
                    >
                        <v-card>
                            <v-card-title class="headline">Warning</v-card-title>

                            <v-card-text>
                                Please input anythings
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="green darken-1"
                                        text
                                        @click="checkData.dialog_inputTextIsEmpty = false"
                                >
                                    ok
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                    <div style="color:red"><strong>TOTAL</strong></div>
                    <div class="totalNum">{{ this.nameList.length }}</div>
            </div>
            <div class="info-item-view-2">
                <v-btn color="black" large dark router :to="{ name: 'about' }">BACK</v-btn>
                <v-btn color="black" large dark @click="saveNewData">SAVE</v-btn>
                <v-dialog
                        v-model="checkData.dialog_dataIsSaved"
                        max-width="290"
                >
                    <v-card>
                        <v-card-title class="headline">Success!</v-card-title>

                        <v-card-text>
                            Data is saved successful
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="checkData.dialog_dataIsSaved = false"
                            >
                                ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                        v-model="checkData.dialog_fileNameIsEmpty"
                        max-width="290"
                >
                    <v-card>
                        <v-card-title class="headline">Input File's Name</v-card-title>

                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        v-model="fileName"
                                        label="File name"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="saveNewData"
                            >
                                ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                        v-model="checkData.dialog_fileWritten"
                        max-width="290"
                >
                    <v-card>
                        <v-card-title class="headline">Warning!</v-card-title>

                        <v-card-text>
                            すでに存在するファイル名です。 <br>
                            上書きしますか？
                                NOをクリックすると、新しいファイルを作ります。
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="agree"
                            >
                                YES
                            </v-btn>
                            <v-btn
                                    color="green darken-1"
                                    text
                                    @click="cancel"
                            >
                                NO
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                fileName: null,
                clickedIndex: [],
                nameList: [],
                input_name: null,
                allCheck: false,
                checkData: {
                    dialog_inputTextIsEmpty: false,
                    dialog_dataIsSaved: false,
                    dialog_fileNameIsEmpty: false,
                    dialog_fileWritten: false,
                }
            }
        },
        created() {
            var getData = this.$route.params.nameList
            this.fileName = this.$route.params.fileName
            for(var i=0; i<getData.length; i++){
                this.nameList.push(getData[i])
            }
        },
        watch: {
            nameList: function () {
                // DOM not updated yet
                this.$nextTick(function () {
                    // DOM updated
                    document.getElementById('list-item').scrollTop = document.getElementById('list-item').scrollHeight;
                });
            },
        },
        methods: {
            btn_delete() {
                this.clickedIndex = this.clickedIndex.sort(function(a, b) { // 오름차순
                    return a - b;
                    // 1, 2, 3, 4, 10, 11
                });
                for(var i=0; i<this.clickedIndex.length; i++){
                    this.nameList.splice(this.clickedIndex[i]-i, 1)
                }
                this.clickedIndex = []
            },
            deleteAll() {
                this.nameList = []
                this.clickedIndex = []
            },
            pushName() {
                if(this.input_name != null) {
                    this.nameList.push(this.input_name)
                    this.input_name = null
                }else {
                    this.checkData.dialog_inputTextIsEmpty = true
                }
            },
            saveNewData() {
                if(this.fileName == null){
                    this.checkData.dialog_fileNameIsEmpty = true
                }else{
                    this.checkData.dialog_fileNameIsEmpty = false
                    const path = './src/assets/save/nameList.json';
                    const fs = require('fs')
                    fs.readFile(path, 'utf8', (err, data)=>{
                        let parsedData = JSON.parse(data);
                        console.log("parsedData : "+ data)
                        //중복처리 : 중복이면 true, 아니면 false 를 return
                        let check = this.checkDuplicate(parsedData)
                        if(check){
                            //중복일때
                            console.log("중복임")
                            this.checkData.dialog_fileWritten = true
                        }
                        else if(!check){
                            console.log("중복아님 writeFile 시작")
                            parsedData[this.fileName] = this.nameList
                            fs.writeFile(path, JSON.stringify(parsedData), (err) => {
                                if(err) console.log(err);
                            })
                            console.log("writeFile 끝")
                            this.checkData.dialog_dataIsSaved = true
                        }
                    })
                }
            },
            checkDuplicate(parsedData) {
                const keyArray = Object.getOwnPropertyNames(parsedData)
                console.log("중복검사들어옴"+keyArray.length)
                for(var i=0; i<keyArray.length; i++){
                    if(this.fileName == keyArray[i]){
                        //중복일때
                        console.log("중복임")
                        return true
                    }else{
                        console.log("중복검사중")
                    }
                }
                return false
            },
            agree() {
                this.checkData.dialog_fileWritten = false

                const path = './src/assets/save/nameList.json';
                const fs = require('fs')
                fs.readFile(path, 'utf8', (err, data)=>{
                    let parsedData = JSON.parse(data);
                    parsedData[this.fileName] = this.nameList
                    fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
                        if(err) throw err;
                    })
                })
                this.checkData.dialog_dataIsSaved = true
            },
            cancel() {
                this.checkData.dialog_fileWritten = false
                this.fileName = null
                return this.saveNewData()
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        height: 100%;
        padding: 10px;
    }
    .list-view {
        display: flex;
        flex-direction: column;
        flex: 2;
        border: solid;
        border-radius: 15px;
        margin: 15px;
        padding: 15px;
    }
    .info-view {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 15px 15px 15px 0;
    }
    .info-item-view-1 {
        flex: 2;
        border: solid;
        border-radius: 15px;
        margin-bottom: 5px;
        padding: 15px;
    }
    .info-item-view-1 div:nth-child(1) {
        display: flex;
    }
    .nameInput {
        padding: 0;
        margin: 0;
    }

    .info-item-view-2 {
        flex: 0;
        display: flex;
    }
    .info-item-view-2 > a{
        flex: 1;
        margin: 5px;
    }
    .info-item-view-2 > button {
        flex: 1;
        margin: 5px;
    }
    h3 {
        text-align: left;
    }
    .delete {
        flex: 1;
        text-align: right;
    }
    #list-item {
        flex: 6;
        padding: 5px;
        overflow: auto;
    }
    .totalNum {
        margin: 0 auto;
        font-size: 40px;
        font-weight: bold;
    }
</style>