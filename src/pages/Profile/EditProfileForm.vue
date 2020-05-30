<template>
    <card>
        <h5 slot="header" class="title">Mon Profil</h5>
        <div class="row">

            <div class="col-md-4">
                <base-input label="Nom d'utilisateur"
                            v-model="profile.username">
                </base-input>
            </div>
            <div class="col-md-8">
                <base-input label="Adresse Mail"
                            type="email"
                            v-model="profile.email">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <base-input label="Prénom"
                            v-model="profile.firstName">
                </base-input>
            </div>
            <div class="col-md-6">
                <base-input label="Nom"
                            v-model="profile.lastName">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <base-input label="Addresse"
                            v-model="profile.address">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <base-input label="City"
                            v-model="profile.city">
                </base-input>
            </div>
            <div class="col-md-3">
                <base-input label="Country"
                            v-model="profile.country">
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
