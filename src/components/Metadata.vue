<template>
    <div class="meta-item-grid">
        <div class="item" v-for="tag in Object.keys(List)" v-bind:key="tag" :class="{'spanall':tag=='TITLE'||Math.max(tag.length,List[tag].length)>22}">
            <h4 v-if="List[tag].length">{{tag}}</h4>
            <p v-if="List[tag].length">{{List[tag]}}</p>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
export default {
    data() {
        return {
            List: {"HELP":"Select a category then choose an item."},
            selected: undefined
        }
    },
    methods: {
        toggleFullWidth: function(){
            this.fullWidth ^= 1;
        }
    },
    props: ['msg'],
    mounted: function(){
        this.$root.$on("show_metadata", data=>{this.List=Object.keys(data).reduce((object,key)=>{
            if (data[key].length)
                object[key]=data[key]
            return object;
        }, {});
        });
    }
}
</script>

<style>
.meta-item-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0 6px;
}
.item>p {
    margin: 0.25em;
}
.item.spanall {
    grid-column: 1 / -1;
}
</style>

