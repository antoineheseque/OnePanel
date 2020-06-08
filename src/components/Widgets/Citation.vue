<template>
    <div>
        <h5 class="text-center mt-5">{{quote.quote}}</h5>
        <p class="text-center">{{quote.author}} - {{quote.date}}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Citation",
        data(){
            return{
                quote: ''
            }
        },
        methods:{
            getQuotes: function () {
                axios
                    .get(`https://quotes.rest/qod?language=en`)
                    .then(reponse => {
                        this.quote = reponse.data.contents.quotes[0];
                        console.log("API Citation OK")
                    })
            }
        },
        mounted() {
            this.getQuotes()
        }
    }
</script>

<style scoped>

</style>