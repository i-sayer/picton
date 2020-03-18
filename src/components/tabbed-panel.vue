<template>
    <div class="tab_wrap">
        <div class="tab_bar">
            <span v-for="(n,i) in tabNames" v-bind:key="n" :data-i="i"
            :class="{'selected':i==selected_tab}"
            @click="clickTab" @keydown="clickTab" tabindex="0">{{n}}</span>
            <i style="width: 2em">&nbsp;</i>
        </div>
        <div v-for="(n,i) in tabNames" v-bind:key="n" class="tab" :class="{'selected':i==selected_tab}"><slot :name="n"></slot></div>
    </div>
</template>

<script>
import {EventBus} from '../event-bus'
export default {
    data: function() {
        return {
            selected_tab: 0,
            tabNames: Array
        }
    },
    props: ['tabstr'],
    methods: {
        clickTab: function(e){
            if (e.type=="keydown")
                if (e.keyCode!=32)
                    return;
            this.selected_tab = e.target.dataset.i;
        }
    },
    mounted: function(){
        this.tabNames = this.tabstr.split(",");
    },
    created: function(){
        EventBus.$on("set_tab",(idx)=>{this.selected_tab=idx});
    }
}
</script>

<style>
    .tab_wrap {
        margin-left: 6px;
    }
    .tab_bar>span.selected {
        background-color: var(--color-secondary);
        color:azure;
    }
    .tab_bar>span.selected::before,.tab_bar>span.selected::after {
        content:"";
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: absolute;
        border: 4px solid var(--color-error);
        border-color: transparent transparent var(--color-secondary) transparent;
        right:-16px;
        bottom:-4px;
        transform: rotate(45deg)
    }
    .tab_bar>span.selected::before {
        left:-16px;
        right: initial;
        transform: rotate(-45deg)
    }
    .tab_bar {
        display: flex;
        border-bottom: 4px solid var(--color-secondary);
    }
    .tab_bar>span {
        padding: 4px 8px;
        margin: 0 2px;
        background-color: var(--color-medium);
        font-size: 1.1rem;
        font-weight: bold;
        border-radius: 6px 6px 0 0;
        flex: 1 1 0;
        position: relative;
    }
    .tab_wrap>.tab:not(.selected){
        display: none;
    }
</style>