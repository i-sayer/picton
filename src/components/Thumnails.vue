<template>
    <div id="thumbs" class="card-list" :class="{'full-width':fullWidth}">
        <h3 v-on:click="toggleFullWidth">
            <icon24 v-if="!fullWidth" icon-id="chevron-right" />
            <icon24 v-if="fullWidth" icon-id="chevron-left" />
            {{msg}}
            <icon24 icon-id="sunglasses"/>
        </h3>
    </div>
</template>

<script>
import icon24 from '../components/icon24.vue'
export default {
    name: "Thumnails",
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
        toggleFullWidth: function(){
            this.fullWidth ^= 1;
        }
    },
    props: ['msg'],
    mounted: function(){
        // maybe start an animation?
    }
}
</script>

<style>
#thumbs {
    background: url(/img/picton.svg) no-repeat;
    background-size: 70%;
    min-height: calc( 100vh - 150px);
    background-position: center;
}
</style>