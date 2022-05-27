<script setup>
import { ref, watchEffect } from "@vue/runtime-core"

const props = defineProps({
  id: String,
})

const APP_URL = `http://localhost:8080/api/v2/appointments/`
const appointment = ref(null)
let data = "aaaa"

function extractId (urlId) {
  return urlId.substring(urlId.lastIndexOf('/') + 1)
}

watchEffect(async () => {
  const url = APP_URL + props.id
  appointment.value = await (await fetch(url)).json()
  console.log(appointment)
})
</script>

<template>
  <div v-if="appointment" class="details">
    <div v-if="appointment.self">
      <h1>Modifica Appuntamento:</h1>
      <form>
        <legend>{{ extractId(appointment.self) }}  </legend>
        <label>data:</label>
        <input type="data" v-model="appointment.date"> 

        <label>servizio:</label>
        <select>
          <option value="cambio_gomme">Cambio Gomme</option>
          <option value="riparazione">Riparazione</option>
          <option value="controllo">Controllo</option>
        </select>

        <label>materiale:</label>
        <input type="materiale"> 
        <input type="number"> 
        <button class="aggiungi">aggiungi</button>
        <div class="gia">
        <fieldset v-for="(material, index) in appointment.materials" :key="index">
          <input type="materiale" v-model="material.materialId"> 
          <input type="number" v-model="material.quantity"> 
          <hr>
        </fieldset>
        </div>

        <label>cliente:</label>
        <input type="cliente" v-model="appointment.userId"> 

        <div class="submit">
          <button class="subback">Back</button>
          <button class="subbut">Modify</button>
        </div>
      </form>
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

h1 {
  text-align: center;
  color: hsla(160, 100%, 37%, 1);

}

legend {
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: center;
}

.gia {
  background-color: rgba(194, 191, 191, 0.64);
}

.submit {
  padding-top: 2rem;
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

form {
  max-width: 1080px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
fieldset
{
  border: none;
  max-width:100%;
  padding:16px;	
}
</style>
