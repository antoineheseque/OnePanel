<template>
    <div class="news">
        <div v-for="(news,i) in allNews" :key="i" class="article m-2">
            <div class="title">
                <a :href="news.url" target="_blank"><h6>{{news.title}}</h6></a>
                <p>{{getDateArticles(i)}}</p>
            </div>
            <img :src="news.urlToImage" class="mr-4">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "News",
        data(){
            return {
                allNews : [],
                dateArticles : []
            }
        },
        methods:{
            getNews : function () {
                axios //Appel à l'API pour avoir le nom de la ville selon la position
                    .get(`http://newsapi.org/v2/top-headlines?country=fr&apiKey=3cff78090d1240b5ae70dbbb310250c9`)
                    .then(reponse => {
                        this.allNews = reponse.data.articles;
                        console.log(reponse.data.articles);
                    })
            },
            getDateArticles: function (index) {
                var article = this.allNews[index].publishedAt.toString();
                article = article.replace(/T/, '-');
                article = article.replace(/Z/, ' ');
                article = article.replace(/:.. /, ' ');
                article = article.split('-').reverse().join('/').replace(/\//, '');
                return article
            }
        },
        mounted() {
            this.getNews();
        }
    }
</script>

<style scoped>
    img {
        width: 200px;
        height: auto;
    }

    .news{
        margin: auto;
        max-height: 20em;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 5px;
    }

    .news::-webkit-scrollbar{
        display: none;
    }

    .article {
        display: flex;
        -webkit-transform: scale(1);
        transform: scale(1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;

    }
    .article:hover{
        -webkit-transform: scale(1.01);
        transform: scale(1.01);
    }
</style>