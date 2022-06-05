<script setup>
import { computed, ref, watchEffect } from "@vue/runtime-core"
import Toast from '@/components/Toast.vue'
import { store } from '@/store/store.js'

const LOGIN_URL = `http://localhost:8080/api/v2/login/`;
const USERS_URL = `http://localhost:8080/api/v2/users/`;

const registerActive = ref();
// login
const usernameLogin = ref();
const passwordLogin = ref();
// registration
const usernameReg = ref();
const passwordReg = ref();
const passwordConf = ref();

const showToast = ref(false);
const msgToast = ref("error")
const colorToast = ref("red")

function doLogout(){
//  localStorage.removeItem('token');
  store.logged = false;
  store.username = "";
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
    // localStorage.setItem('token', data.token);
    store.logged = true;
    store.username = usernameLogin.value;
    store.token = data.token

    usernameLogin.value = "";
    passwordLogin.value = "";

    msgToast.value = "Login effettuato";
    colorToast.value = "green";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false
      }, 1000);
  })
  .catch(error => {
    msgToast.value = "error: " + error;
    colorToast.value = "red";
    showToast.value = true;

    usernameLogin.value = "";
    passwordLogin.value = "";

    setTimeout(() => showToast.value = false, 3000)
    console.log(error);
  })
}

function doRegister() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      username: usernameReg.value,
      password: passwordReg.value
    })
  };
  fetch(USERS_URL, requestOptions)
  .then(async response => {
    if (!response.ok) {
        const data = await response.json();
        const error = data.error || response.status; 
        return Promise.reject(error);
    }

    usernameReg.value = "";
    passwordReg.value = "";

    msgToast.value = "Registrazione effettuata";
    colorToast.value = "green";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      registerActive.value = false;
      }, 1000);
  })
  .catch(error => {
    msgToast.value = "error: " + error;
    colorToast.value = "red";
    showToast.value = true;

    usernameReg.value = "";
    passwordReg.value = "";

    setTimeout(() => showToast.value = false, 3000)
    console.log(error);
  })

}

</script>

<template>
<Toast v-if="showToast" 
  :msg="msgToast"
  :color="colorToast"  
/>
<div id="app">
   <div class="login-page">
     <div v-if="!store.logged" class="logged">
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
