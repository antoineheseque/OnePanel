<template>
    <div class="pokemon">
        <div class="mb-5">
            <button class="btn btn-danger" @click="updatePokedex">Pokedex</button>
            <button class="btn btn-dark" @click="seeMyPokemons">Boite de pokemon</button>
        </div>
        <div v-if="togglePokedex">
            <button class="btn btn-success" @click="goBack">Retour</button>
            <div v-for="(pokedex, i) in pokedexCatch" :key="i" class="onePokemon">
                <p>{{pokedex.id}}</p>
                <p>{{pokedex.name}}</p>
                <img :src="pokedex.img" alt="pokeIcon" class="icon">
            </div>
        </div>
        <div v-if="togglePC">
            <button class="btn btn-success" @click="goBack">Retour</button>
            <div class="test m-1">
                <div v-for="(pokeCatch, i) in pokemonCatch" :key="i" class="onePokemon">
                    <table class="table">
                        <tr>
                            <td><p>{{pokeCatch.id}}</p></td>
                            <td><p>{{pokeCatch.name}}</p></td>
                        </tr>
                        <tr>
                            <td colspan="2"><img :src="pokeCatch.img" alt="pokeIcon" class="pokeIcon"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="toggleMenu" class="newPokemon">
            <p>{{pokemonOfTheDay.name}}</p>
            <img :src="pokemonOfTheDay.img" alt="pokeIcon" >
            <button class="btn btn-success" v-if="toggleNewPokemon" @click="newPokemon">Enregistrer</button>
            <button class="btn btn-success" v-if="!toggleNewPokemon" disabled>Enregistrer</button>
        </div>
    </div>
</template>

<script>
    import pokemon from "../../assets/json/pokemonName.json";
    import User from '@/user';

    export default {
        name: "Poke",
        data(){
            return{
                pokemonCatch:[],
                pokedexCatch:[],
                togglePokedex: false,
                togglePC: false,
                toggleMenu: true,
                toggleNewPokemon:true,
                namePokemon: pokemon,
                pokemonOfTheDay: {},
                lastUpdate: ''
            }
        },
        methods:{
            call_pokemonCatch: function(id){ //REGARDE SI L'UTILISATEUR AVAIT DEJA UN TIMEDATA DANS LA BDD
                fetch('/api/widget/pokemon/getPokemon', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.lastUpdate=data.pokemoncatch[0].date_pokemon
                    var pokemon_day = {}
                    var ready = false
                    if(this.lastUpdate.slice(0,10) === (new Date()).toISOString().slice(0,10)){
                        this.toggleNewPokemon = false

                        var poke_parse =JSON.parse(data.pokemoncatch[0].pokemon_catch)
                        var length = (poke_parse).length-1;
                        ready = true
                        pokemon_day={
                            id:0,
                            name :poke_parse[length].name,
                            img :poke_parse[length].img
                        }
                        this.pokemonOfTheDay = pokemon_day
                    }
                    if(JSON.parse(data.pokemoncatch[0].pokemon_catch).length){
                        this.pokemonCatch = JSON.parse(data.pokemoncatch[0].pokemon_catch)
                        this.getPokemon()
                        if(ready){
                            this.pokemonOfTheDay = pokemon_day
                        }
                    }
                }.bind(this))
            },
            update_bdd_pokemon: function(id,PokemonCatch,lastUpdate){ //PERMET DE SOIT UPDATE SA BDD, SOIT INSERER SON TIMEDATA DANS LA BDD
                fetch('/api/widget/pokemon/getPokemon2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken(),"PokemonCatch":PokemonCatch, "lastUpdate":lastUpdate})
                }).then(function (res) {
                    return res.json()
                }).then(function (data){
                    const message = data.message
                }.bind(this))
            },
            randomPokeid: function(){ //Récupère un id aléatoire en 0 et 151
                return (Math.floor(Math.random()*151))
            },
            getPokedex: function(){ //Génère le pokedex
                if (!this.pokemonCatch.length){
                    for(var i = 0; i < 151; i++) {
                        var pokedex={id:i+1, name:'inconnu', img:'https://www.pokepedia.fr/images/f/f7/Sprite_%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F_RS.png'}
                        this.pokedexCatch.push(pokedex)
                    }
                }
                for(var index in this.pokemonCatch){
                    this.pokedexCatch[this.pokemonCatch[index].id-1] = {id:this.pokemonCatch[index].id, name:this.pokemonCatch[index].name, img:this.pokemonCatch[index].img}
                }
            },

            updatePokedex : function(){
                this.togglePokedex=true
                this.togglePC=false
                this.toggleMenu=false
            },
            goBack: function() { //Retour
                this.togglePokedex=false
                this.togglePC=false
                this.toggleMenu=true
            },
            getPokemon: function(){ //Récupère un pokèmon
                var id = this.randomPokeid();
                var pok =this.namePokemon.results[id].name
                this.pokemonOfTheDay={id:id+1, name:pok,img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(id+1)+'.png'}
                for(var j=this.pokemonCatch.length-1 ; j>0;j--){
                    if (this.pokemonCatch[j].id<this.pokemonCatch[j-1].id){
                        var echange ={id: this.pokemonCatch[j].id, name:this.pokemonCatch[j].name, img:this.pokemonCatch[j].img}
                        this.pokemonCatch[j]={id:this.pokemonCatch[j-1].id,name:this.pokemonCatch[j-1].name, img:this.pokemonCatch[j-1].img};
                        this.pokemonCatch[j-1]={id: echange.id, name: echange.name, img:echange.img};
                    }
                }
                this.getPokedex()
            },
            seeMyPokemons:function(){ //Affiche tous les pokémons capturés
                this.togglePokedex=false
                this.togglePC=true
                this.toggleMenu=false
            },
            newPokemon : function () { //comparer la date du dernier ajout de pokemon
                if(this.lastUpdate.slice(0,10) !== (new Date()).toISOString().slice(0,10)){
                    this.lastUpdate= (new Date()).toISOString()
                    this.pokemonCatch.push(this.pokemonOfTheDay)
                    this.toggleNewPokemon = false
                    this.update_bdd_pokemon(User.profile.id,this.pokemonCatch, this.lastUpdate)
                    this.getPokedex()
                }else{
                    this.toggleNewPokemon = false
                }
            }
        },
        mounted(){
            this.getPokemon()
            this.call_pokemonCatch(User.profile.id)
        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>

<style scoped>
    .icon{
        width: 40px;
        height: auto;
    }

    .pokemon{
        width: auto;
        height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .onePokemon{
        display: flex;
        flex: 1 50px;
        flex-flow: row wrap;
        justify-content: space-around;
        width: auto;
        height: auto;
    }
    .test{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: #457B9D;
    }

    .newPokemon:hover{
        animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>