<template>
  <div id="app">
  <header>
    <h1>GPTeach <span>Practicum Placement - vue</span></h1>
  </header>
  <main>
    <Students msg="Students" @editThis="openEditDialog"/>
    <Places msg="Practices" @editThis="openEditDialog"/>
    <Staff msg="Doctors" @editThis="openEditDialog"/>
  </main>
  <modal-dialog/>
  <uoaIcons/>
  </div>
</template>

<script>
import Students from './components/Students.vue'
import Places from './components/Places.vue'
import Staff from './components/Staff.vue'
import uoaIcons from './components/uoa-icon.vue'
import modalDialog from './components/modalDialog.vue'
import {EventBus} from './event-bus'
//import icon24 from './components/icon24.vue'
//<svg><use href="#account"/></svg>

export default {
  name: 'App',
  components: {
    Students, Places, Staff, uoaIcons, modalDialog//, icon24
  },
  methods:{
    openEditDialog: function(record, name){
      console.log(record.firstName);
      EventBus.$emit('open-dialog', record, name);
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
