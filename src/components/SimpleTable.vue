<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  url: String,
  data: Array,
  columns: Array,
  keys: Array
})

function extractId (urlId) {
  return urlId.substring(urlId.lastIndexOf('/') + 1)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<template>
  <div class="tablespace">
  <table v-if="data">
    <thead>
      <tr>
        <th v-for="key in columns"
          :key="key">
          {{ capitalize(key) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data" :key="entry">
        <td v-for="k in keys" :key="k">
          {{ entry[k] }}
        </td>
        <router-link :to="{ name: url, params: { id:extractId(entry.self) }} ">!</router-link>
      </tr>
    </tbody>
  </table>
   <p>
   </p>
  </div>
</template>

<style>

.tablespace {
    padding-top: 2rem;
}
table {
  width: 100%;
  border: 2px solid #42b983;
  border-radius: 1px;
}

th {
  background-color: #42b983;
  cursor: pointer;
  user-select: none;
}

th,
td {
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

</style>