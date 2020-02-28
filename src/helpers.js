export default {
    walkChildren: function (el,ev) {
    let rv = '';
    let chiln = undefined;
    for (chiln of el.children) {
      let rect = chiln.getBoundingClientRect();
      if ((ev.x > rect.x) && (ev.x < (rect.x+rect.width))) {
        if (ev.y > rect.y && (ev.y < (rect.y+rect.height))){
          if (chiln.childElementCount)
              rv = this.walkChildren(chiln, ev);
          else
              rv = chiln.textContent;
          break;
        }
      }
    }
    return rv;
  },
  getChildText: function(ev) {
    let el = ev.target, rv = undefined;
    rv = this.walkChildren(el, ev);
    return rv;
  }
}
  