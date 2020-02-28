<template>
    <div class="card-list" :class="{'full-width':fullWidth}">
        <h3 v-on:click="toggleFullWidth">
            <icon24 v-if="!fullWidth" icon-id="chevron-right" />
            <icon24 v-if="fullWidth" icon-id="chevron-left" />
            {{msg}}
            <icon24 icon-id="stethoscope"/>
        </h3>
        <div class="card" v-for="(pel,ix) in List" v-bind:key="ix" @click="editStaff" :class ="{'selected':ix===selected}">
            <h4 :data-id="pel.id">{{pel.Name}}</h4>
            <main>
                <div>{{pel.Practice}}</div>
            </main>
            <footer>{{pel.Phone}}</footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import icon24 from '../components/icon24.vue'
import helperMethods from '../helpers'
export default {
    data() {
        return {
            List: [],
            selected: undefined,
            fullWidth: false
        }
    },
    components: {
        icon24
    },
    methods: {
        ...helperMethods,
        editStaff: function(e){
            let cardid = e.target.firstElementChild.dataset.id;
            let newselection = this.List.findIndex(u=>u.id==cardid);
            if (this.selected===newselection){
                var txt = this.getChildText(e);
                this.$emit('editThis', this.List[this.selected], {"name":"Doctor","match":txt}, this.save);
            } else
                this.selected = newselection;
        },
        toggleFullWidth: function(){
            this.fullWidth ^= 1;
        },
        save: function(dlgform){
            let f, fields = dlgform.querySelectorAll('input');
            for (f of fields)
                this.List[this.selected][f.name] = f.value ;
        }
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-gp.php?k=8584073464102069&search=john")
        .then(response=>{this.List = response.data.personnel})
        .catch(error => {console.log(error)})
    }
}
</script>

