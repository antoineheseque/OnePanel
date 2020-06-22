<template>
    <div>
        <div class="form-group m-1" @keypress.enter="addPackage">
            <label for="nomColis">Nom du Colis: </label>
            <input type="text" id="nomColis" class="form-control" v-model="tempPackageID">

            <button class="btn btn-primary" @click="addPackage" >Suivre le colis</button>
            <div v-if="isLoading">
                <h4>Chargement ...</h4>
            </div>
            <div v-else v-for="(packa, i) in packages" :key="i" class="m-1">
                <div class="row">
                    <p class="col-md-8"><a :href="packa.url">{{packa.name}}</a> -> {{packa.status}}</p>
                    <div class="col-md-4"><button class="btn btn-sm" @click="removePackage(packa.id)" >Supprimer</button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: "suiviColis",
        data(){
            return {
                packages: [
                    {id: "FV343883482JB", status: "Inconnu", url:"#",name:""},
                    {id: "4P36275770836", status: "Inconnu", url:"#",name:""}
                ],
                tempPackageID:"",
                isLoading:true
            }
        },
        methods:{
            addPackage: function(){
                if(this.tempPackageID.length > 0){
                    this.packages.push({id:this.tempPackageID,status: "Inconnu",url:"",name:""})
                    this.tempPackageID = ""

                    // On actualise la liste
                    this.updateList()
                }

            },
            removePackage: function(IDPackage){
                var index = this.packages.findIndex(element => element.id === IDPackage)
                this.packages.splice(index,1)

                this.updateList()
            },
            updateList: function () {
                // Envoyer la liste (mise a jour) à la BDD
            },
            getData(){
                // Récupère la liste des colis de la BDD avec actualisation
                fetch('/api/widget/laposte/getData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({packages:this.packages})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.packages = JSON.parse(data).packages
                    this.isLoading = false
                }.bind(this))
            }
        },
        updated() {
            this.$redrawVueMasonry()
        },
        mounted(){
            this.getData()
        }
    }
</script>