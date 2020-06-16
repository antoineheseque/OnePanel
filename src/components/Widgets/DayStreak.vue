<template>
    <div class="daystreak">
        <h4 class="text-center">Vous vous êtes connecté {{counter}} jour(s) d'affilé(s)</h4>
    </div>
</template>

<script>
    const axios = require('axios');
    import User from '@/user';


    export default {

        name: "DayStreak",
        data() {
            return {
                //dateInBDD: '', //Dernière date de connexion de l'utilisateur
                counter: '', //Counter actuel de l'utilisateur
                //date_actuelle: ''
            }
        },
        methods:{
            updateCounter: function(id){
                fetch('/api/widget/dayStreak/getDayStreak', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    console.log("data.daystreak=")
                    console.log(data.daystreak)

                    this.counter = data.daystreak;
                }.bind(this))
            }
        },
        mounted() {
            this.updateCounter(User.profile.id)
        }

    }


</script>








    /*hfdunter: function() {



               call_streak().then((res) => {
                   this.dateInBDD=(res.date).substring(0,10) //

                   console.log("\nthis.dateInBDD=")
                   console.log(this.dateInBDD)

                   console.log("\nthis.date_actuelle1=")
                   console.log(this.date_actuelle)

                   this.counter=res.Counter

                   console.log("\nthis.date_actuelle2=")
                   this.date_actuelle = ((this.date_actuelle).toISOString()).slice(0, 10)
                   console.log(this.date_actuelle)

                   if ((this.date_actuelle).slice(0, 7) === (this.dateInBDD).slice(0, 7) && Number((this.date_actuelle).slice(8, 10)) - 1 === Number((this.dateInBDD).slice(8, 10))) {
                       console.log("\nupdateCounter OK")
                       return true
                   }else{
                       const id_user = User.profile.id;
                       axios.post('/api/widget/dayStreak/resetDayStreak',{
                           method: 'POST',
                           data:id_user
                       })
                       console.log("reset du counter")
                   }
               })

           }*/



   /* function call_streak(){
        const id_user = User.profile.id;
        return new Promise((r) => {
            axios.post('/api/widget/dayStreak/getDayStreak',{
                method: 'POST',
                data:id_user
            }).then(function(res) {
                r((res.data.DateCounter))
            })
        });
    }*/


    /*function updateCounter() {
        console.log("\ndateInBDD=")
        console.log(this.dateInBDD)
        this.dateInBDD = this.dateInBDD.toISOString().slice(0, 10)
        this.date = this.date.toISOString().slice(0, 10)
        if (this.date.slice(0, 7) === this.dateInBDD.slice(0, 7) && Number(this.date.slice(8, 10)) - 1 === Number(this.dateInBDD.slice(8, 10))) {
            console.log("\nupdateCounter =")
            console.log(true)
            return true
        }
    }*/

