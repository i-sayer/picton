<template>
    <ul class="tree-list">
      <node-tree :node="treeData"></node-tree>
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
  }
};
</script>

<style>
.tree-list, .tree-list ul {
  padding-left: 12px;
  list-style-type: none;
}
</style>