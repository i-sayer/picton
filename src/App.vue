<template>
  <div id="app">
  <header>
    <h1>GPTeach <span>Practicum Placement - vue</span></h1>
  </header>
  <main>
    <drawer>
      <section>
        <button>Map</button>
        <hr/>
        <Times/>
      </section>
    </drawer>
    <section>
    <Students msg="Students" @editThis="openEditDialog"/>
    <Places msg="Practices" @editThis="openEditDialog"/>
    <Staff msg="Doctors" @editThis="openEditDialog"/>
    </section>
  </main>
  <modal-dialog/>
  <uoaIcons/>
  
  </div>
</template>

<script>
import Students from './components/Students.vue'
import Places from './components/Places.vue'
import Staff from './components/Staff.vue'
import Times from './components/Times.vue'
import uoaIcons from './components/uoa-icon.vue'
import modalDialog from './components/modalDialog.vue'
import drawer from './components/drawer.vue'
import {EventBus} from './event-bus'

export default {
  name: 'App',
  components: {
    Students, Places, Staff, Times, uoaIcons, modalDialog, drawer//, icon24
  },
  methods:{
    openEditDialog: function(record, name, cb){
      EventBus.$emit('open-dialog', record, name, cb);
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
