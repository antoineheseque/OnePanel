<template>
    <div :class="'col-md-'+widget.w">
        <div class="card" :class="[type && `card-${type}`]">
            <div class="card-header">
                <slot name="title" class="header">
                    <h5 class="title d-inline" v-if="weatherInformations && widget.id==='meteo'">{{widget.title + " de " + weatherInformations}}</h5>
                    <h5 class="title d-inline" v-else-if="horoscopeInformations && widget.id==='horoscope'">{{widget.title + " " + horoscopeInformations}}</h5>
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
                    <meteo v-if="widget.id==='weather'" v-on:setInformations="setInformations"></meteo>
                    <gif-du-jour v-if="widget.id==='day-gif'"></gif-du-jour>
                    <horoscope v-if="widget.id==='horoscope'" v-on:setHoroscope="setHoroscope"></horoscope>
                    <biorythme v-if="widget.id==='biorythme'"></biorythme>
                    <citation v-if="widget.id==='citation'"></citation>
                    <day-streak v-if="widget.id==='day-streak'"></day-streak>
                    <agenda v-if="widget.id==='agenda'"></agenda>
                    <classement-ligue1 v-if="widget.id==='classement'"></classement-ligue1>
                    <transport v-if="widget.id==='transport'"></transport>
                    <poke v-if="widget.id==='pokemon'"></poke>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import News from "@/components/Widgets/News";
    import Meteo from "@/components/Widgets/Meteo";
    import GifDuJour from "@/components/Widgets/GifDuJour";
    import Horoscope from "@/components/Widgets/Horoscope";
    import Biorythme from "@/components/Widgets/Biorythme";
    import Citation from "@/components/Widgets/Citation";
    import DayStreak from "@/components/Widgets/DayStreak";
    import Agenda from "@/components/Widgets/Agenda";
    import ClassementLigue1 from "@/components/Widgets/ClassementLigue1";
    import Transport from "@/components/Widgets/Transport";
    import Poke from "@/components/Widgets/Pokemon";

    export default {
        name: "widget",
        components: {
            Poke,
            Transport,
            ClassementLigue1, GifDuJour, Meteo, News, Horoscope, Biorythme, Citation, DayStreak, Agenda},
        props: {
            widget:"",
            type:""
        },
        data(){
            return{
                weatherInformations:"",
                horoscopeInformations:""
            }
        },
        methods:{
            setInformations(value) {
                this.weatherInformations = value
            },
            setHoroscope(value) {
                this.horoscopeInformations = value
            }
        }
    };
</script>