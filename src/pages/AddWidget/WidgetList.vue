<template>
  <div>
  <div class="row">
    <div class="col-md-6" v-for="(widget,idxx) in widgetList" :key="idxx">
  <card style="width: 20rem;" >
    <img slot="image" class="card-img-top" src="widget.image">
    <h4 class="card-title">{{widget.title}}</h4>
    <p class="card-text">{{widget.description}}</p>
    <a href="#" class="btn btn-success">Ajouter</a>
  </card>

</div>
  </div>
  </div>
</template>
<script>

  export default {

    name: "add-widget-list",
    props: {
      widgetList:""
    }

  }
</script>