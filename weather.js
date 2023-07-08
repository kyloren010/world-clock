
    var countries = {};

    var inputF = document.getElementById("countryInput");
    var pattern = /.*=/;
    var string = window.location.href;
    var isMatch = pattern.test(string);

    if (isMatch) inputF.value = string.replace(pattern, "");

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

            //console.log(countries);
        })
        .catch((error) => {
            console.log("Error fetching data:", error);
        });

    async function getUser(place) {
        const api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=53cd84c4335e40bfaaea7be63c8b8f04&location=${place}`;
        const response = await fetch(api_url);
        const data = await response.json();

        const country = document.getElementById("countryInput").value;
        var lat = countries[country].latitude;
        var lon = countries[country].longitude;

        time = await data.datetime;
        time = time.replace(/ /, 'T').replace(/\d\d:\d\d$/, '00');

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,windspeed_10m,winddirection_80m,windgusts_10m,soil_temperature_6cm,soil_moisture_1_3cm`)
            .then(response => response.json())
            .then(data => {
                // Process the parsed JSON data
                console.log(data);
                const resultElement = document.getElementById('result');

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

                resultElement.textContent = `Current Temperature: ${arr.temperature_2m[index]}°C\n` + 
                                            `Feels like: ${arr.apparent_temperature[index]}°C\n` + 
                                            `Rain: ${arr.rain[index]}mm\n` + 
                                            `Visibility: ${arr.visibility[index]}m\n` +
                                            `Relative Humidity: ${arr.relativehumidity_2m[index]}%\n` +
                                            `Dewpoint: ${arr.dewpoint_2m[index]}°C\n` +
                                            `Precipitation Probability: ${arr.precipitation_probability[index]}%\n` +
                                            `Precipitation: ${arr.precipitation[index]}mm\n` +
                                            `Showers: ${arr.showers[index]}mm\n` +
                                            `Snowfall: ${arr.snowfall[index]}cm\n` +
                                            //`Snow Depth: ${snow_depth[index]}m\n` +
                                            `Windspeed: ${arr.windspeed_10m[index]}km/h\n` +
                                            `Wind Direction: ${arr.winddirection_80m[index]}°\n` +
                                            `Windgusts: ${arr.windgusts_10m[index]}km/h\n` +
                                            //`Soil Temperature: ${soil_temperature_6cm[index]}°C\n` +
                                            `Soil Moisture: ${arr.soil_moisture_1_3cm[index]}m³/m³\n` ;
            })
            .catch(error => {
                console.log('Error fetching or parsing data:', error);
            });


    }

    function fetchWeather() {
        const country = document.getElementById("countryInput").value;
        console.log(country);
        var lat = countries[country].latitude;
        var lon = countries[country].longitude;

        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,visibility,windspeed_10m,winddirection_80m,windgusts_10m,soil_temperature_6cm,soil_moisture_1_3cm`
        )
            .then((response) => response.json())
            .then((data) => {
                // Process the parsed JSON data
                console.log(data);

                // Access specific values from the JSON object
                console.log(country);
                getUser(country);
            })
            .catch((error) => {
                console.log("Error fetching or parsing data:", error);
            });
    }
