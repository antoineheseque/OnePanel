<template>
    <div class="map">
        <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <div v-if="toggleVLille">
                <l-marker v-for="(station, index) in vlille" :key="index" :lat-lng="getMarker(station.geometry.coordinates[1],station.geometry.coordinates[0])" >
                    <l-popup>
                        <h6 class="color">Station {{station.fields.nom}}</h6>
                        <p class="color">{{station.fields.adresse}} - {{station.fields.commune}}</p>
                        <p class="color">Vélo disponible : {{station.fields.nbvelosdispo}}/{{station.fields.nbplacesdispo+station.fields.nbvelosdispo}}</p>
                        <p class="alert-info text-center color" v-if="station.fields.etatconnexion === 'CONNECTED' && station.fields.etat != 'EN MAINTENANCE'">{{station.fields.etat}}</p>
                        <p class="alert-warning text-center color" v-else-if="station.fields.etat === 'EN MAINTENANCE'">{{station.fields.etat}}</p>
                        <p class="alert-danger text-center color" v-else>{{station.fields.etat}}</p>
                    </l-popup>
                </l-marker>
            </div>
            <div v-if="toggleBusTram">
                <l-marker v-for="(station, index) in dataIlevia" :key="index" :lat-lng="getMarker(station.location[0],station.location[1])" class="bg-danger">
                    <l-popup class="bustrams-popup">
                        <h6 class="color">Arrêt {{station.name}}</h6>
                        <div  v-for="(element, index) in station.data" :key="index" class="stopInfo zoom color">
                            <p class="ml-2 color"><b>{{element.codeligne}}</b> → {{element.sensligne}}</p>
                            <p class="ml-2 color"> Prochain depart : {{convertDate(element.heureestimeedepart)}}</p>
                        </div>
                    </l-popup>
                </l-marker>
            </div>
        </l-map>
        <button class="btn btn-success flexButton" @click="updateToggleBusTram">Bus</button> <button class="btn btn-success flexButton" @click="updateToggleVlille">Vlille</button>
    </div>
</template>

<script>
    import L from 'leaflet';
    import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
    import { Icon } from 'leaflet';
    import "leaflet/dist/leaflet.css"
    import jsonArret from "../../assets/json/ilevia-physicalstop.json";
    import axios from 'axios'
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    export default {
        name: "Transport",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
        },
        data: function(){
            return{
                zoom:11.5,
                center: L.latLng(50.646885, 3.070242),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(50.629480, 3.057119),
                vlille:[],
                busTrams: '',
                ileviaStop: jsonArret,
                arret: {},
                dataIlevia:[], //a stocker dans BDD
                toggleVLille: true,
                toggleBusTram: false,
                ourLocation : {
                    lat:'',
                    lon:''
                }
            }
        },
        methods:{
            getData: function () {
                axios //Appel à l'API pour avoir la position et la disponibilité des vLilles
                    .get(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=&rows=40&facet=libelle&facet=nom&facet=commune&facet=etat&facet=type&facet=etatconnexion`)
                    .then(reponse => {
                        this.vlille = reponse.data.records;
                        console.log("API vLille")
                    })
                axios //Appel à l'API pour avoir les prochains passage de bus
                    .get(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ilevia-prochainspassages&q=&rows=10000`)
                    .then(reponse => {
                        this.busTrams = reponse.data.records;
                        console.log("API passage Bus")
                        this.setDataAndName()
                    })

            },
            setDataAndName: function(){
                for(var index in this.busTrams){
                    if(!(this.busTrams[index].fields.nomstation in this.arret)){
                        this.arret[this.busTrams[index].fields.nomstation] = new Object();
                        this.arret[this.busTrams[index].fields.nomstation]['data'] = new Array(this.busTrams[index].fields)
                        this.arret[this.busTrams[index].fields.nomstation]['name'] = this.busTrams[index].fields.nomstation
                    }
                    else{
                        this.arret[this.busTrams[index].fields.nomstation]['data'].push(this.busTrams[index].fields);
                    }
                }
                this.setLocation()
                this.sortData()
            },
            setLocation: function(){
                for(var index in this.ileviaStop){
                    if((this.ileviaStop[index].fields.commercialstopname in this.arret)){
                        this.arret[this.ileviaStop[index].fields.commercialstopname]['location'] = this.ileviaStop[index].fields.geo
                    }
                }
            },
            sortData : function() {
                for(var i in this.arret){
                    if(this.arret[i].location != undefined){
                        this.arret[i].data.sort(this.sortByDate)
                        this.dataIlevia.push(this.arret[i])
                    }
                }
            },
            sortByDate: function(a, b){
                const dateA = a.heureestimeedepart.toUpperCase();
                const dateB = b.heureestimeedepart.toUpperCase();

                let comparison = 0;
                if (dateA > dateB) {
                    comparison = 1;
                } else if (dateA < dateB) {
                    comparison = -1;
                }
                return comparison;
            },

            getMarker: function (lat, lon) {
                return L.latLng(lat, lon)
            },
            convertDate: function (a) {
                var date = new Date(a)
                date.toDateString()
                if(date.getMinutes() < 10){
                    return date.getHours() + 'h0' + date.getMinutes() + ' le ' + date.getDate() + '/' + (date.getMonth()+1)
                }
                else {
                    return date.getHours() + 'h' + date.getMinutes() + ' le ' + date.getDate() + '/' + (date.getMonth()+1)
                }

            },
            updateToggleVlille : function () {
                this.toggleVLille = true
                this.toggleBusTram = false
            },
            updateToggleBusTram : function () {
                this.toggleVLille = false
                this.toggleBusTram = true
            },
            getLocation : function(){
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
        },
        mounted() {
            this.getData()

        }
    }
</script>

<style scoped>
    .map{
        height: 45vh;
        width: 45vh;
        margin: auto;
        color: blue;
    }
    .color {
        color: black;
    }
    .flexButton{
        float: right;
    }
    .bustrams-popup {
        display: block;
        max-height: 300px;
        overflow-y: auto;
        overflow-x: hidden;

    }
    .zoom {
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
    }

    .zoom:hover{
        -webkit-transform: scale(1.03);
        transform: scale(1.03);
    }

    .bustrams-popup::-webkit-scrollbar{
        display: none;
    }

    .stopInfo {
        background-color: #ffcea9;
        border-radius: 8px;
    }
</style>