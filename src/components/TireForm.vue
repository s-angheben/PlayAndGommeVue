<script setup>
const props = defineProps({
  id : String,
  brand : String, 
  model : String,
  length : Number,
  height : Number,
  diameter : Number,
  quantity : Number,
  type : String,
  price : Number
})

const emits = defineEmits([
  'update:id',
  'update:brand',
  'update:model',
  'update:length',
  'update:height',
  'update:diameter',
  'update:quantity',
  'update:type',
  'update:price'
])

</script>

<template>
  <form @submit.prevent>
    <legend> {{ id }} </legend>
    <label>brand:</label>
    <input type="input" :value="brand" @input="$emit('update:brand', $event.target.value)"> 

    <label>model:</label>
    <input type="input" :value="model" @input="$emit('update:model', $event.target.value)"> 

    <label>length:</label>
    <input type="number" step="0.01" :value="length" @input="$emit('update:length', parseFloat($event.target.value))"> 

    <label>height:</label>
    <input type="number" step="0.01" :value="height" @input="$emit('update:height', parseFloat($event.target.value))"> 

    <label>diameter:</label>
    <input type="number" step="0.01" :value="diameter" @input="$emit('update:diameter', parseFloat($event.target.value))"> 

    <label>quantity:</label>
    <input type="number" :value="quantity" @input="$emit('update:quantity', parseFloat($event.target.value))"> 

    <label>type:</label>

    <select :value="type" @input="$emit('update:type', $event.target.value)">
      <option value="invernali">Invernali</option>
      <option value="estive">Estive</option>
      <option value="quattro_stagioni">Quattro Stagioni</option>
    </select>

    <label>price:</label>
    <input type="number" step="0.01" :value="price" @input="$emit('update:price', parseFloat($event.target.value))"> 
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
