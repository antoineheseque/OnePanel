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
                counter: '0', //Counter actuel de l'utilisateur
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
                    this.counter = data.daystreak;
                    this.$redrawVueMasonry('containerId')
                }.bind(this))
            }
        },
        mounted() {
            this.updateCounter(User.profile.id)
        }

    }


</script>
