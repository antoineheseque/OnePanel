<template>
    <div>
        <base-button type="primary" v-on:click="call" :loading="this.isLogging" :disabled="isLogging" fill>Test Appel LaPoste API</base-button>

        <div class="row">
            <div v-for="widget in widgets" :key="widget.id" v-bind:class="'col-md-'+widget.w">
                <widget>
                    <template slot="header">
                        <h5 class="card-category">{{}}</h5>
                    </template>
                    <div>
                        <p>Content</p>
                    </div>
                </widget>
            </div>
            <div class="col-md-3"></div>
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
