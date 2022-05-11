/* global layerGroup, map, PVIlegend, SVIlegend,
HVIlegend, getTableData, getLegend,
sidebarContentController, intialTableData,
dataT, showmeHistogram, addHistInput, checkies, showdown */
let dlist;
/* === OUR DATA ON GITHUB === */
const mapvars = {
  coolingCenters: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestcoolingcenters.geojson",
  emergencyP: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestemergencyprep.geojson",
  pools: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestpublicpools.geojson",
  parks: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestparksandgs.geojson",
  hosp: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newesthospitals.geojson",
  HVI: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestoverallvulnerability.geojson",
  PVI: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestphysicalvulnerability.geojson",
  SVI: "https://raw.githubusercontent.com/bri-ne/MUSA611-Final/main/data/DataForMap/newestData/newestsocialvulnerability.geojson"
};



const pointLayers = ["coolingCenters", "emergencyP", "pools", "parks", "hosp"]; // i think this needs to be a dictionary
const polygonLayers = ["HVI", "PVI", "SVI"]; // with string name and var



let tableData;

// =================== Functions ==========///

// === onEachFeature: Bindings === //



/* function onEachFeatureName(feature, layer){
  //use feature.properties to construct popup html
  var resourceName = `<h2> Resource: ${feature.properties.Name} </h2>`;
  layer.bindPopup(resourceName);
  }; */

function onEachFeatureHVI(feature, layer) {
// use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>Census Tract Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var HVIScore = `<h2> Heat Vulnerability Score: ${feature.properties.rTotalVulScore} </h2>`;
  // layer.bindPopup(HVIScore);
}

function onEachFeatureSVI(feature, layer) {
  // use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"> <th><h3>Census Tract Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var SVIScore = `<h2> Social Vulnerability Score: ${feature.properties.rSocVulScore} </h2>`;
  // layer.bindPopup(SVIScore);
}


function onEachFeaturePVI(feature, layer) {
  // use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>Census Tract Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var PVIScore = `<h2> Physical Vulnerability Score: ${feature.properties.rPhysVulScore} </h2>`;
  // layer.bindPopup(PVIScore);
}



// === Map color Function === //
function getColorHVI(d) {
  return d > 4 ? '#b30000'
    : d > 3  ? '#e34a33'
      : d > 2   ? '#fc8d59'
        : d > 1   ? '#fdcc8a'
          : d > 0   ? '#fef0d9'
            : '#fff9db';
}

function getColorSVI(d) {
  return d > 4 ? '#045a8d'
    : d > 3  ? '#2b8cbe'
      : d > 2   ? '#74a9cf'
        : d > 1   ? '#bdc9e1'
          : d > 0   ? '#f1eef6'
            : '#fff9db';
}

function getColorPVI(d) {
  return d > 4 ? '#7a0177'
    : d > 3  ? '#c51b8a'
      : d > 2   ? '#f768a1'
        : d > 1   ? '#fbb4b9'
          : d > 0   ? '#feebe2'
            : '#fff9db';
}

// === Style  === //
function styleHVI(feature) {
  return {
    fillColor: getColorHVI(feature.properties["Total Vulnerability Score Quantile"]),
    weight: 0.5,
    opacity: 0.7,
    color: "gray",
    fillOpacity: 0.5,
    colorOpacity: 0.1,
  };
}

function styleSVI(feature) {
  return {
    fillColor: getColorSVI(feature.properties["Social Vulnerability Score Quantile"]),
    weight: 0.5,
    opacity: 0.7,
    color: "gray",
    fillOpacity: 0.5,
    colorOpacity: 0.1,
  };
}


function stylePVI(feature) {
  return {
    fillColor: getColorPVI(feature.properties["Physical Vulnerability Score Quantile"]),
    weight: 0.5,
    opacity: 0.7,
    color: "gray",
    fillOpacity: 0.5,
    colorOpacity: 0.1,
  };
}

// === realted styles for mapping ==//

const stylevars = {
  HVI: styleHVI,
  PVI: stylePVI,
  SVI: styleSVI
};

const bindingsvars = {
  HVI: onEachFeatureHVI,
  PVI: onEachFeaturePVI,
  SVI: onEachFeatureSVI
};
// === Updating the Map === //

function updateMap(url, styleType, bindings, callback) {
  layerGroup.clearLayers();

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      dlist = data;
      L.geoJSON(data, {
        style: styleType,
        onEachFeature: bindings
      }).addTo(layerGroup);
      if (callback) {
        callback(addHistInput, showmeHistogram);
      }
      console.log(dataT);
    });
}

// === markers ===//
const parksIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const poolsIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const emergencyPIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const coolingCentersIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const hospIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


function getMarker(pointName) {
  let icon2use;
  if (pointName === "coolingCenters") {
    icon2use = coolingCentersIcon;
  }
  if (pointName === "emergencyP") {
    icon2use = emergencyPIcon;
  }
  if (pointName === "pools") {
    icon2use = poolsIcon;
  }
  if (pointName === "parks") {
    icon2use = parksIcon;
  }
  if (pointName === "hosp") {
    icon2use = hospIcon;
  }
  return icon2use;
}
//= ========== point data bindings =============//



function updateMappointPCH(url, name, callback) { // THIS IS for pools, cooling centers and hosp
  layerGroup.clearLayers();
  let iconuse;
  let markersClust = new L.MarkerClusterGroup();
  iconuse = getMarker(name);
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature(feature) {
          let popupContent = `<h4> ${feature.properties.Name} </h4>
        <p>Address: ${feature.properties.addrln1}  &nbsp ${feature.properties.zip} <br>
        Hours: ${feature.properties.hours} <br>
        Phone Number: ${feature.properties.phones} <br>
        Website: <a href="${feature.properties.url}">${feature.properties.url} </a> </p>`;
          let marker = L.marker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            { icon: iconuse }
          ).bindPopup(popupContent);
          markersClust.addLayer(marker);
        }
      });
      markersClust.addTo(layerGroup);
    });
  if (callback) {
    callback();
  }
}

function updateMappointEmergency(url, name, callback) {
  // THIS IS for pools, cooling centers and hosp
  layerGroup.clearLayers();
  let iconuse;
  let markersClust = new L.MarkerClusterGroup();
  iconuse = getMarker(name);
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature(feature) { // THIS IS only for emergencyP
          let popupContent = `<h4>${feature.properties.Name} </h4>
        <p>Address: ${feature.properties.addrln1}  &nbsp ${feature.properties.zip} <br>
        Phone Number: ${feature.properties.phones} <br>
        Website: <a href="${feature.properties.url}">${feature.properties.url} </a></p>`;
          let marker = L.marker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            { icon: iconuse }
          ).bindPopup(popupContent);
          markersClust.addLayer(marker);
        }
      });
      markersClust.addTo(layerGroup);
    });
  if (callback) {
    callback();
  }
}



function updateMappointParks(url, name, callback) { // THIS IS only for parks
  layerGroup.clearLayers();
  let iconuse;
  let markersClust = new L.MarkerClusterGroup();
  iconuse = getMarker(name);
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature(feature) {    // THIS IS only for emergencyP
          let popupContent = `<h4> ${feature.properties.Name} </h4>
        <p>Address: ${feature.properties.ADDRESS} &nbsp ${feature.properties.CITY} &nbsp ${feature.properties.ZIP} <br>
        Phone Number: ${feature.properties.PHONES} <br>
        Website: <a href="${feature.properties.AGNCY_WEB}">${feature.properties.AGNCY_WEB} </a></p>`;
          let marker = L.marker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            { icon: iconuse }
          ).bindPopup(popupContent);
          markersClust.addLayer(marker);
        }
      });
      markersClust.addTo(layerGroup);
    });
  if (callback) {
    callback();
  }
}


// getridof fn below
/*
function updateMappoint(url, name) {
  layerGroup.clearLayers();
  let iconuse
  var markersClust = new L.MarkerClusterGroup();
  iconuse = getMarker(name);
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function(feature) {
      var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        {icon: iconuse}).bindPopup(`<h2> Resource: ${feature.properties.Name} </h2>`);
      markersClust.addLayer(marker);}
    });
    markersClust.addTo(layerGroup);

    });
}; */

function emptyCallback() {
  console.log("this is a callback");
}



function initializeMap(callback) {
  updateMap(mapvars.HVI, styleHVI, onEachFeatureHVI, intialTableData);
  getLegend("HVI");
  sidebarContentController("story-slide");
  if (callback) {
    callback();
  }
}
// === intialize map === //
/*
function initializeMap(callback) {
  fetch(mapvars.HVI)
  .then(resp => resp.json())
  .then(data => {
    L.geoJSON(data, {style: styleHVI,
      onEachFeature: onEachFeatureHVI
    }).addTo(layerGroup);
  if (callback){
    callback();
  };
});
getLegend("HVI");
sidebarContentController("story-slide");
}; */

// these might be useful IDK

function check(box) {
  let b = box;
  b.checked = true;
}

function uncheck(box) {
  let b = box;
  b.checked = false;
}

function disable(box) {
  let b = box;
  b.enabled = false;
}
// === Determine & Update Map From Check boxes == //
function determineMap() {
  layerGroup.clearLayers();
  let names = [];
  checkies.forEach(c => {
    if (c.checked === true) {
      let n = c.id;
      names.push(n);
    }
  });
  console.log(names);
  names.forEach(name => {
    if (pointLayers.includes(name)) {
      if (name === "parks") {
        updateMappointParks(mapvars[name], name, emptyCallback);
      }
      if (name === "emergencyP") {
        updateMappointEmergency(mapvars[name], name, emptyCallback);
      }
      updateMappointPCH(mapvars[name], name, emptyCallback);
    }
    if (polygonLayers.includes(name)) {
      updateMap(mapvars[name], stylevars[name], bindingsvars[name], getTableData);
      getLegend(name);
    }
  });
}


function anyChecked() {
  if (!checkies[0].checked) {
    map.removeControl(HVIlegend);
  }
  if (!checkies[1].checked) {
    map.removeControl(SVIlegend);
  }
  if (!checkies[2].checked) {
    map.removeControl(PVIlegend);
  }

  let trues = [];

  let l1 = checkies[0];
  let l2 = checkies[1];
  let l3 = checkies[2];
  let l4 = checkies[3];
  let l5 = checkies[4];
  let l6 = checkies[5];
  let l7 = checkies[6];
  let l8 = checkies[7];
  let l9 = checkies[8];

  let cs = [l1, l2, l3, l4, l5, l6, l7, l8, l9];
  if (cs[3].checked) {
    console.log("includes resources");
    check(l5);
    check(l6);
    check(l7);
    check(l8);
    check(l9);
  }

  cs.forEach(c => {
    if (c.checked === true) {
      trues.push("y");
    }
  });
  return trues;
}

function onCheck() {
  console.log("checkbox checked!");
  let trues = anyChecked();
  console.log(trues);
  if (trues.length > 0) {
    determineMap();
  } else {
    layerGroup.clearLayers();
  }
}

function resourceCheck() {
  if (!checkies[3].checked) {
    console.log("resources unchecked");
    uncheck(checkies[4]);
    uncheck(checkies[5]);
    uncheck(checkies[6]);
    uncheck(checkies[7]);
    uncheck(checkies[8]);
    layerGroup.clearLayers();
  }
  onCheck();
}


function HVICheck() {
  if (checkies[0].checked) {
    uncheck(checkies[1]);
    uncheck(checkies[2]);
    disable(checkies[1]);
    disable(checkies[2]);
    layerGroup.clearLayers();
  }
  // onCheck();
}

function SVICheck() {
  if (checkies[1].checked) {
    uncheck(checkies[0]);
    uncheck(checkies[2]);
    disable(checkies[0]);
    disable(checkies[2]);
    layerGroup.clearLayers();
  }
  // onCheck();
}

function PVICheck() {
  if (checkies[2].checked) {
    uncheck(checkies[0]);
    uncheck(checkies[1]);
    disable(checkies[1]);
    disable(checkies[0]);
    layerGroup.clearLayers();
  }
  // onCheck();
}








// const pointLayers = [coolingCenters, emergencyP, pools, parks]
// const polygonLayers = [HVI, PVI, SVI]



// tableData.features.forEach(ele => dataT.push(ele.properties))




// const urlList = [coolingCenters, emergencyP, pools]

// urlList.forEach(element => updateMap(element))

