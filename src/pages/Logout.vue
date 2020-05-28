<template>
    <base-button slot="footer" type="primary" v-on:click="onClickLogout" fill>Se déconnecter (sans bdd)</base-button>
</template>
<script>
    //TODO: A FAIRE
    import User from "@/user";
    import router from "@/router";
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";

    export default {
        methods: {
            onClickLogout: function () {
                this.notify('info', 'Déconnexion en cours.')
                User.logout(this.logout).then((result) => {
                    console.log(result)

                    if(result.logged == false){ // Si l'utilisateur à pu être déconnecté
                        this.notify('info', 'Vous êtes déconnecté.')
                        router.push('login')
                    }
                    else{ // Ne devrais jamais arriver ?
                        this.notify('danger', result.reason)
                    }
                });
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
