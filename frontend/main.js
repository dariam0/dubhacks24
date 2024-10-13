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
    newPlanet = gen('img');
    newPlanet.src = 'icons/planet.png';
    newPlanet.addEventListener('mousedown', mouseDown);
    id('container').appendChild(newPlanet);
  }

  function mouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }

  function mouseMove(e) {
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    startX = e.clientX;
    startY = e.clientY;

    card.style.top = startY + 'px';
    card.style.left = startX + 'px';

    console.log({ newX, newY });
    console.log({ startX, startY });

  }

  function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove);
  }

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

