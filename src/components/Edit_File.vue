<template>
    <div class="container">
         <div class="list-view">
            <h3>File name : {{ this.fileName }}</h3>
             <div class="list-item">
                 <v-list
                         subheader
                         flat
                 >
                     <v-list-item-group
                             multiple
                             v-model="this.clickedIndex"
                             :value="this.nameList"
                     >
                         <v-list-item
                                 v-for="name in this.nameList.name"
                                 :key="name.index"
                         >
                             <v-list-item-action>
                                 <v-checkbox></v-checkbox>
                             </v-list-item-action>
                             <v-list-item-content>
                                 {{ name }}
                             </v-list-item-content>
                         </v-list-item>
                     </v-list-item-group>
                 </v-list>
             </div>
             <div class="delete">
                 <v-btn color="black" large dark @click="create_json">Delete</v-btn>
             </div>
         </div>
        <div class="info-view">
            <div>
                <v-text-field v-model="input_name"></v-text-field>
                <v-btn color="black" large dark @click="add_json">add</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                fileName: 'text1',
                clickedIndex: [],
                nameList: {
                    name: [
                        '박윤서',
                        '박수현'
                    ]
                },
                input_name: null
            }
        },
        created() {
            const path = './src/assets/save/test.json'
            const fs = require('fs')
            fs.readFile(path, 'utf8', function (err, data) {
                console.log(data)
                console.log(JSON.parse(data))
            })
        },
        methods: {
            btn_delete() {
                for( var i=0; i<this.clickedIndex.length; i++){
                    this.nameList.splice(i,1)

                }
            },
            create_json() {

            },
            add_json() {
                var path = './src/assets/save/test.json'
                const fs = require('fs')
                fs.stat(path, function(err, stats){
                    if(stats.isFile(path)){
                        console.log("The File is already exist")
                    } else{
                        const wstream = fs.createWriteStream('./src/assets/save/test.json')
                        wstream.write("")
                    }
                })
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
        border: solid;
        border-radius: 15px;
        margin: 15px 15px 15px 0;
    }
    h3 {
        text-align: left;
    }
    .delete {
        flex: 1;
        text-align: right;
    }
    .list-item {
        flex: 6;
        padding: 5px;
        overflow: auto;
    }
</style>