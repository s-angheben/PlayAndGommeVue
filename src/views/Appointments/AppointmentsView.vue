<script setup>
import SimpleTable from '../../components/SimpleTable.vue'
import { ref, reactive, watchEffect } from 'vue'

const APP_URL = `http://localhost:8080/api/v2/appointments`

const Tablekeys = ["self", "date", "service", "materials", "userId"]
const Tablelabels = ["ID Appuntamento", "Data", "Servizio","Prodotti","Cliente"]
const url = "DetailsApp"

const appointments = ref(null)


watchEffect(async () => {
  appointments.value = await (await fetch(APP_URL)).json()
})
</script>

<template>
  <div>
  <h1 class="titlepage">Appuntamenti Prenotati:</h1>
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
