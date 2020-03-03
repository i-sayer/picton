<template>
    <div class="item-list" :class="{'full-width':fullWidth}">
        <h3 v-on:click="toggleFullWidth">
            <icon24 v-if="!fullWidth" icon-id="chevron-right" />
            <icon24 v-if="fullWidth" icon-id="chevron-left" />
            {{msg}}
            <icon24 icon-id="note-text"/>
        </h3>
        <div class="item" v-for="(tag,ix) in List" v-bind:key="tag" @click="editPlace" :class ="{'selected':ix===selected}">
            <h4>{{tag}}</h4>
        </div>
        
    </div>
</template>

<script>
//import axios from 'axios'
import icon24 from '../components/icon24.vue'
import helperMethods from '../helpers'
export default {
    data() {
        return {
            List: ["TITLE","SUBTITLE","SPECIMEN NUMBER","GENDER","AGE","CLINICAL SUMMARY","MACROSCOPIC SUMMARY","MICROSCOPIC SUMMARY","OTHER NOTES","KEYWORDS","OBJECT","SYSTEM","UOA RF TAG","HOSP PM NO","STATUS","SERVICE DATE","SERVICE FOLLOW-UP","SERVICE COMMENT","ADDITIONAL INFORMATION","EDITOR","Contributor","Diagnosis","Disease Process","Highest Magnitude","Organ","Slide Code","Species"],
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
    }
}
</script>

<style>
</style>

