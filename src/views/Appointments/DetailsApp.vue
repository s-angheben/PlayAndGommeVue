<script setup>
import AppForm from '@/components/AppForm.vue'
import { ref, watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
})

const router = useRouter()

const APP_URL = `http://localhost:8080/api/v2/appointments/`
const appointment = ref(null)

function extractId (urlId) {
  return urlId.substring(urlId.lastIndexOf('/') + 1)
}

function goBack(){
  router.go(-1)
}

function goModify(){
  console.log(appointment)
}

watchEffect(async () => {
  const url = APP_URL + props.id
  appointment.value = await (await fetch(url)).json()
  if (!appointment.value.materials) appointment.value.materials = []
})
</script>

<template>
  <div v-if="appointment" class="details">
    <div v-if="appointment.self">
      <h2>Modifica Appuntamento:</h2>

      <AppForm 
        v-model:id="appointment.self"
        v-model:date="appointment.date"
        v-model:service="appointment.service"
        v-model:materials="appointment.materials"
        v-model:userId="appointment.userId"
      />

      <div class="submit">
        <button @click="goBack" class="subback">Indietro</button>
        <button class="subelim">Elimina</button>
        <button @click="goModify" class="subbut">Modifica</button>
        </div>

    </div>

    <div v-else>
      <h2>Appuntamento non trovato</h2>
    </div>
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

.subelim {
  background: red;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
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
