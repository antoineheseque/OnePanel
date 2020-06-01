<template>
  <div class="card" :class="[type && `card-${type}`]">
    <div class="card-header" v-if="$slots.header || title" :class="headerClasses">
      <slot name="header">
        <p class="card-category" v-if="title">{{subTitle}}</p>
      </slot>
    </div>
    <div class="card-body" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "widget",
    props: {
      title: {
        type: String,
        description: "Widget subtitle"
      }
    }
  };
</script>
<style>
</style>
