'use strict';
(function () {
  window.addEventListener('load', init);
  let newX = 0, newY = 0, startX = 0, startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  /**
   * Initiates functions needed to run the program.
   */
  function init() {
    /* for every button, when clicked, instantiate a new planet onto the container */
    let buttonList = qsa('button');
    for (let i = 0; i < buttonList.length - 1; i++) {
      buttonList[i].addEventListener('click', addPlanet);
    }
  }

  /**
   * Adds a new planet onto the outer space container.
   */
  function addPlanet() {
    // create container
    let newPlanet = gen('div');

    // add to DOM
    id('container').appendChild(newPlanet);

    let promptDiv = gen('div');
    let createdForm = makeForm();
    let form = gen('form');
    promptDiv.appendChild(form);

    newPlanet.appendChild(createdForm);

    newPlanet.classList.add("planetContainer");
    newPlanet.style.backgroundImage = "url(icons/" + this.innerHTML.toLowerCase() + "_planet.png)";
    form.classList.add("slider-form");
    promptDiv.classList.add("hidden");
    newPlanet.addEventListener('mousedown', planetMouseDown);
  }

  /**
   * Generates forms for planet customability
   */
  function makeForm() {
    let parentForm = gen('form');
    parentForm.classList.add('slider-form');
    let angleText = gen('p');
    angleText.textContent = 'Angle';
    let sliderAngle = gen('input');
    sliderAngle.type = 'range';
    sliderAngle.min = 1;
    sliderAngle.max = 360;
    sliderAngle.value = 0;
    sliderAngle.classList.add('slider');
    sliderAngle.setAttribute('id', 'angle-slider');
    let angleValue = gen('p');
    angleValue.innerHTML = sliderAngle.value;
    sliderAngle.oninput = function () {
      angleValue.innerHTML = this.value;
    }

    let magText = gen('p');
    magText.textContent = 'Magnitude';
    let sliderMag = gen('input');
    sliderMag.type = 'range';
    sliderMag.min = 1;
    sliderMag.max = 100;
    sliderMag.value = 50;
    sliderMag.classList.add('slider');
    sliderMag.setAttribute('id', 'magn-slider');
    let magValue = gen('p');
    magValue.innerHTML = sliderMag.value;
    sliderMag.oninput = function () {
      magValue.innerHTML = this.value;
    }

    parentForm.appendChild(angleText);
    parentForm.appendChild(sliderAngle);
    parentForm.appendChild(angleValue);
    parentForm.appendChild(magText);
    parentForm.appendChild(sliderMag);
    parentForm.appendChild(magValue);
    return parentForm;
  }

  /**
   *  activates when mouse clicks on planet
      begin "dragging" functionality
   * @param {*} e - event listener
   */
  function planetMouseDown(e) {
    if (!e.target.querySelector("form")) {
      return;
    }

    e.target.querySelector("form").classList.add("hidden");
    e.target.addEventListener('mousemove', planetMouseMove);
    e.target.addEventListener('mouseup', planetMouseUp);
  }

  /**
   * updates planet x and y position frame by frame
   * @param {*} e  -event listner
   */
  function planetMouseMove(e) {
    startX = e.pageX - offsetX;
    startY = e.pageY - offsetY;

    e.target.style.top = startY + 'px';
    e.target.style.left = startX + 'px';

  }

  /**
   * ending dragging functionality
   * precondition: planet is being dragged
   * @param {*} e - functionality
   */
  function planetMouseUp(e) {
    e.target.removeEventListener('mousemove', planetMouseMove);

    if (!e.target.querySelector(".hidden")) {
      return;
    }

    e.target.querySelector(".hidden").classList.remove("hidden");
  }


  /** General DOM functions */

  function id(id) {
    return document.getElementById(id);
  }

  function gen(tag) {
    return document.createElement(tag);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();

