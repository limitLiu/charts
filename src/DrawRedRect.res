open Webapi.Dom

let drawRedRect = (svg: Element.t) => {
  let rect = document->Document.createElementNS("http://www.w3.org/2000/svg", "rect")
  rect->Element.setAttribute("x", "0")
  rect->Element.setAttribute("y", "0")
  rect->Element.setAttribute("fill", "red")
  rect->Element.setAttribute("width", "100")
  rect->Element.setAttribute("height", "100")
  svg->Element.appendChild(~child=rect)
}
