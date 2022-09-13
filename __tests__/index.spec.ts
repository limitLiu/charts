import { drawRedRect, toStr } from '../src';

describe('test', () => {
  test('drawRedRect()', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', toStr(400));
    svg.setAttribute('height', toStr(400));
    svg.setAttribute('viewBox', [0, 0, 400, 400].join(', '));
    document.body.appendChild(svg);
    drawRedRect(svg);
    expect(svg.getElementsByTagName('rect').length).toBe(1);
  });
});
