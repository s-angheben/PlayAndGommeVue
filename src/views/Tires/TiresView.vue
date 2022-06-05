<script setup>
import SimpleTable from '@/components/SimpleTable.vue'
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router';

const TIRE_URL = `/api/v2/tires`

const Tablekeys = ["self", "brand", "model", "length", "height","diameter","quantity", "type", "price"]
const Tablelabels = ["ID Pneumatico", "marca", "modello", "lunghezza", "altezza", "diametro", "quantita'", "tipologia", "prezzo"]

const url = "DetailsTire"
const tires = ref(null)

const router = useRouter()

function redirectToAddTire() {
  router.push({ name: 'AddTire' })
}

watchEffect(async () => {
  tires.value = await (await fetch(TIRE_URL)).json()
  if (tires.value.error) tires.value = null;
})
</script>

<template>
  <div>
  <h1 class="titlepage">Materiale in magazzino:</h1>

  <button @click="redirectToAddTire" class="aggiungi_button">Aggiungi</button>

  <SimpleTable
    :url="url"
    :data="tires"
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
