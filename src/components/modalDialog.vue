<template>
    <div class="blanket" :class="active?'active':''" @click="hide">
        <form class="dialogBox" ref="dialogBox">
            <h3><span>{{dialogTitle}}</span><div @click.prevent="cancel"><icon24 icon-id="close" /></div></h3>
            <label v-for='(field,ix) in fields' v-bind:key='ix'>
                <span>{{field.name}}</span>
                <!-- <input :name="fields[ix].name" type="text" :value="fields[ix].value" :class="fields[ix].autofocus?'autofoo':''" /> -->
                <input :name="fields[ix].name" type="text" :value="fields[ix].value" :class="fields[ix].autofocus?'meme':''" />
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
            savecb: undefined,
            fields: []
        }
    },
    components:{
        icon24
    },
    created(){
        EventBus.$on("open-dialog", (rec, t, fsave) => {
            this.dialogTitle = `Edit ${t.name}`;
            this.savecb = fsave;
            this.prep(rec, t.match);
            this.show();
        });
        // EventBus.$on("open-dialog", (rec, name, fsave, match) => {
        //     this.dialogTitle = `Edit ${name}`;
        //     this.savecb = fsave;
        //     match = "Auckland";
        //     this.prep(rec, match);
        //     this.show();
        // });
    },
    methods:{
        prep: function (rec, match) {
            this.rec = rec;
            this.fields = Object.keys(rec).map(u=>{
                let v = rec[u];
                let o = {"name":u, "value":v};
                if (v==match)
                    Object.assign(o, {autofocus:1});
                return o;
            });
        },
        save: function () {
            this.savecb(this.$refs.dialogBox);
            this.active = false;
        },
        cancel: function () {
            console.log("Canceled");
            this.active = false;
        },
        show: function () {
            this.active = true;
            this.$nextTick(()=>{ // this is an attempt to set the focus to the field who's value matches the text node clicked on the card
                let af = this.$refs.dialogBox && this.$refs.dialogBox.querySelector('.meme');
                if (af) {
                    af.focus();
                    af.select();
                }
            });
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
.dialogBox>h3>span {
    display: inline-block;
    width: calc(100% - 24px);
    height: 24px;
}
.dialogBox>h3>div {
    display: inline-block;
    width: 24px;
    height: 24px;
}
.dialogBox>h3>div>svg {
    fill: white;
    stroke: white;
    position: absolute;
    right: -16px;
    top: -4px;
    cursor: pointer;
}
</style>

