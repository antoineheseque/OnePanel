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
                image:'' //A stocké dans BDD
            }
        },
        methods:{
            call: function(){
                return new Promise((r) => {
                    fetch('https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1', {
                        method: 'GET'
                    }).then(function (res) {
                        return res.json()
                    }).then(function (data) {
                        r(data)
                        console.log("Chargement API Gif")
                    })
                });
            },
            getGif : function () {
                this.call().then((res) => {
                    this.image=res.results[0]["media"][0]["gif"]["url"];
                })
            }
        },
        mounted() {
            this.getGif()
        }
    }
</script>