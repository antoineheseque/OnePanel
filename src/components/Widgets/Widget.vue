<template>
    <div :class="'col-md-'+widget.w">
        <div class="card" :class="[type && `card-${type}`]">

            <div class="card-header" v-if="$slots.header">
            <slot name="header">
                    <p class="card-category" v-if="widget.title">{{widget.title}}</p>
                </slot>
            </div>
            <div class="card-body" v-if="$slots.default">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "widget",
        props: {
            widget:"",
            type:""
        }
    };
</script>
<style>
</style>
