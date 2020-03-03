<template>
    <tree-view>
        <tree-menu :label="treeRoot.label" :nodes="treeRoot.nodes" />
    </tree-view>
</template>

<script>
import treeMenu from '../components/tree-menu.vue'
export default {
    data() {
        return {
        treeRoot: {}
        }
    },
    components: { treeMenu },
    methods: {
        toggleFullWidth: function(){
        }
    }
}
</script>

