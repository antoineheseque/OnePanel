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
                counter: '0', //Counter actuel de l'utilisateur
            }
        },
        methods:{
            updateCounter: function(id){ //Récupère les donnnées
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
                }.bind(this))
            }
        },
        mounted() {
            this.updateCounter(User.profile.id)
        },
        updated() {
            this.$redrawVueMasonry()
        }

    }


</script>
