<template>
    <div>
        <!--
        <base-button type="primary" v-on:click="call" fill>Test Appel LaPoste API</base-button>
        <base-button type="primary" v-on:click="test" fill>Test console log widgets</base-button>
        -->

        <div class="row">
            <widget v-for="(widget, idx) in widgets.widgets" :key="idx" :widget="widget">
                <template slot="button">
                    <a class="dropdown-item" v-on:click="onClick(widget.id)">Supprimer le widget</a>
                </template>
            </widget>
        </div>
    </div>
</template>
<script>
    import Widget from '@/components/Widgets/Widget';
    import widgets from '../widgets.json';
    import router from "@/router";

    export default {
        components: {
            Widget
        },
        data() {
            //TODO: BDD DONNEES A AFFICHER DANS LES BLOCS (refaire le système pour séparer par blocs
            return {
                widgets
            }
        },
        methods: {
            call: function () {
                fetch("/api/widgets/poste", {
                    method: "GET"
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    console.log(data)
                })
            },
            onClick(widgetID){
                var index = widgets.widgets.findIndex(element => element.id === widgetID)

                console.log(widgets.widgets)
                var deleted = widgets.widgets.splice(index,1);
                console.log(widgets.widgets)
                //router.go()
            }
        }
    };
</script>
<style>
</style>
