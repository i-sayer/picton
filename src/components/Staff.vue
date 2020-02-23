<template>
    <div class="card-list">
        <h3><collapser />{{msg}}<icon24 icon-id="stethoscope"/></h3>
        <div class="card" v-for="(pel,ix) in List" v-bind:key="ix" v-on:click="editStaff">
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
import Collapser from '../components/collapser.vue'
export default {
    data() {
        return {
            List: [],
            selected: undefined
        }
    },
    components: {
        icon24, Collapser
    },
    methods: {
        editStaff: function(e){
            let cardid = e.target.firstElementChild.dataset.id;
            let lastSelected = e.target.parentElement.querySelector(".selected");
            if (lastSelected)
                lastSelected.classList.remove("selected");
            this.selected = this.List.findIndex(u=>u.id==cardid);
            e.target.classList.add('selected');
            this.$emit('editThis', this.List[this.selected], "Doctor");
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

