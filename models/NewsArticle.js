const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	// 
});

module.exports = mongoose.model("NewsArticle", articleSchema);