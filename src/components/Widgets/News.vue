<template>
    <div class="news">
        <div v-for="(news,i) in allNews" :key="i" class="article m-2" >
            <div class="title" v-if="news.urlToImage">
                <a :href="news.url" target="_blank" ><h6>{{news.title}}</h6></a>
                <p>{{getDateArticles(i)}}</p>
            </div>
            <img :src="news.urlToImage" class="ml-auto" alt="error" @error="imageLoadError(i)" v-if="news.urlToImage">
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
                    .get(`https://newsapi.org/v2/top-headlines?country=fr&apiKey=3cff78090d1240b5ae70dbbb310250c9`)
                    .then(reponse => {
                        this.allNews = reponse.data.articles;
                        console.log('Chargement API News');
                    })
            },
            getDateArticles: function (index) {
                var article = this.allNews[index].publishedAt.toString();
                article = article.replace(/T/, '-');
                article = article.replace(/Z/, ' ');
                article = article.replace(/:.. /, ' ');
                article = article.split('-').reverse().join('/').replace(/\//, '');
                return article
            },
            imageLoadError : function(index) {
                console.log('Image failed to load')
                this.allNews[index].urlToImage = 'https://resize-rfm.lanmedia.fr/f/webp/r/665,444,forcex,center-middle/img/var/rfm/storage/images/news/la-nuit-avec-moi-un-inedit-de-johnny-hallyday-dans-le-coffret-celebrant-l-annee-1969-19596/281155-1-fre-FR/La-Nuit-avec-Moi-un-inedit-de-Johnny-Hallyday-dans-le-coffret-celebrant-l-annee-1969.jpg'
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
        height: 20em;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 5px;
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