<template>
    <card>
        <h5 slot="header" class="title">Connexion</h5>
        <div class="row">
            <div class="col-md-6">
                <base-input label="Nom d'utilisateur"
                            v-model="login.username">
                </base-input>
            </div>
            <div class="col-md-6">
                <base-input label="Mot de Passe"
                            type="password"
                            v-model="login.password">
                </base-input>
            </div>
        </div>
        <base-button type="primary" v-on:click="onClickLogin" :loading="this.isLogging" :disabled="isLogging" fill>Se connecter</base-button>
        <div>
            <img src="/img/paysage.jpg" alt="Paysage">
        </div>
    </card>
</template>
<script>
    //TODO: A FAIRE
    import User from "@/user";
    import router from "@/router";
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";

    export default {
        data(){
            return{
                login:{
                    username:"",
                    password:""
                },
                isLogging:false
            }
        },
        methods: {
            onClickLogin: function () {
                this.isLogging = true

                //this.notify('info', 'Connexion en cours.')
                User.login(this.login).then((result) => {
                    console.log(result)

                    if(result.logged == true){ // Si l'utilisateur à pu être connecté
                        this.notify('info', `Heureux de vous voir, ${result.username}.`)
                        router.push('dashboard')
                    }
                    else{
                        this.login.password = ""
                        this.notify('danger', result.reason)
                    }
                    this.isLogging = false
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
