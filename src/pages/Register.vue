<template>
    <card>
        <h5 slot="header" class="title">Inscription</h5>
        <div class="row">
            <div class="col-md-4">
                <base-input label="Nom d'utilisateur"
                            v-model="register.username">
                </base-input>
            </div>
            <div class="col-md-4">
                <base-input label="Mot de passe"
                            type="password"
                            v-model="register.password">
                </base-input>
            </div>
            <div class="col-md-4">
                <base-input label="Répétez le mot de passe"
                            type="password"
                            v-model="register.password2">
                </base-input>
            </div>
        </div>
        <base-button class="center" type="primary" v-on:click="onClickRegister" :loading="isRegistering" :disabled="isRegistering" fill>S'inscrire</base-button>
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
                register:{
                    username:"",
                    password:"",
                    password2:""
                },
                isRegistering:false
            }
        },
        methods: {
            onClickRegister: function () {
                //this.notify('info', 'Inscription en cours.');
                this.isRegistering = true
                User.register(this.register).then((result) => {
                    //console.log(result)
                    if(result.registered == true){ // Si l'utilisateur à pu être enregistré
                        this.notify('info', 'Vous êtes inscrit.')
                        router.push('login')
                    }
                    else{
                        this.register.password = ""
                        this.register.password2 = ""
                        this.notify('danger', result.reason)
                    }
                    this.isRegistering = false
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
