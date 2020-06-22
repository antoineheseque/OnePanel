<template>
    <div>
        <div class="row">
            <widget-list :widgetList="widgetList" :is-adding="isAdding" v-on:addWidget="onClickWidget"></widget-list>
        </div>
    </div>

</template>
<script>
    import WidgetList from './AddWidget/WidgetList';
    import User from '../user'
    import Widgets from '../widgets.json'
    import router from "@/router";
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";
    import widgets from "@/widgets.json";

    export default {

        components: {
            WidgetList,
        },
        data() {
            return {
                widgetList:Widgets.widgets,
                isAdding:false
            }
        },
        methods: {
            onClickWidget: function(id){
                this.isAdding = true
                fetch('/api/user/addWidget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.isAdding = false

                    // RECUPERE LE JSON DU WIDGET
                    if(data.success == "true"){
                        if(Widgets.widgets.some(item => item.id == id)){
                            let widget = Widgets.widgets.filter(item => item.id == id)[0]
                            widget.visible = true
                            this.notify('success', `Le widget "${widget.name}" a bien été ajouté.`)
                            router.push('dashboard')
                        }else
                            this.notify('danger', `Une erreur s'est produite lors de l'ajout du Widget.`)
                    }else
                        this.notify('danger', data.reason)
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
            if(Widgets.widgets.length === 0){
                fetch("/api/user/loadWidgets", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    if(data.success == "true") {
                        this.widgetList = JSON.parse(data.widgets)
                    }else{
                        this.notify('danger', data.reason)
                    }
                }.bind(this))
            }
        }
    }
</script>
<style>
</style>
