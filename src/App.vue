<template>
  <div id="app">
  <header>
    <h1>Picton <span>AMRF MSLC Database</span></h1>
  </header>
  <main>
    <drawer>
      <section>
        <button>Upload</button>
        <hr/>
        <tree :tree-data="tree" />
      </section>
    </drawer>
    <section>
    <Thumnails msg="Thumnails" @editThis="openEditDialog"/>
    <Metadata msg="Metadata" @editThis="openEditDialog"/>
    </section>
  </main>
  <modal-dialog/>
  <uoaIcons/>
  
  </div>
</template>

<script>
import Thumnails from './components/Thumnails.vue'
import Metadata from './components/Metadata.vue'
import uoaIcons from './components/uoa-icon.vue'
import modalDialog from './components/modalDialog.vue'
import drawer from './components/drawer.vue'
import tree from './components/Tree.vue'
import {EventBus} from './event-bus'

export default {
  name: 'App',
  data: () => ({
    tree: {}
  }),
    components: {
    Thumnails, Metadata, uoaIcons, modalDialog, drawer, tree//, icon24
  },
  methods:{
    openEditDialog: function(record, name, cb){
      EventBus.$emit('open-dialog', record, name, cb);
    }
  },
  mounted: function(){
    this.tree = {
   "id":"root",
   "label":"General",
   "children":[
      {
         "id":"lbl_cl_6250583",
         "label":"AMRF MSLC Database",
         "children":[
            {
               "id":"lbl_cl_6250588",
               "label":"Pathology Collection",
               "children":[
                  {
                     "id":"lbl_cl_6135347",
                     "label":"Musculoskeletal System"
                  },
                  {
                     "id":"lbl_cl_6140947",
                     "label":"Cardiovascular System"
                  },
                  {
                     "id":"lbl_cl_6142197",
                     "label":"Respiratory System"
                  },
                  {
                     "id":"lbl_cl_6143102",
                     "label":"Gastrointestinal System"
                  },
                  {
                     "id":"lbl_cl_6159350",
                     "label":"Genitourinary System (including Obstetrics)"
                  },
                  {
                     "id":"lbl_cl_6168255",
                     "label":"Haematology and Immunology"
                  },
                  {
                     "id":"lbl_cl_6168932",
                     "label":"Forensic / Miscellaneous"
                  },
                  {
                     "id":"lbl_cl_6179570",
                     "label":"Nervous System"
                  },
                  {
                     "id":"lbl_cl_6189734",
                     "label":"Endocrine System"
                  },
                  {
                     "id":"lbl_cl_6250839",
                     "label":"Skin, Soft Tissue and Breast"
                  }
               ]
            },
            {
               "id":"lbl_cl_6250607",
               "label":"Radiology Images",
               "children":[
                  {
                     "id":"lbl_cl_6184908",
                     "label":"Head & Neck"
                  },
                  {
                     "id":"lbl_cl_6185948",
                     "label":"Thorax"
                  },
                  {
                     "id":"lbl_cl_6187148",
                     "label":"Abdomen"
                  },
                  {
                     "id":"lbl_cl_6187947",
                     "label":"Back"
                  },
                  {
                     "id":"lbl_cl_6188214",
                     "label":"Upper Limb"
                  },
                  {
                     "id":"lbl_cl_6188913",
                     "label":"Lower Limb"
                  },
                  {
                     "id":"lbl_cl_6193437",
                     "label":"Pelvis"
                  }
               ]
            }
         ]
      },
      {
         "id":"lbl_cl_6265815",
         "label":"Virtual Slide Database",
         "children":[
            {
               "id":"lbl_cl_6286985",
               "label":"Human Histopath Atlas",
               "children":[
                  {
                     "id":"lbl_cl_6286986",
                     "label":"Cardiovascular"
                  },
                  {
                     "id":"lbl_cl_6286989",
                     "label":"Endocrine"
                  },
                  {
                     "id":"lbl_cl_6286990",
                     "label":"Forensic / Miscellaneous"
                  },
                  {
                     "id":"lbl_cl_6286987",
                     "label":"Gastrointestinal system"
                  },
                  {
                     "id":"lbl_cl_6286988",
                     "label":"Genitourinary system including Obstetrics"
                  },
                  {
                     "id":"lbl_cl_6286992",
                     "label":"Haematology and Immunology"
                  },
                  {
                     "id":"lbl_cl_6286993",
                     "label":"Musculoskeletal"
                  },
                  {
                     "id":"lbl_cl_6286991",
                     "label":"Nervous"
                  },
                  {
                     "id":"lbl_cl_6286994",
                     "label":"Respiratory"
                  },
                  {
                     "id":"lbl_cl_6286995",
                     "label":"Skin, soft tissue and breast"
                  }
               ]
            }
         ]
      }
   ]
}  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
