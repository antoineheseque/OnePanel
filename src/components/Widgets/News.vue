<template>
    <div class="news">
        <div v-for="(news,i) in allNews" :key="i" class="article m-2" >
            <div class="title" v-if="news.urlToImage">
                <a :href="news.url" target="_blank" ><h6>{{news.title}}</h6></a>
                <p>{{getDateArticles(i)}}</p>
            </div>
            <img :src="getImg(news.urlToImage)" class="ml-auto" alt="error" @error="imageLoadError(i)" v-if="news.urlToImage">
        </div>
    </div>
</template>

<script>

    export default {
        name: "News",
        data(){
            return {
                allNews : [],
                newsBDD:  {} //News BDD
            }
        },
        methods:{
            call_news: function(){ //Récupère les infos news
                fetch('/api/widget/news/getNews', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.newsBDD['data'] = data.news
                    this.allNews = this.newsBDD['data'];
                }.bind(this))
            },
            getDateArticles: function (index) { //Remplace la date de l'article
                var article = this.allNews[index].publishedAt.toString();
                article = article.replace(/T/, '-');
                article = article.replace(/Z/, ' ');
                article = article.replace(/:.. /, ' ');
                article = article.split('-').reverse().join('/').replace(/\//, '');
                return article
            },
            imageLoadError : function(index) { //Si on ne trouve pas l'image on la remplace par defaut
                console.log('Image failed to load')
                this.allNews[index].urlToImage = 'https://resize-rfm.lanmedia.fr/f/webp/r/665,444,forcex,center-middle/img/var/rfm/storage/images/news/la-nuit-avec-moi-un-inedit-de-johnny-hallyday-dans-le-coffret-celebrant-l-annee-1969-19596/281155-1-fre-FR/La-Nuit-avec-Moi-un-inedit-de-Johnny-Hallyday-dans-le-coffret-celebrant-l-annee-1969.jpg'
            },
            getImg: function (img) { //Convertion image http en https pour la sécurité
                return img.replace(/http:/, 'https:');
            }

        },
        mounted() {
            this.call_news();
        },
        updated() {
            this.$redrawVueMasonry()
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