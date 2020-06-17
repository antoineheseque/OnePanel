<template>
    <div>
        <blockquote class="blockquote">
            <p class="mt-0">{{quote}}</p>
            <footer class="centerblockquote-footer">{{author}} - <cite title="Source Title">{{date}}</cite></footer>
        </blockquote>
    </div>
</template>

<script>
    export default {
        name: "Citation",
        data(){
            return{
                quote: '',
                author: '',
                date: ''
            }
        },
        methods:{
            getQuotes: function(){
                fetch('/api/widget/citations/getCitation', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.quote= data.citations.Citation_jour;
                    this.author = data.citations.Auteur;
                    this.date= data.citations.date_citation;
                }.bind(this))
            },
        },
        mounted() {
            this.getQuotes()
        }
    }
</script>