<template>
    <card>
        <h5 slot="header" class="title">Mon Profil</h5>
        <div class="row">
            <div class="col-md-2">
                <base-input label="ID"
                            v-model="profile.id" readonly="true">
                </base-input>
            </div>
            <div class="col-md-4">
                <base-input label="Nom d'utilisateur"
                            v-model="profile.username">
                </base-input>
            </div>
            <div class="col-md-6">
                <base-input label="Email"
                            type="email"
                            v-model="profile.email">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <base-input label="Prénom"
                            v-model="profile.firstName">
                </base-input>
            </div>
            <div class="col-md-4">
                <base-input label="Nom"
                            v-model="profile.lastName">
                </base-input>
            </div>
            <div class="col-md-4">
                <div class="form-group datepicker-div">
                    <label class="control-label">Date de naissance</label>
                    <datepicker v-model="profile.birthdayDate" :language="fr" class="form-control"></datepicker>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <base-input label="Confirmez avec votre mot de passe" type="password"
                            v-model="passwordConfirmation">
                </base-input>
            </div>
        </div>
        <input type="file" @change="selectedImg">
        <button @click="uploadImg">Upload</button>
        <base-button type="primary"  v-on:click="onClickEditProfile" :loading="isUpdatingProfile" :disabled="isUpdatingProfile" fill>Mettre à jour mon profil</base-button>
    </card>
</template>
<script>
    import Datepicker from 'vuejs-datepicker';
    import User from '@/user';
    import NotificationTemplate from "@/pages/Notifications/NotificationTemplate";
    import fr_datepicker from "vuejs-datepicker/dist/locale/translations/fr"
    import axios from 'axios'
    export default {
        components: {
            Datepicker
        },
        data(){
            return{
                passwordConfirmation:"",
                isUpdatingProfile:false,
                profile:"",
                fr:fr_datepicker,
                selectedImgData: null
            }
        },
        mounted:function(){
            this.profile=User.profile
        },
        methods: {
            onClickEditProfile: function () {
                this.isUpdatingProfile = true
                this.profile.password = this.passwordConfirmation
                User.onClickEditProfile(this.profile).then((result) =>{
                    console.log(result)

                    if(result.updated === true){ // Si l'utilisateur à pu être connecté
                        this.notify('info', `Les données ont été sauvegardées.`)
                    }
                    else{
                        this.notify('danger', result.reason)
                    }
                    this.passwordConfirmation = ""
                    this.isUpdatingProfile = false
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
            },
            selectedImg : function (event) {
                this.selectedImgData = event.target.files[0]
            },
            uploadImg : function () {
                var formData = new FormData()
                formData.append("image", this.selectedImgData)
                formData.append("token", User.getToken().toString())
                fetch('/api/user/updateImg', {
                    method: 'POST',
                    body: formData,
                }).then(function (res) {
                    return res.json();
                }).then(function (result) {
                    console.log(result)
                }.bind(this))

                /*const fd = new FormData()
                fd.append('avatar', this.selectedImgData, this.selectedImgData.name)
                fd.append("token", User.getToken())
                axios.post('/api/user/updateImg', fd)
                    .then(res => {
                        console.log(res)
                    })*/
            }
        }
    }
</script>
<style>
</style>
