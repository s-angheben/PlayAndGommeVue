<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TitleApp from '@/components/TitleApp.vue'
import { store } from '@/store/store.js'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" height="100" />

    <div class="wrapper">
      <TitleApp msg="PlayAndGomme" />
      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/appointments">Appuntamenti</RouterLink>
        <RouterLink to="/tires">Magazzino</RouterLink>
        <RouterLink to="/calendar">Calendario</RouterLink>
        <RouterLink to="/basicUI">basicUI</RouterLink>
        <RouterLink to="/APIdoc">Api Documentation</RouterLink>
      </nav>
    </div>
    <h1 v-if="store.logged">User: {{store.username}} </h1>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  margin: 0 0;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    padding: 2rem;
  }

  #app {
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1.5rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
