var countries = {};
var pattern = /.*=/;
var url = window.location.href;

async function getUser(place) {
  const api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=53cd84c4335e40bfaaea7be63c8b8f04&location=${place}`;
  const response = await fetch(api_url);
  const data = await response.json();

  const country = url.replace(pattern, "").replace(/%\d*/g, " ");
  var lat = countries[country].latitude;
  var lon = countries[country].longitude;

  time = await data.datetime;
  time = time.replace(/ /, "T").replace(/\d\d:\d\d$/, "00");

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,windspeed_10m,winddirection_80m,windgusts_10m,soil_temperature_6cm,soil_moisture_1_3cm&forecast_days=1`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the parsed JSON data
      //   console.log(data);
      const resultElement = document.getElementById("result");

      arr = data.hourly;

      var index = 0;

      for (let i = 0; i < arr.time.length; i++) {
        if (arr.time[i] === time) {
          index = i;
          break;
        }
      }

      //console.log(arr.temperature_2m[index]);
      //console.log(arr.apparent_temperature[index]);
      //console.log(arr.rain[index]);
      //console.log(arr.visibility[index]);

      // Access specific values from the JSON object
      //console.log(data.property1);
      //console.log(data.property2);

      resultElement.textContent =
        `Current Temperature: ${arr.temperature_2m[index]}°C\n` +
        `Feels like: ${arr.apparent_temperature[index]}°C\n` +
        `Rain: ${arr.rain[index]}mm\n` +
        `Visibility: ${arr.visibility[index]}m\n` +
        //`Relative Humidity: ${arr.relativehumidity_2m[index]}%\n` +
        //`Dewpoint: ${arr.dewpoint_2m[index]}°C\n` +
        //`Precipitation Probability: ${arr.precipitation_probability[index]}%\n` +
        //`Precipitation: ${arr.precipitation[index]}mm\n` +
        //`Showers: ${arr.showers[index]}mm\n` +
        `Snowfall: ${arr.snowfall[index]}cm\n` +
        //`Snow Depth: ${snow_depth[index]}m\n` +
        `Windspeed: ${arr.windspeed_10m[index]}km/h\n`;
       // `Wind Direction: ${arr.winddirection_80m[index]}°\n` +
       // `Windgusts: ${arr.windgusts_10m[index]}km/h\n` +
        //`Soil Temperature: ${soil_temperature_6cm[index]}°C\n` +
        //`Soil Moisture: ${arr.soil_moisture_1_3cm[index]}m³/m³\n`;
    })
    .catch((error) => {
      console.log("Error fetching or parsing data:", error);
    });
}

function goBack() {
  const country = url.replace(pattern, "").replace(/%\d*/g, " ");
  window.open(`https://kyloren010.github.io/world-clock/Options.html?country=${country}`);
  window.close();
}

function fetchWeather() {
  const country = url.replace(pattern, "").replace(/%\d*/g, " ");
  //   console.log(country);

  //   console.log(countries[country]);

  var lat = countries[country].latitude;
  var lon = countries[country].longitude;

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,windspeed_10m,winddirection_80m,windgusts_10m,soil_temperature_6cm,soil_moisture_1_3cm&forecast_days=1`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the parsed JSON data
      //   console.log(data);

      // Access specific values from the JSON object
      //   console.log(country);
      getUser(country);
    })
    .catch((error) => {
      console.log("Error fetching or parsing data:", error);
    });
}

fetch("data.csv")
  .then((response) => response.text())
  .then((data) => {
    // Split the data into rows
    const rows = data.split("\n");

    // Extract the country data from each row
    rows.forEach((row) => {
      const columns = row.split(",");
      if (columns.length === 4) {
        const loc = {
          latitude: parseFloat(columns[1]),
          longitude: parseFloat(columns[2]),
        };
        countries[columns[3]] = loc;
      }
    });

    // console.log(countries);
    fetchWeather();

    // Chart.js
    // Get a reference to the canvas element
    //var ctx = document.getElementById("myChart").getContext("2d");

    const country = url.replace(pattern, "").replace(/%\d*/g, " ");
    var lat = countries[country].latitude;
    var lon = countries[country].longitude;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,windspeed_10m,winddirection_80m,windgusts_10m,soil_temperature_6cm,soil_moisture_1_3cm&forecast_days=1`
    )
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Parse API response
        const labels = data.hourly.time;

        for (let i = 0; i < labels.length; i++)
        {
            labels[i] = labels[i].replace(/.*T/, '');
        }


        // console.log(labels);
        const temperature_2m = data.hourly.temperature_2m; // Parameter 1 values
        const apparent_temperature = data.hourly.apparent_temperature; // Parameter 2 values
        const rain = data.hourly.rain; // Parameter 3 values
        const visibility = data.hourly.visibility; // Parameter 4 values
        const snowfall = data.hourly.snowfall; // Parameter 5 values
        const windspeed_10m = data.hourly.windspeed_10m; // Parameter 6 values


        // Step 3: Choose a charting library (Chart.js)
        // Step 4: Set up HTML (canvas element)

        // Step 5: Prepare chart data
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperature_2m,
              yAxisID: "y-axis-1", // Assign the dataset to y-axis 1
              backgroundColor: "rgb(0, 123, 255)",
            },
            {
              label: "Feels like",
              data: apparent_temperature,
              yAxisID: "y-axis-2", // Assign the dataset to y-axis 2
              backgroundColor: "rgb(255, 0, 123)",
            },
            {
                label: "Rain",
                data: rain,
                yAxisID: "y-axis-3", // Assign the dataset to y-axis 2
                backgroundColor: "rgb(5, 190, 15)",
              },
              {
                label: "Visibility",
                data: visibility,
                yAxisID: "y-axis-4", // Assign the dataset to y-axis 2
                backgroundColor: "rgb(237, 249, 4)",
              },
              {
                label: "Snow Fall",
                data: snowfall,
                yAxisID: "y-axis-5", // Assign the dataset to y-axis 2
                backgroundColor: "rgb(249, 9, 2)",
              },
              {
                label: "Wind Speed",
                data: windspeed_10m,
                yAxisID: "y-axis-6", // Assign the dataset to y-axis 2
                backgroundColor: "rgb(255, 255, 255)",
              },
          ],
        };

        // Step 6: Initialize the chart
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "line",
          data: chartData,
          /*
          options: {
            scales: {
              yAxes: [
                {
                  id: "y-axis-1",
                  type: "linear",
                  position: "left",
                },
                {
                  id: "y-axis-2",
                  type: "linear",
                  position: "right",
                },
              ],
            },
          },
          */
        });

        // Step 7: Update the chart with API data
        // (if you want to update the chart dynamically)
      })
      .catch((error) => {
        // Step 8: Handle errors
        console.error("Error:", error);
      });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
