import { createRenderer } from "../../src/Core/renderer";
import { shape } from "../../src/Core/shape";
import { createDiv, getAttributes, mount } from "../utils";

describe('shape', () => {
  test('shape(name, context, attributes) create SVG elements', () => {
    const renderer = createRenderer(600, 400);
    const context = { group: renderer.group() };
    const s = shape('circle', context, {
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 10,
    });

    mount(createDiv(), renderer.node());

    expect(s.tagName).toBe('circle');
    expect(s.parentNode).toBe(renderer.group());
    expect(getAttributes(s, ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width'])).toEqual({
      cx: '100',
      cy: '100',
      r: '50',
      fill: 'red',
      stroke: 'yellow',
      'stroke-width': '10',
    });
  });

  test('circle() create circle elements', () => {
    const renderer = createRenderer(500, 400);
    const circle = renderer.circle({
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'yellow',
      stroke: 'red',
      strokeWidth: 10,
    });
    mount(createDiv(), renderer.node());
    expect(circle.tagName).toBe('circle');
  });

  test('rect() create rect elements', () => {
    const renderer = createRenderer(400, 400);
    const rect = renderer.rect({
      x: 100,
      y: 100,
      width: -50,
      height: -50,
      fill: 'red',
    });

    expect(getAttributes(rect, ['x', 'y', 'width', 'height'])).toEqual({
      x: '50',
      y: '50',
      width: '50',
      height: '50',
    });

    mount(createDiv(), renderer.node());
    expect(rect.tagName).toBe('rect');
  });

  test('line() create line elements', () => {
    const renderer = createRenderer(400, 400);
    const line = renderer.line({
      x1: 0,
      y1: 0,
      x2: 50,
      y2: 50,
      stroke: 'yellow',
    });

    mount(createDiv(), renderer.node());
    expect(line.tagName).toBe('line');
  });

  test('text() create text elements', () => {
    const renderer = createRenderer(400, 400);
    const text = renderer.text({
      x: 100,
      y: 100,
      text: 'Renderer',
      fill: 'red',
      fontFamily: "PingFangSC-Regular, sans-serif",
      fontSize: 25
    });

    expect(text.tagName).toBe('text');
    mount(createDiv(), renderer.node());
    expect(text.textContent).toBe('Renderer');
  });

  test('path() create path elements', () => {
    const renderer = createRenderer(400, 400);
    const d = [
      ['M', 10, 10],
      ['L', 100, 100],
      ['L', 100, 10],
      ['Z'],
    ];
    const path = renderer.path({
      d,
      stroke: 'yellow',
      fill: 'red',
    });

    expect(path.tagName).toBe('path');
    mount(createDiv(), renderer.node());
    expect(path.getAttribute('d')).toBe('M 10 10 L 100 100 L 100 10 Z');
  });

});
