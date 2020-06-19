<template>
    <div class="appGif">
        <img :src="image" alt="gif" class="gif">
    </div>
</template>

<script>

    export default {
        name: "gif-du-jour",
        data(){
            return {
                image:''
            }
        },
        methods:{
            call: function(){ //Récupère les donnnées
                fetch('/api/widget/daygif/getImage', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.image = data.image
                }.bind(this))
            }
        },
        mounted() {
            this.call()
        },
        updated() {
            this.$redrawVueMasonry()
        }
    }
</script>