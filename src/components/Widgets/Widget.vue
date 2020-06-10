<template>
    <div :class="'col-md-'+widget.w">
        <div class="card" :class="[type && `card-${type}`]">
            <div class="card-header">
                <slot name="title" class="header">
                    <h5 class="title d-inline" v-if="weatherInformations">{{widget.title + " de " + weatherInformations}}</h5>
                    <h5 class="title d-inline" v-else>{{widget.title}}</h5>

                    <base-dropdown menu-on-right=""
                                   tag="div"
                                   title-classes="btn btn-link btn-icon"
                                   aria-label="Settings menu">
                        <i slot="title" class="tim-icons icon-settings-gear-63"></i>
                        <slot name="button"></slot>
                    </base-dropdown>
                </slot>
            </div>
            <div class="card-body" >
                <div class="content">
                    <news v-if="widget.id==='news'"></news>
                    <meteo v-if="widget.id==='meteo'" v-on:setInformations="setInformations"></meteo>
                    <gif-du-jour v-if="widget.id==='gif-du-jour'"></gif-du-jour>
                </div>
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
            setInformations(value) {
                this.weatherInformations = value
            }
        }
    };
</script>
<style>
</style>
