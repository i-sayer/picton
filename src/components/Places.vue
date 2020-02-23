<template>
    <div class="card-list">
        <h3><collapser />{{msg}}&nbsp;<icon24 icon-id="hospital-building"/></h3>
        <div class="card" v-for="(pel,ix) in List" v-bind:key="ix" v-on:click="editPlace">
            <h4>{{pel.practice_id}}<span>{{pel.dhb}}</span></h4>
            <main>
                <div>{{pel.practiceName}}</div>
                <div>{{pel.physicalAddress}}</div>
                <div>{{pel.suburb}}</div>
                <div v-if="pel.city != pel.suburb">{{pel.city}}</div>
            </main>
            <footer>{{pel.phone}}</footer>
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
            List: []
        }
    },
    methods: {
        editPlace: function(e){
            let cardid = e.target.firstElementChild.dataset.id;
            let lastSelected = e.target.parentElement.querySelector(".selected");
            if (lastSelected)
                lastSelected.classList.remove("selected");
            this.selected = this.List.findIndex(u=>u.id==cardid);
            e.target.classList.add('selected');
            this.$emit('editThis', this.List[this.selected], "Practice");
        }
    },
    components: {
        icon24, Collapser
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-place.php?k=8584073464102069&search=wai")
        .then(response=>{this.List = response.data.places})
        .catch(error => {console.log(error)})
    }
}
</script>

<style scoped>
.card::after {
    content: none;
}
.card>h4>span {
    font-weight: 400;
    font-style: italic;
    float: right;
}
</style>

