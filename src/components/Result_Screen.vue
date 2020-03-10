<template>
    <div class="sub-container">
        <div class="result_wrapper">
            <v-card
                    v-for="(team, idx) in result_List"
                    :key="idx"
                    elevation="12"
                    class="result_item">
                <v-list-item-title
                        align="left"
                        class="list_title">
                    <span class="team_tag">{{ idx+1 }}</span> Team
                </v-list-item-title>
                <v-list-item
                    v-for="(items, idx) in team"
                    :key="idx"
                    class="list_item">
                    {{ items }}
                </v-list-item>
            </v-card>
        </div>
        <div class="btn_back">
            <v-btn dark large router :to="{ name: 'select_file' }">back</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            name_List: [],
            divide_Num: 0,
            total_Num: 0,
            result_List: [],
            alert: true
        }),
        created() {
            this.name_List = this.$route.params.name_List
            this.divide_Num = this.$route.params.divide_Num

            //데이터 검사
            this.noData()

            this.total_Num = this.name_List.length

            //배열요소를 랜덤으로 섞어줌
            this.randomMix()

            //팀 수를 입력받았을 때
            if( this.divide_Num !== 0 ){
                let temp = this.total_Num % this.divide_Num
                let teamNum = 0
                if(temp > 0){
                    teamNum = Math.floor(this.total_Num / this.divide_Num)+1
                }else{
                    teamNum = this.total_Num / this.divide_Num
                }
                for(var l=0; l<teamNum; l++){
                    let result = this.name_List.slice(l * this.divide_Num, (l + 1) * this.divide_Num)
                    this.result_List.push(result)
                }
            }
        },
        methods: {
            randomMix: function () {
                for(var i=0; i<this.name_List.length; i++){
                    let random = Math.floor(Math.random() * (this.name_List.length - i) + i)
                    let temp = this.name_List[i]
                    this.name_List[i] = this.name_List[random]
                    this.name_List[random] = temp
                }
            },
            noData: function () {
                if(this.name_List === [] || this.divide_Num === 0){
                    return this.$router.push({name: 'select_file', params: {alert: alert, alert_message: "Select a file or check number"}})
                }
            }
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .sub-container {
        display: flex;
        flex-direction: column;

        min-width: 370px;
        width: 100%;
        height: 100%;
        background-color: white;
        margin: 0 auto auto;
        padding: 15px;
    }
    .result_wrapper {
        flex: 9;
        display: grid;
        grid-gap: 15px;
        padding: 10px;
        grid-template-columns: repeat(3, 1fr);
        overflow: auto;
    }
    .result_item {
        flex: 1;
    }
    .list_title {
        padding: 5px;
        font-weight: bold;
        background: #FFC754;
    }
    .list_item {
        font-weight: bold;
    }
    .btn_back {
        padding-top: 10px;
        text-align: right;
        flex: 1;
    }
</style>
