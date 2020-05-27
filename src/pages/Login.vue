<template>
    <base-button slot="footer" type="primary" v-on:click="onClickLogin" fill>Se connecter (temporaire)</base-button>
</template>
<script>
    //TODO: A FAIRE
    import User from "@/user";
    import router from "@/router";

    export default {
        methods: {
            onClickLogin: function () {
                User.setConnected(true);
                router.push({name: 'dashboard'});
            }
        }
    }
</script>
<style>
</style>
