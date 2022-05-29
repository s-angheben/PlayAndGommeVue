<script setup>
import AppForm from '@/components/AppForm.vue'
import { ref, watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router";

const router = useRouter()

const APP_URL = `http://localhost:8080/api/v2/appointments/`
const appointment = ref(null)

const date = ref()
const service = ref()
const materials = ref([])
const userId = ref()

function extractId (urlId) {
  return urlId.substring(urlId.lastIndexOf('/') + 1)
}

function goBack(){
  router.go(-1)
}


async function create() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      alreadyPaid: false,
      appointmentPlaced: Date(),
      date: date.value,
      materials: materials.value,
      service: service.value,
      userId: userId.value    
    })
  };
  const response = await fetch(APP_URL, requestOptions);
  console.log(response)
}

</script>

<template>
    <h2>Aggiungi Appuntamento: </h2>

    <AppForm 
      v-model:date="date"
      v-model:service="service"
      v-model:materials="materials"
      v-model:userId="userId"
    />

    <div class="submit">
      <button @click="goBack" class="subback">Indietro</button>
      <button @click="create" class="subbut">Aggiungi</button>
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

h2 {
  text-align: center;
  color: hsla(160, 100%, 37%, 1);

}

.submit {
  margin:auto;
  max-width: 800px;
  padding-top: 2rem;
  text-align: center;
}

.subback {
  background: #626272;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  float: left;
}

.subbut {
  background: hsla(160, 100%, 37%, 1);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  float: right;
}

</style>
