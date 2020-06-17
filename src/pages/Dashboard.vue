<template>
    <div>
        <!--
        <base-button type="primary" v-on:click="call" fill>Test Appel LaPoste API</base-button>
        <base-button type="primary" v-on:click="test" fill>Test console log widgets</base-button>
        -->
        <h3 v-if="!widgetsVisible">C'est bien vide ici... Allez ajouter un widget!</h3>
        <div v-else class="row">
            <widget v-for="(widget, idx) in widgets.widgets" :key="idx" :widget="widget" v-if="widget.visible">
                <template slot="button">
                    <a class="dropdown-item" v-on:click="onClickRemove(widget.id)">Supprimer le widget</a>
                </template>
            </widget>
        </div>
    </div>
</template>
<script>
    import Widget from '@/components/Widgets/Widget';
    import widgets from '../widgets.json';
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";

    import router from "@/router";
    import User from "@/user";
    import Widgets from "@/widgets.json";

    export default {
        components: {
            Widget
        },
        data() {
            //TODO: BDD DONNEES A AFFICHER DANS LES BLOCS (refaire le système pour séparer par blocs
            return {
                widgets,
                widgetsVisible:false
            }
        },
        methods: {
            call: function() {
                fetch("/api/widgets/poste", {
                    method: "GET"
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    console.log(data)
                })
            },
            onClickRemove: function(widgetID){
                fetch("/api/user/removeWidget", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"id":widgetID,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    if(data.success == "true") {
                        var index = widgets.widgets.findIndex(element => element.id === widgetID)
                        widgets.widgets[index].visible = false
                        this.notify('success', `Le widget "${widgets.widgets[index].name}" a bien été supprimé.`)

                        if(!Widgets.widgets.some(item => item.visible === true))
                            this.widgetsVisible = false
                    }else{
                        this.notify('error', data.reason)
                    }
                }.bind(this))
            },
            notify: function(info,message){
                this.$notify({
                    component: NotificationTemplate,
                    icon: "tim-icons icon-bell-55",
                    horizontalAlign: "right",
                    verticalAlign: "top",
                    type: info,
                    timeout: 2000,
                    message: message
                })
            }
        },
        mounted(){
            fetch("/api/user/loadWidgets", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"token":User.getToken()})
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                if(data.success == "true") {
                    widgets.widgets = JSON.parse(data.widgets)
                    console.log(widgets.widgets)
                    if(Widgets.widgets.some(item => item.visible === true))
                        this.widgetsVisible = true
                }else{
                    this.notify('danger', data.reason)
                }
            }.bind(this))
        }
    };
</script>
<style>
</style>
