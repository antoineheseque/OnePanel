<template>
    <card>
        <h5 slot="header" class="title">Mon Profil</h5>
        <div class="row">

            <div class="col-md-3 px-md-3">
                <base-input label="Nom d'utilisateur"
                            placeholder="Username"
                            v-model="profile.username">
                </base-input>
            </div>
            <div class="col-md-5 pl-md-1">
                <base-input label="Adresse Mail"
                            type="email"
                            placeholder="mike@email.com"
                            v-model="profile.email">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 pr-md-3">
                <base-input label="Nom"
                            v-model="profile.firstName"
                            placeholder="First Name">
                </base-input>
            </div>
            <div class="col-md-3 pl-md-1">
                <base-input label="Prénom"
                            v-model="profile.lastName"
                            placeholder="Last Name">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <base-input label="Addresse"
                            v-model="profile.address"
                            placeholder="Home Address">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 pr-md-3">
                <base-input label="City"
                            v-model="profile.city"
                            placeholder="City">
                </base-input>
            </div>
            <div class="col-md-3 px-md-1">
                <base-input label="Country"
                            v-model="profile.country"
                            placeholder="Country">
                </base-input>
            </div>
        </div>

        <base-button slot="footer" type="primary"  v-on:click="onClickEditProfile" fill>Save</base-button>
    </card>
</template>
<script>
    import User from '@/user';
    export default {
        props: {
            profile: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        methods: {
            onClickEditProfile: function () {
                User.onClickEditProfile();
            }
        }
    }
</script>
<style>
</style>
