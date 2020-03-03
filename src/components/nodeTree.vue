<template>
  <li :class="{'folder':node.children,'closed':closed}">
    <span @click.self="toggleOpen">{{ node.label }}</span>

    <ul v-if="node.children">
      <node v-for="child in node.children" v-bind:key="child.label" :node="child"></node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "node",
  data: function () {
    return {
      closed: true
    }
  },
  methods: {
    toggleOpen: function (){
        let atleast1 = false;
        let singleOpenMode = true;// true = single sibling open at once mode
        if (this.closed) {
          if (singleOpenMode) {
            this.$parent.$children.forEach(u=>{
              if (u!=this) {
                if (!u.closed)
                  u.closed = atleast1 |= true;
              }
            });
          }
          setTimeout(()=>this.closed = false, atleast1?250:1); // min delay if nothing else closed
        } else
          this.closed = true;
      }
  },
  props: {
    node: Object
  }
};
</script>
<style>
.tree-list li:not(.folder) {
  border-bottom: 1px solid var(--color-tertiary);
}
.tree-list li:not(.folder):hover {
  background-color: #6fefc4;
}
.tree-list li>span::after {
  font-size: 1.2rem;
  margin-left: 4px;
}
.tree-list li.folder>span::before {
  /* content: "\23f6"; */
  content: "-";
  display: inline-block;
  width: 14px;
  /* border: 1px solid var(--color-tertiary); */
  margin-right: 4px;
}
.tree-list li.folder.closed>span::before {
  content: "+";
}
.tree-list li.folder.closed>span::after {
  content: "\1F5C0";
}
.tree-list li.folder>span::after {
  content: "\1F5C1";
}
li.folder>ul {
  max-height: 80vh;
  transition: max-height 300ms ease-in-out;
  overflow: hidden;
}
li.folder.closed>ul {
  max-height: 0;
}
</style>