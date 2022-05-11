/* global map, getColorPVI, getColorSVI,
getColorHVI */
// === Legend code ===//
/* Legend Function */
let LegendTitle;

// HVI LEGEND ///
var HVIlegend = L.control({ position: 'bottomright' });
HVIlegend.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'info-legend');
  let labels = [`<div class="legendTitle">${LegendTitle}</div><div class="legendBody">`];
  let catlables = ['Most Vulnerable', 'Above-Average Vulnerability', 'City Average Vulnerability', 'Some Vulnerability', 'Low Vulnerability'];
  let categories = [5, 4, 3, 2, 1];
  for (let i = 0; i < categories.length; i++) {
    div.innerHTML
            += labels.push(
        `<div>`
              + `<i class="circle" style=" color: white;background-color:${
                getColorHVI(categories[i])}"></i> `
              + `<i class="legendtext">${catlables[i] ? catlables[i] : ''}</i>`
            + `</div>`
      );
  }
  labels.push('</div>');
  div.innerHTML = labels.join("");
  return div;
};

// SVI LEGEND ///
const SVIlegend = L.control({ position: 'bottomright' });
SVIlegend.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'info-legend');
  let labels = [`<div class="legendTitle">${LegendTitle}</div><div class="legendBody">`];
  let catlables = ['Most Vulnerable', 'Above-Average Vulnerability', 'City Average Vulnerability', 'Some Vulnerability', 'Low Vulnerability'];
  let categories = [5, 4, 3, 2, 1];
  for (let i = 0; i < categories.length; i++) {
    div.innerHTML
            += labels.push(
        `<div>`
              + `<i class="circle" style=" color: white;background-color:${
                getColorSVI(categories[i])}"></i> `
              + `<i class="legendtext">${catlables[i] ? catlables[i] : ''}</i>`
            + `</div>`
      );
  }
  labels.push('</div>');
  div.innerHTML = labels.join("");
  return div;
};

// PVI LEGEND ///
const PVIlegend = L.control({ position: 'bottomright' });
PVIlegend.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'info-legend');
  let labels = [`<div class="legendTitle">${LegendTitle}</div><div class="legendBody">`];
  let catlables = ['Most Vulnerable', 'Above-Average Vulnerability', 'City Average Vulnerability', 'Some Vulnerability', 'Low Vulnerability'];
  let categories = [5, 4, 3, 2, 1];
  for (let i = 0; i < categories.length; i++) {
    div.innerHTML
            += labels.push(
        `<div>`
              + `<i class="circle" style=" color: white;background-color:${
                getColorPVI(categories[i])}"></i> `
              + `<i class="legendtext">${catlables[i] ? catlables[i] : ''}</i>`
            + `</div>`
      );
  }
  labels.push('</div>');
  div.innerHTML = labels.join("");
  return div;
};



function getLegend(name) {
  if (name === "HVI") {
    LegendTitle = "Overall Heat Vulnerability";
    HVIlegend.addTo(map);
  }
  if (name === "SVI") {
    LegendTitle = "Social Heat Vulnerability";
    SVIlegend.addTo(map);
  }
  if (name === "PVI") {
    LegendTitle = "Physical Heat Vulnerability";
    PVIlegend.addTo(map);
  }
}

