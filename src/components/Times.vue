<template>
    <div class="times">
        <div class="cohort-year" v-for="(item,ix) in List" v-bind:key="ix">
            <h4>{{item.name}}</h4>
            <div class="cycle"></div>
        </div>
    </div>
</template>
/* times component represents a tree of Cohort-years > Cycles
*/

<script>
//import axios from 'axios'
export default {
    data() {
        return {
            List: [
                {name:"Year 2", cycles:[]},
                {name:"Year 4", cycles:[]},
                {name:"Year 5", cycles:[]},
                {name:"Year 6", cycles:[]}
            ],
            selected: 0
        }
    }    
}
</script>

<style>
.cohort-year {
    padding: 0 24px;
}
.cohort-year>h4 {
    margin: 0;
}
</style>
