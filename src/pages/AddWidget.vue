<template>
  <div id="app">
    <div class="container">
  <h1 v-bind:class="affichage">Widgets</h1>
  <div class="row">
    <fiche-produit v-for="produit in produits" v-bind:nom="produit" v-on:validation="sélectionner" role="sélection"> </fiche-produit>

  </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-8">
      <add-widget-list :widgetList="widgetList">
      </add-widget-list>
    </div>

    <div class="col-md-4">
      <div class="column">
        <widget-card :widgetPreview="widgetPreview"></widget-card>
        <base-button slot="footer" type="primary" fill>Save</base-button>
      </div>
    </div>

  </div>
</template>
<script>
  import WidgetList from './AddWidget/WidgetList';
  import WidgetPreview from './Profile/UserCard';

  export default {
    components: {
      WidgetList,
      WidgetPreview
    },
    data() {
      return {
        widgetList: {

        },
        widgetPreview: {

        }
      }
    }
  }
</script>
<style>
</style>
