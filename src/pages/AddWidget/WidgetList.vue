<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(widget, idxx) in  widgetsList" :key="idxx">
      <td>widget.title</td>
      <td>widget.description</td>
    </tr>

    </tbody>
  </table>
</template>
<script>
  export default {
    name: "add-widget-list",

    props: {
      widgetList:""
    }

  }

</script>
<style>
</style>
