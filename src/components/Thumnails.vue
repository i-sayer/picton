<template>
    <div id="thumbs" class="card-list">
        <div v-for="(u,i) in List" v-bind:key="i" class="card" @click.self="clickCard" :data-id="i" :class="{'selected':i==selected}" >
            <h4>{{u.meta.TITLE}}</h4>
            <img :src="u.daturl" alt="" />
            <footer>{{u.meta["SPECIMEN NUMBER"]}}</footer>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import {EventBus} from '../event-bus'
export default {
    name: "Thumnails",
    data() {
        return {
            List: [],
            noItems: true,
            selected: undefined,
            fullWidth: false
        }
    },
    methods: {
        clickCard: function(e){
            let i = e.target.dataset.id;
            this.selected = i;
            this.$root.$emit("show_metadata", this.List[i].meta);
            EventBus.$emit("set_tab", 1);
        }
    },
    props: ['msg'],
    mounted: function(){
        this.$root.$on("select-leaf", async id => {
            console.log(id);
            this.selected = undefined;
            try {
                const res = await fetch(id+'.json');
                this.List = await (res.json());
                this.noItems=false;
                this.$root.$emit("show_metadata", {"SELECT AN ITEM":"none selected"});
            } catch (e) {
                this.List = [{meta:{"TITLE":"Error: No thumbnails found.", "CODE":e}}];
            }
        });
        
    }
}
</script>

<style>
#thumbs {
    background: url(/img/picton.svg) no-repeat;
    background-size: 70%;
    min-height: calc( 100vh - 120px);
    max-height: calc( 100vh - 120px);
    overflow-y: scroll;
    background-position: -300%;
    transition: background-position 200ms ease;
    padding: 12px;
}
#thumbs:empty {
    background-position: center;
}
.card>footer {
    background-color: var(--color-tertiary);
}
.card>img {
    object-fit: scale-down;
    flex: 1 0 auto;
    pointer-events: none;
}
</style>