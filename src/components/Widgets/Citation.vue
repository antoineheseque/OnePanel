<template>
    <div>
        <blockquote class="blockquote mb-0 ">
            <p class="mt-0">{{quote.quote}}</p>
            <footer class="centerblockquote-footer">{{quote.author}} - <cite title="Source Title">{{quote.date}}</cite></footer>
        </blockquote>
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
                        console.log(reponse.data.contents.quotes[0])
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