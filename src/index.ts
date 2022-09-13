export function toStr(n: number): string {
  return Number(n).toString();
}

export function drawRedRect(svg: SVGElement) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', toStr(0));
  rect.setAttribute('y', toStr(0));
  rect.setAttribute('fill', 'red');
  rect.setAttribute('width', toStr(100));
  rect.setAttribute('height', toStr(100));
  svg.appendChild(rect);
}
