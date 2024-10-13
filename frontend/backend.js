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
        }]
      },
      "time": 10
    }
    const jsonTest = JSON.stringify({});
    console.log(jsonTest);
    fetch('http://127.0.0.1:80/simulate', { method: "POST", 
      headers: {
        'Content-Type': 'application/json'  // Add this header to specify JSON
      },
      body: jsonTest })
      .then(statusCheck)
      .then(testJson)
      .catch(fail)
  }

  function testJson(e) {
    console.log(e);
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