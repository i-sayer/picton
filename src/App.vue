<template>
  <div id="app">
  <header>
    <h1>GPTeach <span>Practicum Placement - vue</span></h1>
  </header>
  <main>
    <Students msg="Students"/>
  </main>
  <uoaIcons/>
  </div>
</template>

<script>
import Students from './components/Students.vue'
import uoaIcons from './components/uoa-icon.vue'
//import icon24 from './components/icon24.vue'
//<svg><use href="#account"/></svg>

export default {
  name: 'App',
  components: {
    Students, uoaIcons//, icon24
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
