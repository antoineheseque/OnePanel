<template>
    <base-button slot="footer" type="primary" v-on:click="onClickLogout" fill>Se déconnecter (temporaire)</base-button>
</template>
<script>
    //TODO: A FAIRE
    import User from "@/user";
    import router from "@/router";

    export default {
        methods: {
            onClickLogout: function () {
                User.setConnected(false);
                router.push({name: 'login'});
            }
        }
    }
</script>
<style>
</style>
