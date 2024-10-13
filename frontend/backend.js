(function () {
  window.addEventListener('load', init);

  function init() {
    const test = {
      "data": {
        "items": [{
          "x_pos": 50,
          "y_pos": 50,
          "angle": 45,
          "magnitude": 1,
          "radius": 10,
          "mass": 100000000000000
        }],
        "time": 10
      },
    }
    const jsonTest = JSON.stringify(test);
    console.log(jsonTest);
    fetch('http://127.0.0.1:80/simulate', { method: "POST", 
      headers: {
        'Content-Type': 'application/json'  // Add this header to specify JSON
      },
      body: jsonTest })
      .then(statusCheck)
      .then(animatePlanets)  // Process and animate the planets
      .catch(fail)
  }

  function testJson(e) {
    console.log(e);
  }


  // Function to process the response and start the animation
  function animatePlanets(response) {
    response.json().then(data => {
      console.log(data)
      const frames = data.data;  // Assuming backend returns positions as 'positions' array
      const planets = document.querySelectorAll('.planet'); // Assuming planets have class 'planet'
      let currentFrame = 0;

      // Function to update planet positions at each frame
      function updatePositions() {
        planets.forEach((planet, index) => {
          const planetData = frames[currentFrame][index];  // Get current planet's position
          planet.style.transform = `translate(${planetData.x_pos}px, ${planetData.y_pos}px)`;
        });

        // Move to the next frame or loop back to start
        currentFrame = (currentFrame + 1) % frames.length;

        // Continue the animation
        requestAnimationFrame(updatePositions);
      }

      // Start the animation
      requestAnimationFrame(updatePositions);
    });
  }


  function fail(e) {
    console.log(e);
  }

  /**
   * {
  "data": {
      "items": [{
          "x_pos": 50,
          "y_pos": 50,
          "angle": 45,
          "magnitude": 1,
          "radius": 10,
          "mass": 100000000000000
      },
      {
          "x_pos": 70,
          "y_pos": 70,
          "angle": 225,
          "magnitude": 1,
          "radius": 10,
          "mass": 100000000000000
      },
      {
          "x_pos": 70,
          "y_pos": 20,
          "angle": 225,
          "magnitude": 1,
          "radius": 10,
          "mass": 100000000000000
      }],
      "time": 1
  }

}
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
      console.log(res);
    }
    return res;
  }
})();