<script setup>
  const props = defineProps({
    id: String,
    data: Array,
    columns: Array,
    keys: Array
  })
</script>

<template>
  <div class="details">
    <h1>Details page</h1>
    <h1>Object id is {{ id }} </h1>
    <h1>{{ data }} </h1>
  </div>
</template>



<style>
@media (min-width: 1024px) {
  .details {
    min-height: 100vh;
    align-items: top;
    padding-top: 2rem;
  }
}
</style>
