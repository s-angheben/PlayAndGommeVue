<script setup>
import TireForm from '@/components/TireForm.vue'
import Toast from '@/components/Toast.vue'
import { computed, ref, watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
})

const router = useRouter()

const TIRE_URL = `http://localhost:8080/api/v2/tires/`
const tire = ref(null)

const url = computed (() => {
  return TIRE_URL + props.id;
})

const showToast = ref(false);
const msgToast = ref("error")
const colorToast = ref("red")

function extractId (urlId) {
  return urlId.substring(urlId.lastIndexOf('/') + 1)
}

function goBack(){
  router.go(-1)
}

function goModify(){
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tire.value)
  };
  fetch(url.value, requestOptions)
  .then(async response => {
    if (!response.ok) {
        const data = await response.json();
        const error = data.error || response.status; 
        return Promise.reject(error);
    }

    msgToast.value = "Pneumatico Aggiornato";
    colorToast.value = "green";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false
      goBack();
      }, 2000);

  })
  .catch(error => {
    msgToast.value = "error: " + error;
    colorToast.value = "red";
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000)
  })
}

function goElim() {
  console.log("ciuao");
  const requestOptions = {
    method: "DELETE",
  };
  fetch(url.value, requestOptions)
  .then(async response => {
    if (!response.ok) {
        const data = await response.json();
        const error = data.error || response.status; 
        return Promise.reject(error);
    }

    msgToast.value = "Pneumatico Eliminato";
    colorToast.value = "red";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false
      goBack();
      }, 2000);
  })
  .catch(error => {
    msgToast.value = "error: " + error;
    colorToast.value = "red";
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000)
  })
}

watchEffect(async () => {
  const url = TIRE_URL + props.id
  tire.value = await (await fetch(url)).json()
})
</script>

<template>
  <div v-if="tire" class="details">
    <div v-if="tire.self">
      <Toast v-if="showToast" 
        :msg="msgToast"
        :color="colorToast"  
      />
      <h2>Modifica Materiale:</h2>

      <TireForm 
        v-model:id="tire.self"
        v-model:brand="tire.brand"
        v-model:model="tire.model"
        v-model:length="tire.length"
        v-model:height="tire.height"
        v-model:diameter="tire.diameter"
        v-model:quantity="tire.quantity"
        v-model:type="tire.type"
        v-model:price="tire.price"
      />

      <div class="submit">
        <button @click="goBack" class="subback">Indietro</button>
        <button @click="goElim" class="subelim">Elimina</button>
        <button @click="goModify" class="subbut">Modifica</button>
        </div>

    </div>

    <div v-else>
      <h2>Materiale non trovato</h2>
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

