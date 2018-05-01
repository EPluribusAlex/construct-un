const 
	axios = require("axios"),
	cheerio = require("cheerio"),
	db = require("../models");

module.exports = {
	findAll: function(req, res) {
		db.NewsArticle
			.find(req.query)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	findById: function(req, res) {
		db.NewsArticle
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	comment: function(req, res) {
		db.NewsArticle
			.findOneAndUpdate({_id: req.params.id}, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(400).json(err));
	},
	restock: function(req, res) {
		
		sectionScrape = function(sphere) {

			axios
				.get("https://news.un.org/en/news/region/" + sphere)
				.then((res) => {

					const $ = cheerio.load(res.data);

					$("div.views-row").each((i, element) => {

						const result = {
							sphere: sphere,
							date: $(element).children("span.date-display-single").text(),
							title: $(element).children("h1.story-title").text(),
							link: $(element).children("h1 a").attr("href"),
							category: $(element).children("div.field-item a").text(),
							summary: $(element).children("p").text()
						};

						db.NewsArticle
							.create(result)
							.then((dbNewsArt) => console.log(dbNewsArt))
							.catch((err) => console.log(err));

					});

				})
				.catch((err) => res.json(err));

		}

		const spheres = ["africa", "americas", "asia-pacific", "middle-east", "europe"];

		sectionScrape("africa");

	}
}