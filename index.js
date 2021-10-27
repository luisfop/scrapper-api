const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articles = [
  {
    name: 'The times',
    address: 'https://www.thetimes.co.uk/environment/climate-change'
  },
  {
    name: 'The Guardian',
    address: 'https://www.theguardian.com/environment/climate-crisis'
  },
  {
    name: 'Telegraph',
    address: 'https://www.telegraph.co.uk/climate-change'
  },
];

app.get("/", (req, res) => {
  res.json("Welcome to Climate Change News API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({ title, url });
      });
      res.json(articles);
    })
    .catch((err) => console.log("Error catching", err));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
