<template>
    <div class="blanket" :class="active?'active':''" @click="hide">
        <form class="dialogBox" ref="dialogBox">
            <h3>{{dialogTitle}}<icon24 icon-id="close" @click.prevent="cancel" /></h3>
            <label v-for='(field,ix) in fields' v-bind:key='ix'>
                <span>{{field.name}}</span>
                <input type="text" :value="fields[ix].value" :autofocus="ix==0"/>
            </label>
            <footer><button @click.prevent="save">Save</button><button @click.prevent="cancel">Cancel</button></footer>
        </form>
    </div>
</template>

<script>
import {EventBus} from '../event-bus';
import icon24 from '../components/icon24.vue'
export default {
    data() {
        return {
            dialogTitle: 'Dialog',
            active: false,
            rec: undefined,
            fields: []
        }
    },
    components:{
        icon24
    },
    created(){
        EventBus.$on("open-dialog", (rec, name) => {
            //this.$refs["form"].textContent = [rec.firstName,rec.lastName].join(" ");
            this.dialogTitle = `Edit ${name}`;
            this.prep(rec);
            this.show();
        });
    },
    methods:{
        prep: function (rec) {
            this.rec = rec;
            this.fields = Object.keys(rec).map(u=>{
                let v = rec[u];
                return {"name":u, "value":v};
            });
        },
        save: function () {
            console.log("Saving");
            this.active = false;
        },
        cancel: function () {
            console.log("Canceled");
            this.active = false;
        },
        show: function () {
            this.active = true;
            let af = this.$refs.dialogBox && this.$refs.dialogBox.querySelector('[autofocus]');
            if (af)
                af.focus();
        },
        hide: function (event) { /* something wrong here... this is being called by the svg close when it should be calling cancel() */
            if (event.target.classList.contains('blanket')||event.target.classList.contains('icon'))
                this.active = false;
        }
    }
}
</script>

<style>
.blanket {
    position: fixed;
    left:0;top:0;right:0;bottom:0;
    opacity:0;
    display: flex;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
}

.blanket.active {
    opacity: 1;
    pointer-events: unset;
}

.dialogBox {
    width: 100%;
    overflow-y: auto;
    margin: auto;
    padding: 0 1em;
    border: 1px solid var(--color-primary);
    background-image: linear-gradient(var(--color-secondary) 1.8em, var(--color-medium) 1.8em);
}
@media (min-width: 764px) {
    .dialogBox {
        width: 720px;
    }
}
@media (min-width: 1100px) {
    .dialogBox {
        width: 1100px;
    }
}
.dialogBox>h3 {
    color: var(--color-light-1);
    position: relative;
}
.dialogBox>h3>svg {
    fill: white;
    stroke: white;
    position: absolute;
    right: -16px;
    top: -4px;
    cursor: pointer;
}
</style>

