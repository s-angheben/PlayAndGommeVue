<script setup>
import TireForm from '@/components/TireForm.vue'
import { ref, watchEffect } from "@vue/runtime-core"
import { useRouter } from "vue-router";

const router = useRouter()

const TIRE_URL = `http://localhost:8080/api/v2/tires/`

const brand = ref ()
const model = ref ()
const length = ref ()
const height = ref ()
const diameter = ref ()
const quantity = ref ()
const type = ref ()
const price = ref ()

function goBack(){
  router.go(-1)
}

async function create() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      brand: brand,
      model: model,
      length: length,
      height: height,
      diameter: diameter,
      quantity: quantity,
      type: type,
      price: price
    })
  };
  const response = await fetch(TIRE_URL, requestOptions);
  console.log(response)
}

</script>

<template>
    <h2>Aggiungi Pneumatico: </h2>

    <TireForm 
      v-model:brand="brand"
      v-model:model="model"
      v-model:length="length"
      v-model:height="height"
      v-model:diameter="diameter"
      v-model:quantity="quantity"
      v-model:type="type"
      v-model:price="price"
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
