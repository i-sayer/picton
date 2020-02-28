<template>
    <div class="card-list" :class="{'full-width':fullWidth}">
        <h3 v-on:click="toggleFullWidth">
            <icon24 v-if="!fullWidth" icon-id="chevron-right" />
            <icon24 v-if="fullWidth" icon-id="chevron-left" />
            {{msg}}
            <icon24 icon-id="hospital-building"/>
        </h3>
        <div class="card place" v-for="(pel,ix) in List" v-bind:key="ix" @click="editPlace" :class ="{'selected':ix===selected}">
            <h4 :data-id="pel.practice_id">{{pel.practice_id}}<span>{{pel.dhb}}</span></h4>
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
import helperMethods from '../helpers'
export default {
    data() {
        return {
            List: [],
            selected: undefined,
            fullWidth: false
        }
    },
    computed: {
        //sortedList: function () { return this.List.sort((a,b)=>b.practice_id-a.practice_id)} // eslint-disable-line
    },
    methods: {
        ...helperMethods,
        editPlace: function(e){
            let cardid = e.target.firstElementChild.dataset.id;
            let newselection = this.List.findIndex(u=>u.practice_id==cardid);
            if (this.selected===newselection){
                var txt = this.getChildText(e);
                this.$emit('editThis', this.List[this.selected], {"name":"Practice","match":txt}, this.save);
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
    components: {
        icon24
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-place.php?k=8584073464102069&search=wha")
        .then(response=>{this.List = response.data.places})
        .catch(error => {console.log(error)})
    }
}
</script>

<style>
.card.place::after {
    content: none;
}
.card.place>h4>span {
    font-weight: 400;
    font-style: italic;
    float: right;
}
</style>

