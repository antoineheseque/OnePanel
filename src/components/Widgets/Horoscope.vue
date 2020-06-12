<template>
    <div class="horoscope mt-5">
        <div>
            <h3>Horoscope de {{astrologicalSign}}</h3>
            <p>du {{dateOfToday.toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}}</p>
            <p class="m-2 text-justify">
                <b>Amour :</b>  {{astrologicalHoro[astrologicalSign.toLowerCase()]['Amour']}}
            </p>
            <p class="m-2 text-justify">
                <b>Santé :</b>  {{astrologicalHoro[astrologicalSign.toLowerCase()]['Santé']}}
            </p>
            <p class="m-2 text-justify">
                <b>Travail :</b>  {{astrologicalHoro[astrologicalSign.toLowerCase()]['Travail']}}
            </p>

        </div>

    </div>
</template>


<script>
    import json from "../../assets/json/Horoscope.json";
    import User from '@/user';

    export default {
        name: "Horoscope",
        data(){
            return {
                txt : json,
                base: {
                    Amour : 'Vous <verbeA> <complementAmour>',
                    Travail : 'Vous <verbeT> <complementTravail>',
                    Santé : 'Vous <verbeS> <complementSanté>',
                },
                dateOfToday: new Date(),
                dateOfBirth : User.profile.birthdayDate,//new Date(1999,11,4), //requete bdd user pour la date de naissance
                astrologicalSign: '',
                astrologicalHoro:{
                    date: '',
                    verseau: '',
                    poissons: '',
                    belier: '',
                    taureau: '',
                    gemeaux: '',
                    cancer: '',
                    lion: '',
                    vierge: '',
                    balance: '',
                    scorpion: '',
                    sagittaire: '',
                    capricorne: ''
                }
            }
        },
        methods : {
            getRandom: function (max) {
                return parseInt(Math.random() * (max))
            },
            randomizeTxt: function (txt) {
                var regex = /<[a-zA-Z0-9]*>/;
                while(regex.test(txt)){
                    var str = (regex[Symbol.match](txt))[0]
                    if(this.txt[str] != undefined) {
                        var otherStr = this.txt[str][this.getRandom(this.txt[str].length)];
                        txt = txt.replace(regex, otherStr);
                    }
                    else{
                        txt = txt.replace(/<[a-zA-Z0-9]*>/, '►UNDEFINED‼◄');
                    }
                }
                return txt
            },
            call_horoscope: function(){
                fetch('/api/widget/horoscope/getHoroscope', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.astrologicalHoro.date = this.dateOfToday
                    this.astrologicalHoro.verseau = data.horoscope,
                    this.astrologicalHoro.poissons = data.horoscope,
                    this.astrologicalHoro.belier =  data.horoscope,
                    this.astrologicalHoro.taureau = data.horoscope,
                    this.astrologicalHoro.gemeaux = data.horoscope,
                    this.astrologicalHoro.cancer = data.horoscope,
                    this.astrologicalHoro.lion = data.horoscope,
                    this.astrologicalHoro.vierge = data.horoscope,
                    this.astrologicalHoro.balance = data.horoscope,
                    this.astrologicalHoro.scorpion = data.horoscope,
                    this.astrologicalHoro.sagittaire = data.horoscope,
                    this.astrologicalHoro.capricorne = data.horoscope
                }.bind(this))
            },
            /*setAstrologicalHoro: function () {
                    this.astrologicalHoro.date = this.dateOfToday
                    this.astrologicalHoro.verseau = this.setHoro(),
                    this.astrologicalHoro.poissons = this.setHoro(),
                    this.astrologicalHoro.belier =  this.setHoro(),
                    this.astrologicalHoro.taureau = this.setHoro(),
                    this.astrologicalHoro.gemeaux = this.setHoro(),
                    this.astrologicalHoro.cancer = this.setHoro(),
                    this.astrologicalHoro.lion = this.setHoro(),
                    this.astrologicalHoro.vierge = this.setHoro(),
                    this.astrologicalHoro.balance = this.setHoro(),
                    this.astrologicalHoro.scorpion = this.setHoro(),
                    this.astrologicalHoro.sagittaire = this.setHoro(),
                    this.astrologicalHoro.capricorne = this.setHoro()
            }*/
        },
        mounted() {
            this.call_horoscope();
            //this.setAstrologicalHoro();
            console.log(this.astrologicalHoro)
        }
    }


    export function getAstrologicalSign() {
        var month = (this.dateOfBirth.getMonth());
        var day = this.dateOfBirth.getDate();
        if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) { //30
            this.astrologicalSign = 'Verseau'
        } else if ((month == 2 && day >= 20) || (month == 3 && day <= 20)) { //30
            this.astrologicalSign = 'Poissons'
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) { //31
            this.astrologicalSign = 'Bélier'
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 21)) { //
            this.astrologicalSign = 'Taureau'
        } else if ((month == 5 && day >= 22) || (month == 6 && day <= 21)) {
            this.astrologicalSign = 'Gémeaux'
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            this.astrologicalSign = 'Cancer'
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            this.astrologicalSign = 'Lion'
        } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            this.astrologicalSign = 'Vierge'
        } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            this.astrologicalSign = 'Balance'
        } else if ((month == 10 && day >= 23) || (month == 11 && day <= 22)) {
            this.astrologicalSign = 'Scorpion'
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            this.astrologicalSign = 'Sagittaire'
        } else if ((month == 11 && day >= 22) || (month == 1 && day <= 20)) {
            this.astrologicalSign = 'Capricorne'
        }
    }

    export function setHoro() {
        return {
            Amour: this.randomizeTxt(this.base.Amour),
            Travail: this.randomizeTxt(this.base.Travail),
            Santé: this.randomizeTxt(this.base.Santé)
        }
    }

</script>

<style scoped>
    .horoscope {
        margin: auto;
        width: 550px;
        background: indianred;
    }
</style>