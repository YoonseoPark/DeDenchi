<template>
    <div class="mainContainer">
        <div class="listWrapper">
            <div
                    v-for="(team, idx) in resultList"
                    :key="idx"
                    class="tests">
                <v-list-item-title align="left" class="teamNum">
                    {{ idx+1+"Team" }}
                </v-list-item-title>
                <v-list-item
                    v-for="items in team"
                    :key="items"
                    class="test">
                    {{ items }}
                </v-list-item>
            </div>
        </div>
        <div class="btn_back">
            <v-btn dark large router :to="{ name: 'about' }">back</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            nameList: [],
            divideNum: null,
            totalNum: null,
            switchChanger: null,
            resultList: [],
            alert: true
        }),
        created() {
            this.nameList = this.$route.params.nameList
            this.divideNum = this.$route.params.divideNum
            this.switchChanger = this.$route.params.switchChanger

            //데이터 검사
            this.noData()

            this.totalNum = this.nameList.length
            console.log(this.divideNum+ "넘김")
            console.log(this.totalNum+" 전체인원")

            //배열요소를 랜덤으로 섞어줌
            this.randomMix()

            //팀 수를 입력받았을 때
            if(this.switchChanger==false && this.divideNum!=null){
                let people_perTeam = Math.floor(this.totalNum/this.divideNum)
                console.log(people_perTeam+" 팀당 인원")
                for(var j=0; j<this.divideNum; j++){
                    let result = this.nameList.slice(j * people_perTeam, (j + 1) * people_perTeam)
                    this.resultList.push(result)
                    console.log(result+ " 최종 결과 리스트 정보")
                }
                let rest = this.totalNum % this.divideNum
                console.log(rest+" 이건 나머지 인원")
                if(rest > 0){
                    for(var k=0; k<rest; k++){
                        this.resultList[k].push(this.nameList[this.divideNum * people_perTeam + k])
                    }
                }
                console.log(this.resultList)
            }else if(this.switchChanger == true && this.divideNum!=null){
                //인원 수를 입력받았을 때
                // total = 13 peopleCount = 4
                // 총 4팀 4 4 4 1
                //12~15까지 4명// 그런데 배열이 13까지니까 널포인트 익셉셜 날듯?
                //마지막 한팀은..배열 길이-1 만큼까지만?
                let temp = this.totalNum % this.divideNum
                let teamNum = 0
                if(temp > 0){
                    teamNum = Math.floor(this.totalNum / this.divideNum)+1
                }else{
                    teamNum = this.totalNum / this.divideNum
                }
                for(var l=0; l<teamNum; l++){
                    let result = this.nameList.slice(l * this.divideNum, (l + 1) * this.divideNum)
                    this.resultList.push(result)
                }
                console.log(this.resultList)
            }
        },
        methods: {
            randomMix: function () {
                for(var i=0; i<this.nameList.length; i++){
                    let random = Math.floor(Math.random() * (this.nameList.length - i) + i)
                    let temp = this.nameList[i]
                    this.nameList[i] = this.nameList[random]
                    this.nameList[random] = temp
                }
            },
            noData: function () {
                if(this.nameList === null || this.divideNum === null){
                    return this.$router.push({name: 'about', params: {alert: alert}})
                }
            }
        }
    }
</script>

<style scoped>
    .mainContainer {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 15px;

        display: flex;
        flex-direction: column;
    }
    .test {
        overflow: auto;
        font-weight: bold;
        font-size: 20px;
    }
    .tests {
        display: inline-block;
        width: 150px;
        /*margin-left: 15px;
        margin-top: 15px;*/
        border: solid;
        overflow: auto;
        border-radius: 10px;
        margin: 10px;
    }
    .listWrapper {
        flex: 9;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 10px;
        overflow: auto;
    }
    .v-list-item {
        min-height: 0px;
        padding: 0 5px;
    }
    .btn_back {
        flex: 1;
        text-align: right;
        padding: 15px;
    }
    .teamNum {
        background: black;
        color: whitesmoke;
        font-weight: bold;
        font-size: 20px;
        padding: 5px;
    }

</style>