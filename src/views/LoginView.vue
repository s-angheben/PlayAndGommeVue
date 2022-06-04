<script setup>
import { ref } from "@vue/runtime-core"

const LOGIN_URL = `http://localhost:8080/api/v2/login/`

const registerActive = ref();
const usernameLogin = ref();
const passwordLogin = ref();
const usernameReg = ref();
const passwordReg = ref();
const confirmReg = ref();

const logged = ref();

function doLogout(){
  localStorage.removeItem('token');
  logged.value = false;
}
  
function doLogin() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      username: usernameLogin.value,
      password: passwordLogin.value
    })
  };
  fetch(LOGIN_URL, requestOptions)
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = data.error || response.status; 
        return Promise.reject(error);
    }

    //save the token
    localStorage.setItem('token', data.token);
    logged.value = true;

    usernameLogin.value = "";
    passwordLogin.value = "";
  })
  .catch(error => {
    console.log(error);
  })
}

function doRegister() {
}

</script>

<template>
<div id="app">
   <div class="login-page">
     <div v-if="!logged" class="logged">
      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login">
                  <h1>Accedi</h1>
                  <form class="form-group" @submit.prevent>
                     <input v-model="usernameLogin" type="username" class="form-control" placeholder="Username" required>
                     <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
                     <input type="submit" class="btn btn-primary" @click="doLogin">
                     <p>Non hai un account? <a href="#" @click="registerActive = !registerActive">Registrati qui</a>
                     </p>
                  </form>
               </div>

               <div v-else class="card register">
                  <h1>Registrati</h1>
                  <form class="form-group" @submit.prevent>
                     <input v-model="usernameReg" type="username" class="form-control" placeholder="Username" required>
                     <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                     <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                     <input type="submit" class="btn btn-primary" @click="doRegister">
                     <p>Hai gia' un account? <a href="#" @click="registerActive = !registerActive">Accedi qui</a>
                     </p>
                  </form>
               </div>
            </div>
         </div>
        </div>
      </div>
      <div v-else class="logout">
        <button @click="doLogout">Logout</button>
      </div>
   </div>
</div>
</template>
