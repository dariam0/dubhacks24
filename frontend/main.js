(function () {
  window.addEventListener('load', init);
  let newX = 0, newY = 0, startX = 0, startY = 0;

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
    newPlanet = gen('div');
    newPlanetImg = gen('img');
    newPlanetImg.src = 'icons/planet.png';
    newPlanet.appendChild(newPlanetImg);
    newPlanet.addEventListener('mousedown', mouseDown);
    id('container').appendChild(newPlanet);
  }

  // code to add

  /**
   *  activates when mouse clicks on planet
      begin "dragging" functionality
   * @param {*} e - event listener
   */
  function planetMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', planetMouseMove);
    document.addEventListener('mouseup', planetMouseUp);
  }

  /**
   * updates planet x and y position frame by frame
   * @param {*} e  -event listner
   */
  function planetMouseMove(e) {
    newX = startX - e.clientX
    newY = startY - e.clientY + offset;

    startX = e.clientX - offset;
    startY = e.clientY - offset;

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
    document.removeEventListener('mousemove', mouseMove);
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

