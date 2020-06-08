<template>
    <div class="daystreak">
        <h3 class="text-center">Day Streak</h3>
        <p class="text-center"> {{counter}}</p>
    </div>
</template>

<script>
    export default {
        name: "DayStreak",
        data(){
            return {
                dataInBDD : new Date(2020,5,8), //A stocker dans BDD
                counter : 0, //A stocker dans BDD
                date: new Date()
            }
        },
        methods:{
            updateData: function () {
                this.dataInBDD = this.dataInBDD.toISOString().slice(0,10)
                this.date = this.date.toISOString().slice(0,10)
                if(this.date.slice(0,7) === this.dataInBDD.slice(0,7) && Number(this.date.slice(8,10))-1 == Number(this.dataInBDD.slice(8,10))){
                    console.log(true)
                    this.counter += 1
                }
                else{
                    this.counter = 0
                    console.log(false)
                }
            }
        },
        mounted() {
            this.updateData()
        }
    }
</script>

<style scoped>
    body{
        background-color: #ffcea9;
    }
    .daystreak {
        margin: auto;
        margin-top: 100px;
        background-color: indianred;
        width: 200px;
        height: 100px;
    }
</style>