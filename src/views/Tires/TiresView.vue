<script setup>
import SimpleTable from '@/components/SimpleTable.vue'
import { ref, reactive, watchEffect } from 'vue'

const TIRE_URL = `http://localhost:8080/api/v2/tires`

const Tablekeys = ["self", "brand", "model", "length", "height","diameter","quantity", "type", "price"]
const Tablelabels = ["ID Pneumatico", "marca", "modello", "lunghezza", "altezza", "diametro", "quantita'", "tipologia", "prezzo"]

const url = "DetailsTire"
const appointments = ref(null)

watchEffect(async () => {
  appointments.value = await (await fetch(TIRE_URL)).json()
})
</script>

<template>
  <div>
  <h1 class="titlepage">Materiale in magazzino:</h1>
  <SimpleTable
    :url="url"
    :data="appointments"
    :columns="Tablelabels"
    :keys="Tablekeys" >
  </SimpleTable>
  </div>
</template>

<style>

.titlepage {
  text-decoration: none;
  color: #42b883;
  padding-top: 2rem;
}
</style>
