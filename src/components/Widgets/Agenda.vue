<template>
    <div class="agenda">
        <button class="btn btn-success m-2" @click="addData" v-if="!toggleAddEvent && !toggleSeeEvent">Ajouter un event</button>
        <div class="event" v-if="toggleAddEvent">
            <button class="btn btn-warning mb-3" @click="goBack">Retour</button>
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
                <input type="text" class="form-control" id="title" placeholder="Titre" v-model="event.title" value="Mon événement">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" rows="3" v-model="event.description"></textarea>
            </div>
            <div class="form-group">
                <label for="adress">Adresse</label>
                <input type="text" class="form-control" id="adress" placeholder="Adresse" v-model="event.address">
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
                <p><b>Du :</b> {{event.fromDate.toLocaleString('fr-FR', { timeZone: 'UTC' })}} → {{event.toDate.toLocaleString('fr-FR', { timeZone: 'UTC' })}} à {{event.address}}</p>
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
            getMeteoAndItenerary : function(eventDateBegin, eventDateEnd) { //Récup position de l'évent + appel météo et itineraire si OK
                if(this.event.address != undefined){
                    this.getDaysDaily()
                    axios
                        .get(`https://api.opencagedata.com/geocode/v1/json?q=${this.event.address}&key=8683c1d8657d40069fd08852599feaef`)
                        .then(reponse => {
                            if(reponse.data.total_results != 0){
                                console.log("API Coords agenda OK")
                                this.event.address = reponse.data.results[0].formatted
                                this.coords = reponse.data.results[0].geometry
                                this.getMeteoIndex(eventDateBegin, eventDateEnd)
                                this.getMeteo()
                                this.getItinerary()
                            }
                        })
                }
            },
            getItinerary : function () { //Récup Temps de trajet + distance
                if(this.locationState){
                    axios
                        .get(`https://maps.open-street.com/api/route/?origin=${this.ourLocation.lat.toFixed(10)},${this.ourLocation.lon.toFixed(10)}&destination=${this.coords.lat},${this.coords.lng}&mode=driving&key=1b83806fc9844c5ab47c094a3b8007e0`)
                        .then(reponse => {
                            this.event.itinerary = reponse.data
                            this.departure = new Date(this.event.fromDate.getTime()-this.event.itinerary.total_time*1000)
                            console.log("API itineraire agenda OK")
                        })
                }
            },
            getMeteo : function () { //Récup Météo
                if(this.meteoIndex.length != 0) {
                    axios //Appel à l'API pour avoir toutes les infos sur les 7 prochains jours
                        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.coords.lat}&lon=${this.coords.lng}&exclude=current,minutely,hourly&appid=e77b050b2d9e74f5008e2cc553cf92b9&units=metric&lang=fr`)
                        .then(reponse => {
                            this.event.meteo = reponse.data.daily;
                            console.log('API météo agenda OK');
                        })
                }
            },

            getMeteoIndex: function(eventDateBegin, eventDateEnd) { //Regarde sur quel date on à la météo et qui est compatible avec l'évenement
                var date = new Date()
                date.setHours(23)
                date.setMinutes(59)
                for(var i = 0; i < 7; i++){
                    if(date.getTime()-eventDateBegin.getTime() >= 0 && date.getTime()-eventDateEnd.getTime() <= 0){
                        this.meteoIndex.push(i)
                    }
                    date.setDate(parseInt(date.getDate()+1,10))
                }
            },

            addData: function(){ //Affiche le menu d'éditage de l'evenement
                this.toggleAddEvent = true
                this.toggleAllEvent = false
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
                if(this.event.fromDate != undefined && this.fromTime != undefined){
                    this.event.fromDate.setHours(parseInt(this.fromTime.slice(0,2),10)+2)
                    this.event.fromDate.setMinutes(parseInt(this.fromTime.slice(3,5), 10))
                }
                if(this.event.toDate != undefined && this.toTime != undefined){
                    this.event.toDate.setHours(parseInt(this.toTime.slice(0,2),10)+2)
                    this.event.toDate.setMinutes(parseInt(this.toTime.slice(3,5), 10))
                }
                if(this.event.toDate.getTime()-this.event.fromDate.getTime() < 0){
                    this.error = 'Problème de date'
                }
                else if(this.event.title == undefined){
                    this.error = 'Problème de titre'
                }
                else{
                    this.toggleAddEvent = false
                    if(!this.modifying)
                        this.calendar.push(this.event)
                    else
                        this.calendar[this.index] = this.event
                    if(this.modifying){
                        this.toggleSeeEvent= true
                    }
                    else {
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
                    this.error = ''
                    this.modifying= false
                    this.getMeteoAndItenerary(this.event.fromDate,this.event.toDate)
                    this.calendarInBDD['data'] = this.calendar
                    //console.log("this.calendarInBDD ->")
                    //console.log(this.calendarInBDD)
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
                this.departure = new Date(this.event.fromDate.getTime()-this.event.itinerary.total_time*1000)
                if(!this.event.itinerary)
                    this.getMeteoAndItenerary(this.event.fromDate, this.event.toDate)
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
        },
        mounted() {
            this.getLocation()
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