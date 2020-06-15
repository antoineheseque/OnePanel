<template>
    <div>
        <div class="row">
            <widget-list :widgetList="widgetList" v-on:addWidget="onClickWidget"></widget-list>
        </div>
    </div>

</template>
<script>
    import widgetsList from '../widgetsList.json';
    import WidgetList from './AddWidget/WidgetList';
    import User from '../user'

    export default {

        components: {
            WidgetList,
        },
        data() {
            return {
                widgetList:widgetsList.widgets
            }
        },
        methods: {
            onClickWidget: function(id){
                fetch('/api/user/addWidget', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"id":id,"token":User.getToken()})
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    // RECUPERE LE JSON DU WIDGET
                    console.log(data)
                })
            }
        }
    }
</script>
<style>
</style>
