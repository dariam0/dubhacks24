(function () {
  window.addEventListener('load', init);

  function init() {
    id('action').classList.add("none");
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
    id("runSim").addEventListener('click', runSimulation);

  }


  function runSimulation() {

    let data = compileAllPlanets();

    console.log(data);


    fetch('http://127.0.0.1:80/simulate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'  // Add this header to specify JSON
      },
      body: data
    })
      .then(statusCheck)
      .then(animatePlanets)  // Process and animate the planets
      .catch(fail)
  }



  function compileAllPlanets() {
    // for each planet
    let planets = document.querySelectorAll(".planetContainer");
    console.log(planets);
    let items = [];

    for (let i = 0; i < planets.length; i++) {
      // get data for each

      let currentPlannet = planets[i];
      const rect = currentPlannet.getBoundingClientRect();
      let xPos = rect.left + window.scrollX;
      let yPos = rect.top + window.scrollY;

      let mass = 100; // change later
      console.log(currentPlannet.childNodes[0].childNodes[3]);
      // angle-slider
      // magn-slider

      let angeVal = currentPlannet.childNodes[0].childNodes[1].value;
      let magVal = currentPlannet.childNodes[0].childNodes[4].value;

      let planetChild = {
        "x_pos": xPos,
        "y_pos": yPos,
        "angle": angeVal,
        "magnitude": magVal,
        "radius": 150,
        "mass": mass,
        "url": "" + currentPlannet.style.backgroundImage
      };

      console.log(planetChild);

      items.push(planetChild);
    }

    return '{"data":{"items":' + JSON.stringify(items) + ', "time": 9}  }';
  }
  function createSimPlanet() {
    // create container
    newPlanet = gen('div');

    // add to DOM
    id('action').appendChild(newPlanet);


    newPlanet.classList.add("planetContainer");

    return newPlanet;
  }

  function gen(tag) {
    return document.createElement(tag);
  }

  function animatePlanets(response) {
    response.json().then(data => {
      id('action').classList.remove("none");
      console.log(data);

      id('container').classList.add('none');

      let numOfPlanets = data.data[0].length;
      let numOfIterations = data.data.length;

      let newPlanets = [];
      for (let i = 0; i < numOfPlanets; i++) {
        let planet = createSimPlanet();
        planet.style.backgroundImage = data.data[0][i].url;
        newPlanets.push(planet);
      }


      let i = 0;

      const intervalId = setInterval(function () {
        for (let j = 0; j < numOfPlanets; j++) {
          // update position
          let currPlannet = newPlanets[j];
          let currXPos = data.data[i][j].x_pos;
          let currYPos = data.data[i][j].y_pos;

          currPlannet.style.top = currYPos + "px"; // plus offset?
          currPlannet.style.left = currXPos + 'px'; // plus offset?
        }
        i++;

        if (i >= numOfIterations) {
          clearInterval(intervalId)
        }
      }, 10);

      setTimeout(function () {
        reset()

      }, 10 * numOfIterations + 1000);

    });



  }


  function reset() {
    id('container').classList.remove("none");
    id('action').innerHTML = '';
    id('action').classList.add("none");
  }







  // Function to process the response and start the animation
  function animatePlanetz(response) {
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


  function id(id) {
    return document.getElementById(id);
  }
})();