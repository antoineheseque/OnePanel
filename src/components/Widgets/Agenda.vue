<template>
    <div class="agenda">
        <button class="btn btn-success m-2" @click="addData" v-if="!toggleAddEvent && !toggleSeeEvent">Ajouter un event</button>
        <div class="event" v-if="toggleAddEvent">
            <button class="btn btn-warning mb-3" @click="goBack">Retour</button>
            <button class="btn btn-danger ml-4" @click="deleteEvent(index)" v-if="modifying">Supprimer</button>
            {{modifying}} {{index}}
            <div class="row">
                <div class="col-sm-1">
                    <label>Du</label>
                </div>
                <div class="col-sm-7">
                    <datepicker :language="fr"  v-model="event.fromDate" class="form-control text-center"></datepicker>
                </div>
                <div class="col-sm-4">
                    <vue-timepicker v-model="fromTime" class="timepicker"></vue-timepicker>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-sm-1">
                    <label>Au</label>
                </div>
                <div class="col-sm-7">
                    <datepicker :language="fr"  v-model="event.toDate" class="form-control text-center"></datepicker>
                </div>
                <div class="col-sm-4">
                    <vue-timepicker v-model="toTime" close-on-complete></vue-timepicker>
                </div>
            </div>
            <div class="form-group">
                <label for="title">Titre</label>
                <input type="text" class="form-control" id="title" v-model="event.title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" rows="3" v-model="event.description"></textarea>
            </div>
            <div class="form-group">
                <label for="adress">Adresse</label>
                <input type="text" class="form-control" id="adress" v-model="event.address">
            </div>
            <p>{{error}}</p>
            <button type="submit" class="btn btn-primary mb-2" @click="getData">Envoyer</button>
        </div>
        <div v-if="toggleAllEvent">
            <div v-for="(event,i) in calendar" :key="i" class="alert-info p-2 m-2 modify"  @click="seeEvent(i)">
                <h6>{{event.title}}</h6>
            </div>
        </div>
        <div v-if="toggleSeeEvent">
            <button class="btn btn-warning" @click="goBack">Retour</button>
            <button class="btn btn-warning ml-4" @click="modifyEvent(index)">Modifier</button>
            <button class="btn btn-success ml-4" @click="toggleMoreInfo =!toggleMoreInfo" v-if="!toggleMoreInfo && event.itinerary">Plus d'info</button>
            <button class="btn btn-danger ml-4" @click="toggleMoreInfo = !toggleMoreInfo" v-if="toggleMoreInfo && event.itinerary">Moins d'info</button>
            <div>
                <h5>Titre : {{event.title}}</h5>
                <p><b>Du :</b> {{event.fromDate.toLocaleString('fr-FR', { timeZone: 'UTC' }).slice(0,14)}} → {{event.toDate.toLocaleString('fr-FR', { timeZone: 'UTC' })}} <template v-if="event.address">à {{event.address}}</template></p>
                <p><b>Description :</b> {{event.description}}</p>
                <div v-if="toggleMoreInfo">
                    <div v-if="event.itinerary" class="itinerary">
                        <p><b>Temps de trajet (en voiture):</b> {{(event.itinerary.total_time/3600).toFixed(0)}}h{{(((event.itinerary.total_time/3600)%1)*60).toFixed(0)}}m</p>
                        <p><b>Distance :</b> {{(event.itinerary.total_distance/1000).toFixed(2)}} km</p>
                        <p><b>Il faudrai partir le :</b> {{departure.toLocaleString('fr-FR', { timeZone: 'UTC' })}}</p>
                        <p v-if="this.departure.getTime()-(new Date()).getTime() < 0" class="danger">Vous ne pourrais jamais y être à l'heure</p>
                        <a :href="getURLItinerary()" target="_blank" class="btn btn-success m-2">Voir l'itineraire</a>
                    </div>
                    <h5 v-if="event.meteo" class="mb-1">Météo</h5>
                    <div v-if="event.meteo" class="horizontalScrollItem">
                        <div v-for="(index, i) in meteoIndex" :key="i" class="bg-info p-2 m-2">
                            <p class="text-affichage">{{datesDay[index].getDate()}}/{{datesDay[index].getMonth()+1}}</p>
                            <img :src="getUrlImg(event.meteo[index].weather[0].icon)" alt="Icon">
                            <p class="text-affichage">{{event.meteo[index].temp.max}}°C, {{event.meteo[index].temp.min}}°C</p>
                            <p class="text-affichage">{{toUpper(event.meteo[index].weather[0].description)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import fr_datepicker from "vuejs-datepicker/dist/locale/translations/fr"
    import VueTimepicker from 'vue2-timepicker'
    import 'vue2-timepicker/dist/VueTimepicker.css'
    import axios from "axios";
    import User from '@/user';

    export default {
        name: "Agenda",
        components: {
            Datepicker,
            VueTimepicker
        },
        data(){
            return {
                fr:fr_datepicker,
                calendar: [],
                calendarInBDD: {id : 'calendar'},
                fromTime: ((new Date()).getHours() < 10 ? '0' : '')+(new Date()).getHours()+':'+ ((new Date()).getMinutes() < 10 ? '0' : '') + (new Date()).getMinutes(),
                toTime: ((new Date()).getHours() < 10 ? '0' : '')+(new Date()).getHours()+':'+ ((new Date()).getMinutes() < 10 ? '0' : '') + (new Date()).getMinutes(),
                toggleAddEvent: false,
                toggleSeeEvent: false,
                toggleAllEvent: true,
                toggleMoreInfo: false,
                modifying: false,
                index:'',
                error: '',
                coords: '',
                locationState: '',
                departure: '',
                userid: User.profile.id,
                ourLocation: {
                    lat: '',
                    lon: ''
                },
                datesDay: [],
                meteoIndex:[],
                event: {
                    fromDate:new Date(),
                    toDate:new Date(),
                    title:undefined,
                    description:undefined,
                    address:undefined,
                    meteo:'',
                    itinerary:''
                }
            }
        },
        methods:{
            call_api_pos: function(id,eventAdress,eventDateBegin, eventDateEnd){ // BALANCE LA POS
                if(this.event.address !== undefined) {
                    this.getDaysDaily()
                    fetch('/api/widget/agenda/getAPIPosCalendar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id": id, "token": User.getToken(), "eventAdress": eventAdress})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        if (data.pos.total_results !== 0) {
                            this.event.address = data.pos.results[0].formatted
                            this.coords = data.pos.results[0].geometry

                            this.getMeteoIndex(eventDateBegin, eventDateEnd)
                            this.call_api_meteo(User.profile.id,this.coords.lat,this.coords.lng)

                            this.call_api_Itinerary(User.profile.id,this.coords.lat,this.coords.lng,this.ourLocation.lat,this.ourLocation.lon)

                            this.update_bdd_agenda(User.profile.id, this.calendar)
                        }
                    }.bind(this))
                }
            },
            call_api_meteo: function(id,coordslat, coordslng){ // BALANCE LA METEO
                if(this.meteoIndex.length !== 0) {
                    fetch('/api/widget/agenda/getAPIMeteoCalendar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id": id, "token": User.getToken(), "coordslat": coordslat, "coordslng":coordslng})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        this.event.meteo = data.mete.daily;
                    }.bind(this))
                }
            },

            call_api_Itinerary: function(id,coordslat, coordslng, ourLocationlat, ourLocationlon){ // BALANCE L'INITENAIRE
                if(this.locationState){
                    fetch('/api/widget/agenda/getAPIItineraryCalendar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"id": id, "token": User.getToken(), "coordslat": coordslat, "coordslng":coordslng, "ourLocationlat":ourLocationlat,"ourLocationlon":ourLocationlon})
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        this.event.itinerary = data.Iti
                        this.departure = new Date(this.event.fromDate.getTime()-this.event.itinerary.total_time*1000)
                    }.bind(this))
                }
            },
            update_bdd_agenda: function(id,calendar){ //PERMET DE SOIT UPDATE SA BDD, SOIT INSERER SON TIMEDATA DANS LA BDD
                fetch('/api/widget/agenda/getAgenda2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken(),"calendar":calendar})
                }).then(function (res) {
                    return res.json()
                }).then(function (data){
                }.bind(this))
            },

            call_calendar: function(id){ //REGARDE SI L'UTILISATEUR AVAIT DEJA UN CALENDAR DANS LA BDD
                fetch('/api/widget/agenda/getAgenda', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    if(data.calendar !== undefined){
                        this.calendar = JSON.parse(data.calendar[0].Calendar)
                    }

                }.bind(this))
            },

            getMeteoIndex: function(eventDateBegin, eventDateEnd) { //Regarde sur quel date on à la météo et qui est compatible avec l'évenement
                var date = new Date()
                date.setHours(23)
                date.setMinutes(59)
                var dateB = new Date()
                dateB.setHours(0)
                dateB.setMinutes(0)


                for(var i = 0; i < 7; i++){
                    if(date.getTime()-eventDateBegin.getTime() >= 0 && dateB.getTime()-eventDateEnd.getTime() <= 0){
                        this.meteoIndex.push(i)
                    }
                    date.setDate(parseInt(date.getDate()+1,10))
                    dateB.setDate(parseInt(dateB.getDate()+1,10))
                }
            },
            addData: function(){ //Affiche le menu d'éditage de l'evenement

                this.toggleAddEvent = true
                this.toggleAllEvent = false
                this.modifying = false
                this.event = {
                    fromDate:new Date(),
                    toDate:new Date(),
                    title:undefined,
                    description:undefined,
                    address:undefined,
                    meteo:'',
                    itinerary:''
                }
            },

            getData: function(){ //Récupere l'éditage de l'evenement, analyse les données, et push les événements si tout est OK dans calendar
                this.toggleSeeEvent = false
                if(this.event.fromDate !== undefined && this.fromTime !== undefined){
                    this.event.fromDate.setHours(parseInt(this.fromTime.slice(0,2),10)+2)
                    this.event.fromDate.setMinutes(parseInt(this.fromTime.slice(3,5), 10))
                }
                if(this.event.toDate !== undefined && this.toTime !== undefined){
                    this.event.toDate.setHours(parseInt(this.toTime.slice(0,2),10)+2)
                    this.event.toDate.setMinutes(parseInt(this.toTime.slice(3,5), 10))
                }
                if(this.event.toDate.getTime()-this.event.fromDate.getTime() < 0){
                    this.error = 'Problème de date'
                }
                else if(this.event.title === undefined){
                    this.error = 'Problème de titre'
                }
                else{
                    this.toggleAddEvent = false
                    if(!this.modifying){
                        this.calendar.push(this.event)
                        this.event= {
                            fromDate:undefined,
                            toDate:undefined,
                            title:undefined,
                            description:undefined,
                            address:undefined,
                            meteo:'',
                            itinerary:''
                        }
                        this.toggleAllEvent= true
                    }
                    else{
                        this.calendar[this.index] = this.event
                        this.call_api_pos(User.profile.id,this.event.address,this.event.fromDate,this.event.toDate)
                        this.toggleSeeEvent= true
                    }
                    this.error = ''
                    this.modifying= false
                    this.calendarInBDD['data'] = this.calendar
                    this.update_bdd_agenda(User.profile.id, this.calendar)
                }

            },
            modifyEvent : function (i) { //Affiche le menu d'éditage de l'evenement en mon "Modify"
                this.toggleAddEvent = true;
                this.toggleSeeEvent = false;
                this.index = i
                this.modifying = true;
                this.meteoIndex = []
                this.event = this.calendar[i]

            },
            seeEvent: function (i) { //Affiche les infos de l'evenement
                this.toggleMoreInfo = false
                this.toggleSeeEvent = true
                this.toggleAllEvent = false
                this.toggleAddEvent = false
                this.event = this.calendar[i]

                this.event.fromDate = new Date(this.event.fromDate)
                this.event.toDate = new Date(this.event.toDate)

                this.calendar[i] = this.event

                this.departure = new Date(this.event.fromDate.getTime()-this.event.itinerary.total_time*1000)
                if(!this.event.itinerary)
                    this.call_api_pos(User.profile.id,this.event.address,this.event.fromDate,this.event.toDate)
                this.index = i
            },
            goBack: function () { //Juste un retour en arrière
                if(this.modifying){
                    this.toggleSeeEvent = true
                    this.toggleAllEvent = false
                    this.toggleAddEvent = false
                    this.modifying = false
                }
                else{
                    this.toggleSeeEvent = false
                    this.toggleAllEvent = true
                    this.toggleAddEvent = false
                    this.modifying = false
                }
            },
            getUrlImg : function (a) { //recupère url img météo
                return 'https://openweathermap.org/img/wn/' + a + '@2x.png'
            },
            toUpper : function (a) { //Met la première lettre en majuscule
                return a.substring(0,1).toUpperCase() + a.substring(1)
            },
            getDaysDaily : function () { //recupère les jours pour la météo
                this.datesDay = [];
                for(var i = 0; i < 8; i++){
                    var date = new Date()
                    date.setDate(date.getDate() + i)
                    this.datesDay.push(date)
                }
            },
            getLocation : function(){ //recupère la position
                var coord = this;
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                function success(pos) {
                    var crd = pos.coords;
                    console.log('Localisation activé');
                    coord.ourLocation.lat = crd.latitude;
                    coord.ourLocation.lon = crd.longitude;
                    coord.locationState = true;
                }

                function error(err) {
                    console.warn(`ERREUR (${err.code}): ${err.message}`);
                }

                navigator.geolocation.getCurrentPosition(success, error, options);
            },
            getURLItinerary: function () { //renvoie à l'itineraire Google Map
                return `https://www.google.fr/maps/dir/${this.ourLocation.lat},${this.ourLocation.lon}/${this.coords.lat},${this.coords.lng}/`
            },
            deleteEvent : function (i) {
                this.calendar.splice(i,1)
                this.toggleAddEvent = false;
                this.toggleSeeEvent = false;
                this.toggleAllEvent = true;
                this.update_bdd_agenda(User.profile.id, this.calendar)
            }
        },
        mounted() {
            this.getLocation()
            this.call_calendar(User.profile.id)
        },
        updated() {
            this.$redrawVueMasonry();
        }
    }
</script>

<style scoped>
    .agenda {
        margin: auto;
        overflow-y: auto;
    }

    .modify{
        border-radius: 10px;
        cursor: pointer;
    }
    .modify button {
        display: none;
    }

    .horizontalScrollItem{
        display: flex;
        overflow-x: auto;
    }

    .modify:hover button{
        display: block;
    }

    .agenda::-webkit-scrollbar{
        display: none;
    }

    .itinerary{
        background-color: #457b9d;
        border-radius: 10px;
        padding: 10px;
    }

    .danger{
        color: #f3a4b5;
    }
    textarea {
        border-radius: 10px;
    }
</style>