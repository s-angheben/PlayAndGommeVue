<script setup>
import { ref } from "@vue/runtime-core"
const props = defineProps([
  'id',
  'date',
  'service',
  'materials',
  'userId'
])

const emits = defineEmits([
  'update:id',
  'update:date',
  'update:service',
  'update:materials',
  'update:userId'
])

const materiale_agg = ref(null)
const quantita_agg = ref(null)

function addMaterial(){
  if (materiale_agg.value == null || quantita_agg.value == null) return 

  props.materials.push({
    "materialId": materiale_agg.value,
    "quantity": quantita_agg.value
  })
  materiale_agg.value = null
  quantita_agg.value = null
}

function removeMaterial(index) {
  if (index > -1)
    props.materials.splice(index, 1)
}

</script>

<template>
  <form @submit.prevent>
    <legend> {{ id }} </legend>
    <label>data:</label>
    <input type="input" :value="date" @input="$emit('update:date', $event.target.value)"> 

    <label>servizio:</label>
    <select :value="service" @input="$emit('update:service', $event.target.value)">
      <option value="cambio_gomme">Cambio Gomme</option>
      <option value="riparazione">Riparazione</option>
      <option value="controllo">Controllo</option>
    </select>

    <label>materiale:</label>
    <input type="materiale" v-model="materiale_agg"> 
    <input type="number" v-model="quantita_agg"> 
    <button @click="addMaterial" class="aggiungi_materiale">aggiungi</button>

    <div class="gia">
    <fieldset v-for="(material, index) in materials" :key="index">

 <!--     <input type="materiale" :value="material.materialId" @input="$emit('update:materials', $event.target.value)"> 
      <input type="number" :value="material.quantity" @input="$emit('update:materials', $event.target.value)"> -->
      <button @click="removeMaterial(index)" class="eliminaMateriale">X</button>
      <input type="materiale" v-model="material.materialId">
      <input type="number" v-model="material.quantity">
      <hr>
    </fieldset>
    </div>

    <label>cliente:</label>
    <input type="cliente" :value="userId" @input="$emit('update:userId', $event.target.value)"> 

  </form>
</template>


<style>
@media (min-width: 1024px) {
  .details {
    min-height: 100vh;
    align-items: top;
    padding-top: 2rem;
  }
}

.eliminaMateriale {
  background-color: red;
}

h2 {
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
  text-align: right;
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
