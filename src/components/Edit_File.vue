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
                             v-model="settings"
                             multiple
                     >
                         <v-list-item>
                             <template v-slot:default="{ active, toggle }">
                                 <v-list-item-action>
                                     <v-checkbox
                                             v-model="active"
                                             color="primary"
                                             @click="toggle"
                                     ></v-checkbox>
                                 </v-list-item-action>

                                 <v-list-item-content>
                                     <v-list-item-title>Notifications</v-list-item-title>
                                 </v-list-item-content>
                             </template>
                         </v-list-item>

                         <v-list-item>
                             <template v-slot:default="{ active, toggle }">
                                 <v-list-item-action>
                                     <v-checkbox
                                             v-model="active"
                                             color="primary"
                                             @click="toggle"
                                     ></v-checkbox>
                                 </v-list-item-action>

                                 <v-list-item-content>
                                     <v-list-item-title>Sound</v-list-item-title>
                                 </v-list-item-content>
                             </template>
                         </v-list-item>

                         <v-list-item>
                             <template v-slot:default="{ active, toggle }">
                                 <v-list-item-action>
                                     <v-checkbox
                                             v-model="active"
                                             color="primary"
                                             @click="toggle"
                                     ></v-checkbox>
                                 </v-list-item-action>

                                 <v-list-item-content>
                                     <v-list-item-title>Video sounds</v-list-item-title>
                                 </v-list-item-content>
                             </template>
                         </v-list-item>

                         <v-list-item>
                             <template v-slot:default="{ active, toggle }">
                                 <v-list-item-action>
                                     <v-checkbox
                                             v-model="active"
                                             color="primary"
                                             @click="toggle"
                                     ></v-checkbox>
                                 </v-list-item-action>

                                 <v-list-item-content>
                                     <v-list-item-title>Invites</v-list-item-title>
                                 </v-list-item-content>
                             </template>
                         </v-list-item>
                     </v-list-item-group>
                 </v-list>
             </div>
             <div class="delete">
                 <v-btn color="black" large dark>Delete</v-btn>
             </div>
         </div>
        <div class="info-view">
            <div>name</div>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                fileName: 'text1'
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
    }
</style>