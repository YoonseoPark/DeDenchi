<template>
    <div class="container">
         <div class="list-view">
            <h3>File name : {{ this.fileName }}</h3>
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
                                         ></v-checkbox>
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
                 <v-btn color="black" large dark @click="btn_delete"><i class="mdi mdi-delete"></i></v-btn>
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
                </div>
            </div>
            <div class="info-item-view-2">
                <v-btn color="black" large dark router :to="{ name: 'about' }">BACK</v-btn>
                <v-btn color="black" large dark @click="saveNewData">SAVE</v-btn>
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
            }
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
            pushName() {
                if(this.input_name != null) {
                    this.nameList.push(this.input_name)
                    this.input_name = null
                }else {
                    alert("Please input anything")
                }
            },
            saveNewData() {
                const path = './src/assets/save/nameList.json';
                const fs = require('fs')
                fs.readFile(path, 'utf8', (err, data)=>{
                    let parsedData = JSON.parse(data);
                    parsedData[this.fileName] = this.nameList
                    fs.writeFile(path, JSON.stringify(parsedData), (err) => {
                        if(err) throw err;
                    })
                })
                alert("Saved file")
            },
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
</style>