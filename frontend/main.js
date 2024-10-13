(function () {
  window.addEventListener('load', init);
  let newX = 0, newY = 0, startX = 0, startY = 0;

  function init() {
    console.log('hello world');
    const card = document.getElementById('card');
    card.addEventListener('mousedown', mouseDown);
  }

  function mouseDown(e) {
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  function mouseMove(e) {
    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    card.style.top = startY + 'px'
    card.style.left = startX + 'px'

    console.log({ newX, newY })
    console.log({ startX, startY })

  }

  function mouseUp(e) {

  }
})();

