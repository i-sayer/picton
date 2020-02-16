<template>
    <div class="card-list">
        <h3><collapser /><icon24 icon-id="account"/>{{msg}}</h3>
        <div class="card" v-for="student in studentList" v-bind:key="student">
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
    data() {
        return {
            studentList: [],
        }
    },
    components: {
        icon24, Collapser
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-student.php?k=8584073464102069&search=john")
        .then(response=>{this.studentList = response.data.students})
        .catch(error => {console.log(error)})
    }
}
</script>

