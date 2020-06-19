<template>
    <div class="domaine container">
        <button @click="getDomaine" class="btn btn-success">Votre domaine de professionnalisation</button>
        <br>
        <p style="font-size: 20px" class="text-center">{{domaine}}</p>
    </div>
</template>

<script>
    export default {
        name: "Master",
        data(){
            return{
                domaine:'',
                domaines:['Electronique embarquée', 'Objets connectés', 'Robotique mobile', 'Intelligence artificielle', 'Bio-Nanotechs'
                ,'Développement logiciel et Jeux vidéo', 'Big Data', 'Cybersécurité', 'Informatique et Finance', 'Ingénieur d\'affaires']
            }
        },
        methods:{
            randomNumber: function(){ //Nombre aléatoire entre 0 et 9
                return (Math.floor(Math.random()*9))
            },
            getDomaine: function(){ //Récupère un domaine
                this.domaine = this.domaines[this.randomNumber()]
            },
        },
        mounted() {

        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>

<style scoped>
    .domaine{
        height: auto;
        max-width: 100%;
        overflow-x: hidden;
        margin: auto;
    }
</style>