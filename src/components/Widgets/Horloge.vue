<template>
        <div class="horloge">
            <button class="btn btn-primary mt-2 mb-1 mr-4"  @click="getAccessTimeZone" v-if="!newHours">Nouvelle Ville</button>
            <button class="btn-sm btn-warning mt-2 mb-1"  @click="toggleDelete = !toggleDelete" v-if="!newHours && !toggleDelete && timeData.length > 0">Edit</button>
            <button class="btn btn-light mt-2 mb-1"  @click="toggleDelete = !toggleDelete" v-if="!newHours && toggleDelete && timeData.length > 0">Back</button>
            <div v-if="newHours">
                <div class="form-group m-1" @keypress.enter="getTimezone">
                    <label for="position"> Nom de la ville</label>
                    <input type="text" id="position" class="form-control" v-model="city">
                </div>
                <button class="btn btn-primary delete" @click="getTimezone">Enregistrer</button>
            </div>

            <p class="m-1 none">{{today}}</p>

            <div v-for="(worldTime, i) in timeData" :key="i" class=" m-2 d-flex flex-row justify-content-between">
                <p style="font-size:16px;">{{worldTime.name}} - {{time[i].date}}</p>
                <div class="horlogeCity ml-2">
                    <p class="pl-1 pr-1">{{time[i].hours}}</p>
                </div>
                <button class="btn-sm btn-danger ml-1" @click="deleteItem(i)" v-if="toggleDelete">X</button>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "horloge",
        data(){
            return{
                newHours:false,
                city:'',
                timeData:[],
                time:[],
                today:'',
                toggleDelete: false
            }
        },
        methods:{
            getAccessTimeZone: function(){
                this.newHours= true
            },
            getTimezone: function(){
                axios
                    .get(`https://api.opencagedata.com/geocode/v1/json?q=${this.city}&key=93fd4bf9122142cba65a015d0a69c1a0`)
                    .then(reponse=>{
                        var timeZoneConv=parseFloat(reponse.data.results[0].annotations.timezone.offset_string.slice(0,3))
                        var objectCity={name:reponse.data.results[0].formatted ,timeZone: timeZoneConv}
                        this.timeData.push(objectCity)
                        this.time = new Array(this.time.length+1)
                        this.newHours=false
                        this.getTime()
                        this.city = ''
                    })
                },
            getTime: function(){
                for(var id in this.timeData){
                    var date = new Date()
                    this.today = date.toLocaleString('fr-FR')
                    date.setHours(date.getHours() + this.timeData[id].timeZone - 2)
                    var h = date.getHours();
                    var m = date.getMinutes();
                    var s = date.getSeconds();
                    if( h < 10 ){ h = '0' + h; }
                    if( m < 10 ){ m = '0' + m; }
                    if( s < 10 ){ s = '0' + s; }
                    this.time[id] = {
                        hours : h + ':' + m + ':' + s,
                        date : date.toLocaleString('fr-FR', { timeZone: 'UTC' }).slice(0,10)
                    }
                }
                setTimeout(this.getTime, 1000)
            },

            deleteItem : function (i) {
                this.timeData.splice(i,1)
                this.time.splice(i,1)
                this.toggleDelete = false
            }
        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>

<style scoped>
    button{
        margin: auto;
    }
    .horloge{
        margin: auto;
        overflow-y: auto;
    }
    .horlogeCity{
        background-color:#0C1639;
        color:silver;
        font-size:40px;
        border-radius: 10px;
    }

    .none{
        display: none;
    }
</style>