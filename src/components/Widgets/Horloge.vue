<template>
    <div class="horloge">
        <button class="btn btn-primary mt-2 mb-1 mr-4"  @click="getAccessTimeZone" v-if="!newHours">Nouvelle Ville</button>
        <button class="btn-sm btn-warning mt-2 mb-1"  @click="toggleDelete = !toggleDelete" v-if="!newHours && !toggleDelete && timeData.length > 0">Edit</button>
        <button class="btn btn-light mt-2 mb-1"  @click="toggleDelete = !toggleDelete" v-if="!newHours && toggleDelete && timeData.length > 0">Back</button>
        <div v-if="newHours">
            <div class="form-group m-1" @keypress.enter="call_api_horloge(userid,city)">
                <label for="position"> Nom de la ville</label>
                <input type="text" id="position" class="form-control" v-model="city">
            </div>
            <button class="btn btn-primary delete" @click="call_api_horloge(userid,city)">Enregistrer</button>
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
    import User from '@/user';

        export default {

            name: "horloge",
            data(){
                return{
                    newHours:false,
                    city:'',
                    timeData:[],
                    time:[],
                    today:'',
                    toggleDelete: false,
                    userid: User.profile.id
                }
            },
            methods:{
                call_api_horloge: function(id,ville){ // BALANCE LES INFOS SUR LA VILLE ENREGISTREE
                    fetch('/api/widget/horloge/getAPIHorloge', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id":id,"token":User.getToken(),"city":ville})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        var timeZoneConv=parseFloat(data.horloge.annotations.timezone.offset_string.slice(0,3))
                        var objectCity={name:data.horloge.formatted ,timeZone: timeZoneConv}
                        this.timeData.push(objectCity)
                        this.time = new Array(this.time.length+1)
                        this.newHours=false
                        this.getTime()
                        this.city = ''
                        this.update_bdd_horloge(User.profile.id,this.timeData)
                    }.bind(this))
                },
                update_bdd_horloge: function(id,timeData){ //PERMET DE SOIT UPDATE SA BDD, SOIT INSERER SON TIMEDATA DANS LA BDD
                    fetch('/api/widget/horloge/getHorloge2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id":id,"token":User.getToken(),"timeData":timeData})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data){
                        const message = data.message
                    }.bind(this))
                },

                call_timedata: function(id){ //REGARDE SI L'UTILISATEUR AVAIT DEJA UN TIMEDATA DANS LA BDD
                    fetch('/api/widget/horloge/getHorloge', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id":id,"token":User.getToken()})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        if(data.timedata !== undefined){
                            this.timeData = JSON.parse(data.timedata[0].horloge_ville)
                            this.getTime()
                        }


                    }.bind(this))
                },
                getAccessTimeZone: function(){ //Ouvre la barre de recherche de ville
                    this.newHours= true
                },
                getTime: function(){ //Calcul l'heure avec la timeZone
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

                deleteItem : function (i) { //Supprimer une heure avec son ID
                    this.timeData.splice(i,1)
                    this.time.splice(i,1)
                    this.toggleDelete = false
                    this.update_bdd_horloge(User.profile.id,this.timeData)
                }
            },
            mounted(){
                this.call_timedata(User.profile.id)
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