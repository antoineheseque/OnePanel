<template>
    <div class="appMeteo">
        <p v-if="!locationState">Localisation non autorisé</p>
        <div class="row m-0">
            <button class="btn btn-warning btn-sm" @click="goBackToLocation" v-if="!toggleResultMoreInfo && method === 'position'">⇐ Retour</button>
            <button class="btn btn-success btn-sm" @click="updateToggleResultLocationDaily" v-if="toggleResultPositionToday">Géolocalisation</button>
            <div class="btn-group-sm" v-else>
                <button class="btn btn-warning" @click="goBack" v-if="toggleResultMoreInfo">⇐ Retour</button>
                <button class="btn btn-success" @click="updateToggleResultLocationHourly" v-if="!toggleResultMoreInfo">48 heures</button>
                <button class="btn btn-success" @click="updateToggleResultLocationDaily" v-if="!toggleResultMoreInfo">7 jours</button>
                <button class="btn btn-success" @click="updateToggleResultPositionToday" v-if="!toggleResultMoreInfo && method === 'location' ">Trouver une ville</button>
            </div>
        </div>
        <div class="form-groupe m-1" v-if="toggleResultPositionToday">
            <label for="position">Entrez le nom d'une ville</label>
            <input type="text" id="position" class="form-control" v-model="requete" @keypress.enter="getCoords">
            <button type="button" class="btn btn-success btn-sm" @click="getCoords" v-if="requete">Valider</button>
        </div>

        <div class="m-2 horizontalScrollItems" v-if="toggleResultLocationHourly">
            <div class="bg-info p-2 m-2 horizontalScrollItem" v-for="(weatherData, i) in temps48hours" :key="i" @click="updateToggleResultMoreInfo(i)">

                <p class="text-affichage hours">{{datesHourly[i].getHours()}}h - {{datesHourly[i].getDate()}}/{{datesHourly[i].getMonth()+1}}</p>
                <img :src="getUrlImg(weatherData.weather[0].icon)" alt="Icon" class="zoom">
                <p class="text-affichage">{{Math.round(weatherData.temp)}}°C</p>
                <p class="text-affichage case">{{toUpper(weatherData.weather[0].description)}}</p>
            </div>
        </div>
        <div class="m-2 horizontalScrollItems" v-if="toggleResultLocationDaily">
            <div class="bg-info p-2 m-2 horizontalScrollItem" v-for="(weatherData, i) in temps7days" :key="i" @click="updateToggleResultMoreInfo(i)">
                <p class="text-affichage hours">{{datesDay[i].getDate()}}/{{datesDay[i].getMonth()+1}}</p>
                <img :src="getUrlImg(weatherData.weather[0].icon)" alt="Icon" class="zoom">
                <p class="text-affichage">{{Math.round(weatherData.temp.max)}}°C, {{Math.round(weatherData.temp.min)}}°C</p>
                <p class="text-affichage case">{{toUpper(weatherData.weather[0].description)}}</p>
            </div>
        </div>
        <div class="m-2" v-if="toggleResultMoreInfo && temp.toggleResultLocationDaily">
            <div class="p-2 m-2 bg-info">
                <p class="text-affichage">{{datesDay[index].getDate()}}/{{datesDay[index].getMonth()+1}}</p>
                <img :src="getUrlImg(temps7days[index].weather[0].icon)" alt="Icon" class="img">
                <p class="text-affichage m-0">Taux humidité : {{temps7days[index].humidity}}%</p>
                <p class="text-affichage m-0">UV : {{temps7days[index].uvi}}</p>
                <p class="text-affichage m-0">Vent : {{temps7days[index].wind_deg}}° / {{temps7days[index].wind_speed}}m/s</p>
                <p class="text-justify m-0">Lever du Soleil : {{timestampToDate(temps7days[index].sunrise).hour}}h{{timestampToDate(temps7days[index].sunrise).minute}}</p>
                <p class="text-justify m-0">Coucher du Soleil : {{timestampToDate(temps7days[index].sunset).hour}}h{{timestampToDate(temps7days[index].sunset).minute}}</p>
            </div>
        </div>
        <div class="m-2 container" v-if="toggleResultMoreInfo && temp.toggleResultLocationHourly">
            <div class="p-2 m-2 bg-info">
                <p class="text-affichage">{{datesHourly[index].getHours()}}h - {{datesHourly[index].getDate()}}/{{datesHourly[index].getMonth()+1}}</p>
                <img :src="getUrlImg(temps48hours[index].weather[0].icon)" alt="Icon" class="img">
                <p class="text-justify m-0">Ressenti : {{temps48hours[index].feels_like}}°C</p>
                <p class="text-affichage m-0">Taux humidité : {{temps48hours[index].humidity}}%</p>
                <p class="text-affichage m-0">Vent : {{temps48hours[index].wind_deg}}° / {{temps48hours[index].wind_speed}}m/s</p>
            </div>
        </div>

        <div class="mx-3 mb-5 citiesList" v-if="toggleResultPositionToday">
            <div class="d-flex flex-column bg-info h5 p-2 rounded city" v-for="(coordCity,i) in coordsCity" :key="i" @click="getLatLon(i)">{{coordCity.formatted}}</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "meteo",
        data(){
            return{
                requete: '',
                cityName: '',
                method: undefined,
                api_code: 'e77b050b2d9e74f5008e2cc553cf92b9',
                locationState: false,
                temps7days:[],
                temps48hours:[],
                tempsPosition:'',
                coordsCity: [],
                datesDay: [],
                datesHourly: [],
                lat: '',
                lon: '',
                index : '',
                toggleResultPositionToday : false,
                toggleResultLocationDaily : false,
                toggleResultLocationHourly : true,
                toggleResultMoreInfo : false,
                resultPosition: false,
                temp: {},
                daysLength:"sur 48 heures",
            }
        },
        methods:{
            goMeteoLocation7Days: function(){
                axios //Appel à l'API pour avoir toutes les infos sur les 7 prochains jours et les 48 prochaines heures
                    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,minutely&appid=${this.api_code}&units=metric&lang=fr`)
                    .then(reponse => {
                        this.temps7days = reponse.data.daily;
                        this.temps48hours = reponse.data.hourly;
                    })
                axios //Appel à l'API pour avoir le nom de la ville selon la position
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.api_code}&units=metric&lang=fr`)
                    .then(reponse => {
                        this.cityName = reponse.data.name;
                        this.sendInformationsToParent()
                    })
            },
            getCoords: function(){ //Récupere les coordonnées des villes
                axios
                    .get(`https://api.opencagedata.com/geocode/v1/json?q=${this.requete}&key=8683c1d8657d40069fd08852599feaef`)
                    .then(reponse => {
                        this.coordsCity = reponse.data.results;
                        this.resultPosition = true;
                        this.temp = {
                            lat : this.lat,
                            lon : this.lon,
                            temps48hours: this.temps48hours,
                            temps7days: this.temps7days,
                            cityName: this.cityName,
                        }
                        this.sendInformationsToParent()
                        console.log('API conversion Géo OK');
                    })
            },
            getLatLon: function(i){ //Récupère latitude longitude d'une position
                this.lat = this.coordsCity[i].geometry.lat;
                this.lon = this.coordsCity[i].geometry.lng;
                this.method = 'position';
                this.updateToggleResultLocationDaily();
                this.goMeteoLocation7Days();
            },
            getLocation : function(){ //Récupère la localisation
                var coord = this;
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                function success(pos) {
                    var crd = pos.coords;
                    coord.lat = crd.latitude;
                    coord.lon = crd.longitude;
                    coord.locationState = true;
                    coord.goMeteoLocation7Days();
                    coord.getDaysDaily();
                    coord.getDaysHourly();
                    coord.method = 'location'
                }

                function error(err) {
                    console.warn(`ERREUR (${err.code}): ${err.message}`);
                }

                navigator.geolocation.getCurrentPosition(success, error, options);
            },
            getDaysHourly : function () { //Récupère les 48 prochaines heures de météo
                this.datesHourly = [];
                for(var i = 0; i < 48; i++){
                    var date = new Date()
                    date.setHours(date.getHours() + i)
                    this.datesHourly.push(date)
                }
            },
            getDaysDaily : function () { //Récupère les dates des 7 prochains jours
                this.datesDay = [];
                for(var i = 0; i < 8; i++){
                    var date = new Date()
                    date.setDate(date.getDate() + i)
                    this.datesDay.push(date)
                }
            },
            getUrlImg : function (a) { //Récupère les logos de la météo
                return 'https://openweathermap.org/img/wn/' + a + '@2x.png'
            },
            updateToggleResultLocationHourly : function () { //Affiche météo par heure selon la localisation
                this.toggleResultLocationHourly = true;
                this.toggleResultPositionToday = false;
                this.toggleResultLocationDaily = false;
                this.resultPosition = false;
                this.toggleResultMoreInfo = false;
                this.daysLength = "sur 48 heures"
                this.sendInformationsToParent()
            },
            updateToggleResultLocationDaily : function () { //Affiche météo d'une position journalière
                this.toggleResultLocationHourly = false;
                this.toggleResultPositionToday = false;
                this.toggleResultLocationDaily = true;
                this.resultPosition = false;
                this.daysLength = "sur 7 jours"
                this.toggleResultMoreInfo = false;
                this.sendInformationsToParent()
            },
            updateToggleResultPositionToday : function (i) { //Affiche pour trouver une ville avec la barre de recherche
                this.toggleResultLocationHourly = false;
                this.toggleResultPositionToday = true;
                this.toggleResultLocationDaily = false;
                this.toggleResultMoreInfo = false;
                this.index = i;
            },
            updateToggleResultMoreInfo : function (i) { //Affiche le menu + d'info
                this.temp = {
                    toggleResultLocationHourly : this.toggleResultLocationHourly,
                    toggleResultPositionToday : this.toggleResultPositionToday,
                    toggleResultLocationDaily : this.toggleResultLocationDaily
                }
                this.daysLength = ""
                this.toggleResultLocationHourly = false;
                this.toggleResultPositionToday = false;
                this.toggleResultLocationDaily = false;
                this.toggleResultMoreInfo = true;
                this.index = i;
            },
            toUpper : function (a) { //Première lettre en majuscule
                return a.substring(0,1).toUpperCase() + a.substring(1)
            },
            timestampToDate : function (unix_timestamp) { //Convertion timestamp -> en date
                var date = new Date(unix_timestamp * 1000);
                return {
                    hour : date.getHours(),
                    minute : date.getMinutes()
                }
            },
            goBack(){ //Retour
                this.toggleResultLocationHourly = this.temp.toggleResultLocationHourly;
                this.toggleResultPositionToday = this.temp.toggleResultPositionToday;
                this.toggleResultLocationDaily = this.temp.toggleResultLocationDaily;
                this.toggleResultMoreInfo = false;
            },
            goBackToLocation(){ //Retour à la météo position
                this.lat = this.temp.lat;
                this.lon = this.temp.lon;
                this.temps7days = this.temp.temps7days;
                this.temps48hours = this.temp.temps48hours;
                this.cityName = this.temp.cityName
                this.method = 'location'
                this.locationState = true;
                this.daysLength = "sur 48 heures"
                this.sendInformationsToParent()
                this.updateToggleResultLocationHourly()
            },
            sendInformationsToParent(){ //Change le titre du widget
                this.$emit('setInformations', this.cityName + " " + this.daysLength)
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getLocation();
            })
        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>

<style>
    .appMeteo {
        height: auto;
        margin: auto;
    }
    .hours {
        font-size: 15px;
    }
    .case {
        table-layout: fixed;
        width: 5em;
        max-height: 4.5em;
        border-radius: 5px;

    }
    .horizontalScrollItems{
        display: flex;
        overflow-x: auto;
        cursor: pointer;
    }
    .citiesList{
        overflow-y: auto;
        height: 12.5em;
        padding-right: 5px;
    }
    .zoom{
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }
    .zoom:hover{
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    .city{
        cursor: pointer;
    }
</style>