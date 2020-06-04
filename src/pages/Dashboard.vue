<template>
    <div>
        <!--
        <base-button type="primary" v-on:click="call" fill>Test Appel LaPoste API</base-button>
        <base-button type="primary" v-on:click="test" fill>Test console log widgets</base-button>
        -->

        <div class="row">
            <widget v-for="(widget, idx) in widgets.widgets" :key="idx" :widget="widget">
                <template slot="header"></template>
                <template slot="content"></template>
            </widget>
            <!-- <div class="col-md-3"></div> -->
        </div>
    </div>
</template>
<script>
    import Widget from '@/components/Widgets/Widget';
    import widgets from '../widgets.json';

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
        computed: {

        },
        methods: {
            test: function(){
                console.log(widgets.widgets)
            },
            call: function () {
                fetch("/api/widgets/poste", {
                    method: "GET"
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    console.log(data)
                })
            }
        }
    };
</script>
<style>
</style>
