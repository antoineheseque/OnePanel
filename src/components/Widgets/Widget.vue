<template>
    <div :class="'col-md-'+widget.w">
        <div class="card" :class="[type && `card-${type}`]">

            <div class="card-header">
                <slot name="header">
                    <h5 class="card-category" v-if="weatherInformations">{{widget.title + " de " + weatherInformations}}</h5>
                    <h5 class="card-category" v-else>{{widget.title}}</h5>
                </slot>
            </div>
            <div class="card-body">
                <slot name="content">
                    <news v-if="widget.id==='news'"></news>
                    <meteo v-if="widget.id==='meteo'" v-on:setInformations="setInformations"></meteo>
                    <gif-du-jour v-if="widget.id==='gif-du-jour'"></gif-du-jour>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import News from "@/components/Widgets/News";
    import Meteo from "@/components/Widgets/Meteo";
    import GifDuJour from "@/components/Widgets/GifDuJour";
    export default {
        name: "widget",
        components: {GifDuJour, Meteo, News},
        props: {
            widget:"",
            type:""
        },
        data(){
            return{
                weatherInformations:""
            }
        },
        methods:{
            setInformations(value){
                this.weatherInformations = value
            }
        }
    };
</script>
<style>
</style>
