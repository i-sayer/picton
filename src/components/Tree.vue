<template>
    <ul class="tree-list">
      <node-tree :node="treeData" :lh="lineHeight"></node-tree>
    </ul>
</template>

<script>
import NodeTree from "./nodeTree.vue";

export default {
  props: {
    treeData: Object,
  },
  components: {
    NodeTree
  },
  data: function () {
    return {
      lineHeight: 27
    }
  },
  updated: function(){
    this.lineHeight = this.$el.offsetHeight;
  }
};
</script>

<style>
.tree-list, .tree-list ul {
  padding-left: 12px;
  list-style-type: none;
}
</style>