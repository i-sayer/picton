<template>
    <div class="card-list">
        <h3><svg viewBox="0 0 24 24" width="32"><use href="#account"/></svg>{{msg}}</h3>
        <div class="card" v-for="student in studentList" v-bind:key="student">
            <h4>{{student.auid}}</h4>
            <main>{{student.firstName+" "+student.lastName}}</main>
            <footer>{{student.mobile}}</footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            studentList: [],
        }
    },
    props: ['msg'],
    mounted: function(){
        axios.get("http://gumli.auckland.ac.nz/cors-student.php?k=8584073464102069&search=john")
        .then(response=>{this.studentList = response.data.students})
        .catch(error => {console.log(error)})
    }
}
</script>

