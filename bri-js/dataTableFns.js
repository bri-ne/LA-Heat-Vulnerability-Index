/* global dataT, dlist, checkies, showdown, motive */
let colly;
function getTableData(callback1, callback2) {
  dataT.length = 0;
  dlist.features.forEach(ele => dataT.push(ele.properties)); // creates dataT
  if (checkies[0].checked) {
    colly = "Total Vulnerability Score";
  }
  if (checkies[1].checked) {
    colly = "Social Vulnerability Score";
  }
  if (checkies[2].checked) {
    colly = "Physical Vulnerability Score";
  }
  if (callback1) {
    callback1();
  }
  if (callback2) {
    callback2(colly);
  }
}

function intialTableData(callback1, callback2) {
  dlist.features.forEach(ele => dataT.push(ele.properties)); // creates dataT
  colly = "Total Vulnerability Score";
  if (callback1) {
    callback1();
  }
  if (callback2) {
    callback2(colly);
  }
}

/*= === Initial Data Table Content Function === */
function initializeDataTable() {
  const converter = new showdown.Converter({ smartIndentationFix: true });
  let motiveFill = document.querySelector("#table");
  let accordionheading = document.querySelector(".accordion-trigger");
  accordionheading.innerHTML = motive.title;
  motiveFill.innerHTML = converter.makeHtml(motive.content);
}


/*= === Search for census tract to filter histogram by === */

let h = [];
let ishere;
let trace = {};

function showmeHistogram(column, tractID) {
  // document.querySelector("#histHere").innerHTML = ""

  let x = [];

  // Plotly.purge('histHere');
  console.log("i might delete plot");
  /* if (Object.keys(trace).length > 0){
    Plotly.deleteTraces('histHere', 0);
    console.log("deleted plot")
  } */
  // get the data of what is currently clicked on
  dataT.forEach(f => { x.push(f[column]); });
  let layout;
  trace = {
    x,
    type: 'histogram',
    marker: { color: '#08415C' },
  };
  console.log(x);

  if (tractID) {
    let datahist = [trace];
    layout = {
      title: `Distribution of ${column}`,
      shapes: [    // line vertical
        {
          type: 'line',
          x0: h[0],
          y0: 0,
          x1: h[0],
          y1: 145,
          line: {
            color: 'rgb(255, 231, 76)',
            width: 3
          }
        },
      ]
    };
    Plotly.newPlot('histHere', datahist, layout, { responsive: true });
  } else {
    let datahist = [trace];
    layout = {
      title: `Distribution of ${column}`,
    };
    Plotly.newPlot('histHere', datahist, layout, { responsive: true });
  }
  ishere = document.querySelector(".plot-container");
  console.log(`is here here, now? ${ishere}`);
}


function getTractID() {
  h.length = 0;
  const tractnum = document.getElementById("tractenter").value;
  let col = colly;
  let tractID;
  tractID = tractnum;
  dataT.forEach(d => { if (d.Tract === String(tractID)) { h.push(d[col]); } });

  showmeHistogram(col, tractID);
}
function addHistInput() {
  // create input box and histogram place
  const input = document.createElement("input");
  const hist = document.createElement("div");
  const inputEnterButton = document.createElement("button");
  const inputcontainer = document.createElement("div");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Search For a Census Tract");
  input.setAttribute("id", "tractenter");
  inputEnterButton.setAttribute("id", "tractButton");
  inputEnterButton.innerHTML = "Search Tract";
  inputEnterButton.addEventListener("click", getTractID);

  hist.setAttribute('id', 'histHere');
  // locate elements
  let motiveFill = document.querySelector("#table");
  let accordionheading = document.querySelector(".accordion-trigger");

  // fill elements
  accordionheading.innerHTML = `Distribution of ${colly}`;
  motiveFill.innerHTML = "";
  motiveFill.appendChild(inputcontainer);
  inputcontainer.appendChild(input);
  inputcontainer.appendChild(inputEnterButton);
  motiveFill.appendChild(hist);
}









/*
var myTable = document.querySelector('#table').bootstrapTable({
  url: '../../data/DataForMap/newData/newoverallvulnerability.geojson',
  columns: [{
    field: 'SocVulScore',
    title: 'Item ID'
  }, {
    field: 'PhysVulScore',
    title: 'Item Name'
  }, {
    field: 'PhysVulScoreQuantile',
    title: 'Item Price'
  }, {
    field: 'SocVulScore',
    title: 'Item Price'
  }, {
    field: 'SocVulScoreQuantile',
    title: 'Item Price'
  }, {
    field: 'TotalVulScore',
    title: 'Item Price'
  }, {
    field: 'TotalVulScoreQuantile',
    title: 'Item Price'
  }, {
    field: 'Tract',
    title: 'Item Price'
  }, {
    field: 'Tract_N',
    title: 'Item Price'
  }]
}) */
