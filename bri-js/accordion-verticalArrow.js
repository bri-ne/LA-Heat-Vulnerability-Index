function openItemArrow(target, btn) {
  const copyOpenClass = "accordion-vert--open";
  const copyCloseClass = "accordion-vert--closed";
  const sideBarCol = target.previousElementSibling;
  const buttonContainer = sideBarCol.firstElementChild;
  const containerOpenClass = "buttons-side-bar-col";
  const containerCloseClass = "buttons-side-bar-col--closed";

  const sideBarOpenClass = "side-bar";
  const sideBarCloseClass = "side-bar--closed";
  const sideBarOpenId = "over_map_side2";

  // let sub = document.querySelector(".content-side-bar-col")
  /* this is so the button can shrink */
  let butt = btn;
  butt.setAttribute("aria-expanded", true);
  butt.innerHTML = "";
  butt.innerHTML = "&#8595;";
  target.classList.remove(copyCloseClass);
  target.classList.add(copyOpenClass);

  sideBarCol.classList.remove(sideBarCloseClass);
  sideBarCol.classList.add(sideBarOpenClass);

  sideBarCol.removeAttribute('id');
  sideBarCol.setAttribute('id', sideBarOpenId);

  buttonContainer.classList.remove(containerCloseClass);
  buttonContainer.classList.add(containerOpenClass);
}

function closeItemArrow(target, btn) {
  const copyCloseClass = "accordion-vert--closed";
  const copyOpenClass = "accordion-vert--open";
  const sideBarCol = target.previousElementSibling;
  const buttonContainer = sideBarCol.firstElementChild;
  const containerOpenClass = "buttons-side-bar-col";
  const containerCloseClass = "buttons-side-bar-col--closed";
  const sideBarOpenClass = "side-bar";
  const sideBarCloseClass = "side-bar--closed";
  const sideBarCloseId = "over_map_side2--closed";
  /* this will allow the btn style to change
   and meet accesibility requirements, BUT it
   is only for the collapse and expand button */
  let butt = btn;
  butt.setAttribute("aria-expanded", false);
  butt.innerHTML = "";
  butt.innerHTML = "&#8593;";
  target.classList.add(copyCloseClass);
  target.classList.remove(copyOpenClass);

  sideBarCol.classList.remove(sideBarOpenClass);
  sideBarCol.classList.add(sideBarCloseClass);

  sideBarCol.removeAttribute('id');
  sideBarCol.setAttribute('id', sideBarCloseId);

  buttonContainer.classList.remove(containerOpenClass);
  buttonContainer.classList.add(containerCloseClass);
}

const accordionVertfunctionArrow = function () {
  /* Set the vars to be used, the last one will be added to item's class list */
  const headings = document.querySelectorAll(".accordion-vert");
  const triggers = [];// idk if i need this

  headings.forEach((h, i) => {
    /* this fn determines whether the click will close or open the accordion */
    let btn = h.querySelector("button");
    /* this is not defined in css, just added to html */
    triggers.push(btn);
    let target = h.parentElement.parentElement.nextElementSibling;

    btn.onclick = () => {
      let expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeItemArrow(target, btn);
      } else {
        openItemArrow(target, btn);
      }
    };
  });
};

accordionVertfunctionArrow();
