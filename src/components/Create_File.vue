<template>
    <div class="sub-container">
        <div class="main_wrapper">
            <div class="navi">
                <div class="wrapper_btn_back">
                    <button class="btn_style" @click="btn_back">
                        <i class="fas fa-arrow-left fa-2x"></i>
                    </button>
                </div>
                <div>
                    {{ `Total ${ this.name_list.length }` }}
                </div>
            </div>
            <div class="wrapper_input_name">
                <v-text-field
                        v-model="input_name"
                        label="Name"
                        @keypress.enter="pushName"
                >
                </v-text-field>
            </div>
            <div id="wrapper_list">
                <v-list>
                    <v-list-item-group
                            multiple
                            v-model="clicked_index"
                    >
                        <template v-for="(item, i) in name_list">
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
            <div class="wrapper_btn">
                <div class="wrapper_btn_delete">
                    <button class="btn_style" @click="btn_delete">DELETE</button>
                </div>
                <div class="wrapper_btn_save">
                    <button class="btn_style" @click="btn_save">SAVE</button>
                </div>
            </div>
            <v-dialog
                    v-model="dialog_ctrl.input_name_is_empty"
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
                                @click="dialog_ctrl.input_name_is_empty = false"
                        >
                            ok
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> <!-- input error 다이얼로그 -->
            <v-dialog
                    v-model="dialog_ctrl.set_file_name"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Input File's Name</v-card-title>

                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    v-model="file_name"
                                    label="File name"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="green darken-1"
                                text
                                @click="check_duplicated"
                                @keypress.enter="check_duplicated"
                        >
                            ok
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> <!-- input file name 다이얼로그 -->
            <v-dialog
                    v-model="dialog_ctrl.data_is_saved"
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
                                router :to="{ name: 'select_file' }"
                        >
                            ok
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> <!-- success 다이얼로그 -->
            <v-dialog
                    v-model="dialog_ctrl.file_name_is_exist"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Warning!</v-card-title>

                    <v-card-text>
                        File name is duplicated
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="green darken-1"
                                text
                                @click="btn_save"
                        >
                            ok
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> <!-- duplicated 다이얼로그 -->
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                input_name: null,
                name_list: [],
                clicked_index: [],
                file_name: null,
                dialog_ctrl: {
                    input_name_is_empty: false,
                    set_file_name: false,
                    data_is_saved: false,
                    file_name_is_exist: false,
                }
            }
        },
        watch: {
            name_list: function () {
                // DOM not updated yet
                this.$nextTick(function () {
                    // DOM updated
                    document.getElementById('wrapper_list').scrollTop = document.getElementById('wrapper_list').scrollHeight;
                });
            },
        },
        methods: {
            pushName: function () {
                if(this.input_name != null) {
                    this.name_list.push(this.input_name)
                    this.input_name = null
                }else {
                    this.dialog_ctrl.input_name_is_empty = true
                }
            },
            btn_back: function () {
              this.$router.push('/')
            },
            btn_save: function () {
                this.dialog_ctrl.file_name_is_exist = false
                this.dialog_ctrl.set_file_name = true
            },
            btn_delete: function () {
                this.clicked_index = this.clicked_index.sort(function(a, b) { // 오름차순
                    return a - b;
                    // 1, 2, 3, 4, 10, 11
                });
                for(var i=0; i<this.clicked_index.length; i++){
                    this.name_list.splice(this.clicked_index[i]-i, 1)
                }
                this.clicked_index = []
            },
            check_duplicated: function () {
                this.dialog_ctrl.set_file_name = false
                const fs = require('fs')
                fs.readFile('nameList.json', 'utf8', (err, data) => {
                    if(err) throw console.log(err)
                    let fileNameList = JSON.parse(data)
                    let keyArray = Object.getOwnPropertyNames(fileNameList)

                    for(var i=0; i<keyArray.length; i++){
                        if(this.file_name == keyArray[i]){
                            //중복o
                            this.dialog_ctrl.file_name_is_exist = true
                            return 0
                        }
                    }
                    fileNameList[this.file_name] = this.name_list
                    let save_data = JSON.stringify(fileNameList, null, 2)
                    fs.writeFile('nameList.json', save_data, (err) => {
                        if(err) throw console.log(err)
                    })
                    this.dialog_ctrl.data_is_saved = true
                })
            },
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
        padding: 15px;
    }
    .main_wrapper {
        width: 100%;
        height: 100%;
    }
    .navi {
        display: flex;
    }
    .wrapper_btn_back {
        flex: 1;
        text-align: left;
    }
    .btn_style {
        outline: 0;
        border: 0;
    }
    .wrapper_btn_save {
        flex: 1;
        text-align: right;
    }
    .wrapper_btn_delete {
        flex: 1;
        text-align: left;
    }
    .wrapper_input_name {
        display: inline-block;
        width: 150px;
    }
    #wrapper_list {
        overflow: auto;
        height: 275px;
    }
    .wrapper_btn {
        display: flex;
        position:absolute;
        left:0px;
        bottom:0px;
        padding: 15px;
        width: 100%;
    }
</style>
