<script setup>
import SimpleTable from '../../components/SimpleTable.vue'
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { store } from '@/store/store.js'

const router = useRouter()

const APP_URL = `/api/v2/appointments`

const Tablekeys = ["self", "date", "service", "materials", "userId"]
const Tablelabels = ["ID Appuntamento", "Data", "Servizio","Prodotti","Cliente"]
const url = "DetailsApp"

const appointments = ref(null)

function redirectToAddApp() {
  router.push({ name: 'AddApp' })
}

watchEffect(async () => {
  const headers = { "x-access-token": store.token };
//  const headers = { "x-access-token": localStorage.getItem('token') };
  appointments.value = await (await fetch(APP_URL, { headers })).json()
  if (appointments.value.error) appointments.value = null;
})
</script>

<template>
  <div v-if="store.logged">
  <h1 class="titlepage">Appuntamenti Prenotati:</h1>
  <button @click="redirectToAddApp" class="aggiungi_button">Aggiungi</button>

  
  <SimpleTable
    :url="url" 
    :data="appointments"
    :columns="Tablelabels"
    :keys="Tablekeys" >
  </SimpleTable>
  </div>
  <div v-else >
    <h1>Accedi nell'area di login</h1>
  </div>
</template>

<style>

.aggiungi_button {
  position: relative;
  z-index: 99;
  float:right;
  background: hsla(160, 100%, 37%, 1);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

.titlepage {
  text-decoration: none;
  color: #42b883;
  padding-top: 2rem;
}
</style>
