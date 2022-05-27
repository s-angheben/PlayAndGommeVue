<template>
  <div class="details">
    <h1>Details page</h1>
    <h1>Object id is {{ $route.params.id }} </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .details {
    min-height: 100vh;
    display: flex;
    align-items: top;
    padding-top: 2rem;
  }
}
</style>
