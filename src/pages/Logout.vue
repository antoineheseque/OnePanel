<template>
    <base-button slot="footer" type="primary" v-on:click="onClickLogout" fill>Se déconnecter</base-button>
</template>
<script>
    import User from "@/user";
    import router from "@/router";
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";

    export default {
        methods: {
            onClickLogout: function () {
                //this.notify('info', 'Déconnexion en cours.')
                User.logout()
                this.notify('info', 'Vous êtes déconnecté.')
                router.push('login')
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
        }
    }
</script>
<style>
</style>
