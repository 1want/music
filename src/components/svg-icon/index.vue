<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<script setup>
const props = defineProps(['name'])
</script>

<style></style>
