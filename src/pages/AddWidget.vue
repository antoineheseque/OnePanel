<template>
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
