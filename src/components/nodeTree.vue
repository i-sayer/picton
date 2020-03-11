<template>
  <li v-if="node.children" class="folder" :class="{'closed':closed}">
    <span @click.self="toggleOpen">{{ node.label }}</span>
    <ul>
      <node v-for="child in node.children" v-bind:key="child.ord" :node="child"></node>
    </ul>
  </li>
  <li v-else>
    <span @click.self="selectLeaf" :data-id="node.id">{{ node.label }}</span>
  </li>
</template>

<script>
export default {
  name: "node",
  data: function() {
    return {
      closed: true
    };
  },
  methods: {
    selectLeaf: function(ev) {
      console.log(ev.target.dataset.id); // add $emit here to init action
    },
    closeBranch: function(dis, bale) {
      let th = 0,
        oh = 0,
        wnode = dis,
        myul = undefined;
        /* need to find any descendant nodes that are open and close them first */
        let openChild = dis.$children.filter(u => u.$data.closed == false)[0];
        let cstack = [];
        while (openChild) {
          cstack.push(openChild);
          openChild = openChild.$children
            ? openChild.$children.filter(u => u.$data.closed == false)[0]
            : undefined;
        }
        while (cstack.length) {
          let tmp = cstack.pop();
          tmp.$data.closed = true;
          th += tmp.$children.length * 27;
          myul = tmp.$el.querySelector("ul");
          myul.style.maxHeight = "0";
        }
        th += wnode.node.children.length * 27;
        while (wnode.node) {
          myul = wnode.$el.querySelector("ul");
          oh = parseInt(myul.style.maxHeight)||0;
          myul.style.maxHeight = oh - th + "px";
          if (wnode===bale) // don't go to top if this was a sibling branch
            break;
          wnode = wnode.$parent;
        }
        dis.closed = true;
    },
    toggleOpen: function() { // open/close clicked node tree, only allow 1 sibling open at a time
      let th = 0,
        wnode = this,
        chk = this.$parent,
        myul = undefined;
      if (this.closed) {
        /* open a branch, check for open siblings and close them first */
        if (chk) {
          chk = chk.$children.filter(u=>!u.closed)[0];
          if (chk)
            this.closeBranch(chk, chk);
        }
        while (wnode.node) {
          myul = wnode.$el.querySelector("ul");
          th += wnode.node.children.length * 27;
          myul.style.maxHeight = th + "px";
          wnode = wnode.$parent;
        }
        this.closed = false;
      } else {
        this.closeBranch(this);
      }
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
.tree-list li > span::after {
  font-size: 1.2rem;
  margin-left: 4px;
}
.tree-list li.folder > span::before {
  content: "-";
  display: inline-block;
  width: 14px;
  margin-right: 4px;
}
.tree-list li.folder.closed > span::before {
  content: "+";
}
.tree-list li.folder.closed > span::after {
  content: "\1F5C0";
}
.tree-list li.folder > span::after {
  content: "\1F5C1";
}
li.folder > ul {
  transition: max-height 250ms ease-out;
  overflow: hidden;
}
li.folder.closed > ul {
  max-height: 0;
}
</style>