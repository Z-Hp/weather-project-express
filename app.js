const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  const apiKey = "de15c9f16194f76e846594d747ae8139";
  const unit = "metric";

  const cityName = req.body.city;
  console.log(req.body.city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = Math.round(weatherData.main.temp);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The temprature in ${cityName} is ${temp}</h1> `);
      res.write(
        `<p>The weather is currently ${description} in ${cityName}.</p>`
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
