<template>
    <div class="appGif">
        <img :src="image" alt="gif" class="gif">
    </div>
</template>

<script>

    export default {
        name: "gif-du-jour",
        data(){
            return {
                image:''
            }
        },
        methods:{
            call: function(){
                fetch('/api/widget/daygif/getImage', {
                    method: 'POST'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    this.image = data.image
                    this.$redrawVueMasonry('containerId')
                }.bind(this))
            }
        },
        mounted() {
            this.call()
        }
    }
</script>