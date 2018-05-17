const 
	express = require("express"),
	controllers = require("../controllers");

const 
	router = express.Router(),
	news = controllers.newsController,
	comments = controllers.commentController;

router.route("/").get(news.findAll);

router.route("/refresh").get(news.restock);

router.route("/article/:id")
	.get(news.findById);

router.route("/:user/comment")
	.get(news.findComments)
	.put(news.makeComment);

router.route("/:user/:comment")
	.delete(news.removeComment);

module.exports = router;
