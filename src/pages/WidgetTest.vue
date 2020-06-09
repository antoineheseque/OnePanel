<template>
    <widget :widget="widget">
        <template slot="header"></template>
        <template slot="content"></template>
    </widget>
</template>
<script>
    import Widget from '@/components/Widgets/Widget';
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";
    export default {
        components: {
            Widget
        },
        data(){
            return{
                widget:{
                    "title": "Gif du jour!",
                    "id": "gif-du-jour",
                    "x": 0,
                    "y": 0,
                    "w": 12,
                    "h": 1,
                    "min-w": 12
                }
            }
        },
        methods: {
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
        }
    }
</script>
<style>
</style>
