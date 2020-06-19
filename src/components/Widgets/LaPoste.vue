<template>
    <div>
        <div class="form-group m-1" @keypress.enter="addPackage">
        <label for="nomColis">Nom du Colis: </label>
        <input type="text" id="nomColis" class="form-control" v-model="tempPackageID">

        <button class="btn btn-primary" @click="addPackage" >Suivre le colis</button>
        <div v-for="(packa, i) in packages" :key="i" class="m-1">
            <p>{{packa.id}} -> {{packa.status}}</p>
            <button class="btn btn-primary" @click="removePackage(packa.id)" >Supprimer</button>
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
                    {id: "ADQNBCUBC4", status: "Inconnu"},
                    {id: "DEF456", status: "Inconnu"}
                ],
                tempPackageID:""
            }
        },
        methods:{
            addPackage: function(){
                if(this.tempPackageID.length > 0){
                    this.packages.push({id:this.tempPackageID,status: "Inconnu"})
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
                    body:{"packages":JSON.stringify(this.packages)}
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    console.log(data)
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