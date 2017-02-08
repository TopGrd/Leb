class Element {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }

  render() {
    let ele = document.createElement(this.tag);
    for (let prop in this.props) {
      ele.setAttribute(prop, this.props[prop]);
    }

    let children = this.children || [];
    let childEle;
    if(children instanceof Array) {
      children.map(child => {
        if (child instanceof Element) {
          childEle = child.render();
          ele.appendChild(childEle);
        } else if (child instanceof HTMLDivElement) {
          ele.appendChild(child);
        } else {
          childEle = document.createTextNode(child);
          ele.appendChild(childEle);
        }
      });
    } else {
      childEle = document.createTextNode(children);
      ele.appendChild(childEle);
    }

    return ele;
  }

}

const el = (tag, props, children) => new Element(tag, props, children);

export default el;
