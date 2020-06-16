<template>
    <div class="classement">
        <table class="table">
            <thead>
            <th scope="col">#</th>
            <th scope="col">Club</th>
            <th scope="col">MJ</th>
            <th scope="col">G</th>
            <th scope="col">N</th>
            <th scope="col">P</th>
            <th scope="col">BP</th>
            <th scope="col">BC</th>
            <th scope="col">DB</th>
            <th scope="col">Pts</th>
            </thead>
            <tbody>
            <tr v-for="(team,i) in tableLigue1" :key="i">
                <th scope="row">{{team.position}}</th>
                <td><img :src="getImg(team.team.crestUrl)" alt="teamLogo" class="img mr-4"> {{team.team.name}}</td>
                <td>{{team.playedGames}}</td>
                <td>{{team.won}}</td>
                <td>{{team.draw}}</td>
                <td>{{team.lost}}</td>
                <td>{{team.goalsFor}}</td>
                <td>{{team.goalsAgainst}}</td>
                <td>{{team.goalDifference}}</td>
                <td>{{team.points}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "ClassementLigue1",
        data(){
            return {
                tableLigue1:[]
            }
        },
        methods: {
            call: function(){
                return new Promise((r) => {
                    fetch('https://api.football-data.org/v2/competitions/2015/standings', {
                        method: 'GET',
                        headers: {
                            "X-Auth-Token": "91a5c40be11745eb9e97a8707f058a2a"
                        }
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        r(data)
                        console.log("API Ligue1 OK")
                        console.log(data)
                    })
                });
            },
            getTable : function () {
                this.call().then((res) => {
                    this.tableLigue1=res.standings[0].table
                })
            },
            getImg: function (img) {
                return img.replace(/http:/, 'https:');
            }
        },
        mounted() {
            this.getTable()
        }
    }
</script>

<style scoped>
    .img{
        display: flex;
        float: left;
        width: 25px;
    }
    .classement{
        overflow-y: auto;
        height: 500px;
    }
</style>