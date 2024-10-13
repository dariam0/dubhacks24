(function () {
  window.addEventListener('load', init);
  let newX = 0, newY = 0, startX = 0, startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  function init() {
    console.log('hello world');
    /* for every button, when clicked, instantiate a new planet onto the container */
    let buttonList = qsa('button');
    console.log(buttonList);
    for (let i = 0; i < buttonList.length; i++) {
      buttonList[i].addEventListener('click', addPlanet);
    }
    /**
     * const card = document.getElementById('card');

    card.addEventListener('mousedown', mouseDown);
    */
  }

  function addPlanet() {
    // create container
    newPlanet = gen('div');

    // add to DOM
    id('container').appendChild(newPlanet);

    promptDiv = gen('div');
    form = gen('form');
    angleText = gen('p');
    sliderAngle = gen('input');

    magText = gen('p');
    sliderMag = gen('input');

    promptDiv.appendChild(form);
    form.innerHTML = '<p>Angle</p>        <input type="range" min="1" max="360" value="0" class="slider" id="angle-slider">        <p>Magnitude</p>        <input type="range" min="1" max="100" value="50" class="slider" id="magn-slider"></input>';



    newPlanet.appendChild(promptDiv);



    /*


    <div>
      <form class="slider-form">
        <p>Angle</p>
        <input type="range" min="1" max="360" value="0" class="slider" id="angle-slider">
        <p>Magnitude</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="magn-slider">
      </form>
    </div>

    */

    // add functionality
    newPlanet.classList.add("planetContainer");
    form.classList.add("slider-form");
    promptDiv.classList.add("hidden");
    newPlanet.addEventListener('mousedown', planetMouseDown);


  }

  // code to add

  /**
   *  activates when mouse clicks on planet
      begin "dragging" functionality
   * @param {*} e - event listener
   */
  function planetMouseDown(e) {

    // startX = e.clientX - offsetX;
    // startY = e.clientY - offsetY;

    // e.target.style.top = startY + 'px';
    // e.target.style.left = startX + 'px';


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
    startX = e.pageX  - offsetX;
    startY = e.pageY - offsetY;

    e.target.style.top = startY + 'px';
    e.target.style.left = startX + 'px';

    console.log({ newX, newY });
    console.log({ startX, startY });

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

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();

