<template>
    <svg class="icon-button" width="24" height="24" v-on:click="clickToggle" :class="state?'show':''">
        <use href="#close"></use>
    </svg>
</template>

<script>
export default {
    data() {
        return {
        state: true
        }
    },
    methods:{
        clickToggle: function (e){
            const domContainer = e.target.parentElement.parentElement;
            if (this.state){
            this.state = false;
            if (! this.initialHeight) {
                this.initialHeight = (domContainer.offsetHeight + 35);
            }
            domContainer.classList.add("collapse");
            domContainer.style.maxHeight = this.initialHeight+"px";
            window.setTimeout(() => domContainer.style.maxHeight = "35px", 1);
            } else {
            this.state = true;
            domContainer.classList.remove("collapse");
            // get height of 
            domContainer.style.maxHeight = this.initialHeight+"px";
            }
        }
    }
}
</script>

<style scoped>
use {
    transition: transform 0.3s linear;
    transform-origin: center;
    transform: rotate(-45deg);
}

.show>use {
    transform: rotate(0);
}
</style>

