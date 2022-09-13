export function createDiv() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
}

export function mount(parent: HTMLElement, child?: Node) {
  if (parent && child) {
    parent.appendChild(child);
  }
}

export function getAttributes(node: SVGElement, attributes: string[]) {
  return attributes.reduce((acc: Record<string, any>, cur: string) => {
    acc[cur] = node.getAttribute(cur);
    return acc;
  }, {});
}
