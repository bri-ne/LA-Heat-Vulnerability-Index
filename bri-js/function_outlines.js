let checkies;
/* This is a scratch space to think of functions and
try to work them out

## Needs
[X] function to open/close the bottom bar
[ ] function to open/close the side bar
[ ] function to switch tabs on side bar
[ ] filters on the map --> not quite figure out yet
[ ] layers toggle on and off for map
[ ]

*/

/* funtion to open/close the bottom bar
see: accordion-horizontal.js
*/

/* function to open/close the bottom bar:
needs to affect the size of the parent div that it is in and
it needs to tell what the other buttons to do. */



/* function to switch tabs on side bar
if   the .accordion-vert button is expanded, as seen here in this funciont:
const butnclick = function () {
  let sidebar = document.querySelector(".side-bar");
  const btns = sidebar.querySelectorAll(".accordion-vert");
  btns.forEach((b) => {
    b.onclick = () => {
      isSidebarOpen();
    };
  })
} */

function fillSlide(slide) {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slideTitleDiv.innerHTML = `<h2>${slide.title}</h2>`;
  slideContentDiv.innerHTML = converter.makeHtml(slide.content);
}

// this will be the part of the funciton that if the
// sidebar is closed then clicking on it will open the bar
const sidebarContentController = function (slide) {
  console.log("you've called the sidebarContentController fn");
  if (slide.includes("story")) {
    // show story slide
    fillSlide(slides[0]);
  }
  if (slide.includes("filter")) {
    // show fitlers/layers slide
    fillSlide(slides[1]);
    let checkboxContainer = document.querySelector(".slide-content");
    checkies = checkboxContainer.firstChild.querySelectorAll("input");
    let allButResources = [checkies[0],
      checkies[1],
      checkies[2],
      checkies[4],
      checkies[5],
      checkies[6],
      checkies[7],
      checkies[8]];
    let justLayers = [checkies[0], checkies[1], checkies[2]];

    checkies[0].addEventListener("change", HVICheck);
    checkies[1].addEventListener("change", SVICheck);
    checkies[2].addEventListener("change", PVICheck);
    allButResources.forEach(abr => abr.addEventListener("change", onCheck));
    checkies[3].addEventListener("change", resourceCheck);
    layerGroup.clearLayers();
    checkies[0].click();
  }
};





const isSidebarOpen = function (slide) {
  console.log("you've called the isSidebarOpen fn");
  if (slide.includes("accordion-vert-trigger")) {
    console.log("great");
  } else if (sidebar.getAttribute("class").includes("open") !== true) {
    console.log("aria is not open");
    const headings = document.querySelectorAll(".accordion-vert");
    let btn = headings[0].querySelector("button");
    let target = headings[0].parentElement.parentElement.nextElementSibling;
    openItemArrow(target, btn);
    console.log("just called accordion fn");
    // and now call the function to load the content
    sidebarContentController(slide);
  } else {
    sidebarContentController(slide);
  }
};



sidebar.addEventListener('click', ({ target }) => {
  if (target.matches('button')) {
    console.log(target);
    let slide = target.getAttribute("class");
    isSidebarOpen(slide);
  }
});
/* global sidebar, slideContentDiv, slideTitleDiv,
layerGroup, resourceCheck, onCheck,
PVICheck, SVICheck, HVICheck, slides,
openItemArrow, showdown */
