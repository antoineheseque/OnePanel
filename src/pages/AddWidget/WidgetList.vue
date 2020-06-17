<template>
    <div>
        <div class="row">
            <div class="col-md-3" v-for="(widget,idxx) in widgetList" :key="idxx">
                <card>
                    <img slot="image" class="card-img-top" :src="widget.image">
                    <h4 class="card-title">{{widget.name}}</h4>
                    <p class="card-text description" style="height: 50px; overflow-y: auto">{{widget.description}}</p>
                    <base-button type="primary" class="btn btn-success" v-if="widget.visible" v-on:click="addWidget(widget.id)" :loading="isAdding" :disabled="true">Déjà ajouté</base-button>
                    <base-button type="primary" class="btn btn-success" v-else v-on:click="addWidget(widget.id)" :loading="isAdding" :disabled="isAdding">Ajouter</base-button>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import User from "@/user";
    import widgets from "@/widgets.json";

    export default {

        name: "add-widget-list",
        props: {
            widgetList:"",
            isAdding:false
        },
        methods:{
            addWidget: function(id){
                this.$emit('addWidget', id)
            }
        }
    }
</script>