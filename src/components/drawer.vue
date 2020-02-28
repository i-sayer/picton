<template>
    <div class="drawer">
        <section>
            <h3 class="item" v-for="(i,ix) in List" v-bind:key="ix" @click="togglePanel" :class="{'open':i.active}">
                <icon24 :icon-id="i.i" />{{i.t}}
            </h3>
        </section>
        <hr/>
        <slot>More Content</slot>
    </div>
</template>

<script>
import icon24 from '../components/icon24.vue'
export default {
    data() {
        return {
            List:[]
        }
    },
    components: {
        icon24
    },
    methods: {
        togglePanel: function(e){
            let key = e.target.textContent.trim();
            let item = this.List.find(u=>u.t==key);
            if (item) {
                item.active = ! item.p.classList.toggle("hidden");
            }
        }
    },
    mounted: function(){
        let h, cardlisths = document.querySelectorAll('.card-list>h3');
        for (h of cardlisths)
            this.List.push({
                t:h.textContent.trim(),
                i:h.lastElementChild.lastElementChild.href.baseVal.slice(1),
                p:h.parentElement,
                active: true
            });
    }
}
</script>

<style>
.drawer {
    flex-basis: 220px;
}
.drawer>section>.item:not(.open) {
    opacity: 0.65;
}
.drawer>section>.item {
    min-height: 40px;
    padding: 0 24px;
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>