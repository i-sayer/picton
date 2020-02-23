<template>
    <div class="card-list">
        <h3><collapser />{{msg}}<icon24 icon-id="account"/></h3>
        <div class="card" v-for="(student,ix) in List" v-bind:key="ix" v-on:click="editStudent">
            <h4>{{student.auid}}</h4>
            <main>{{student.firstName+" "+student.lastName}}</main>
            <footer>{{student.mobile}}</footer>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import icon24 from '../components/icon24.vue'
import Collapser from '../components/collapser.vue'
export default {
    name: "Students",
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
        editStudent: function(e){
            let cardid = e.target.firstElementChild.textContent;
            let lastSelected = e.target.parentElement.querySelector(".selected");
            if (lastSelected)
                lastSelected.classList.remove("selected");
            this.selected = this.List.findIndex(u=>u.auid==cardid);
            e.target.classList.add('selected');
            this.$emit('editThis', this.List[this.selected], "Student");
        }
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-student.php?k=8584073464102069&search=john")
        .then(
            response=>{
                this.List = response.data.students;
            })
        .catch(error => {console.log(error)})
    }
}
</script>

