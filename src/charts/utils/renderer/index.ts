import { ShapeParams } from '../../types';

export function createSVGElement<T extends keyof SVGElementTagNameMap>(tag: T): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

export function mount<T extends SVGElement>(parent: T, child: T) {
  if (parent) {
    parent.appendChild(child);
  }
}

export function applyAttributes(element: SVGElement, attributes: Partial<ShapeParams>) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(/[A-Z]/g, d => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, `${value}`);
  }
}

export function applyTransform(element: SVGElement, transform: string) {
  const old = element.getAttribute('transform') || '';
  const prefix = old ? `${old} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
}
