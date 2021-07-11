var express = require('express');
const app = express();
var router = express.Router();
const { apiAuthMiddleware: requireApiKey } = require('./auth');
const fetch = require('node-fetch');
const {getFriends} = require('./twitter-api');

router.get('/testEndpoint', requireApiKey,(req,res) => {
  res.send("hello");
});

router.get('/callthtwitter/:screenname',requireApiKey, async (req,res) => {
	const screenname = req.params.screenname.toLowerCase();
	const twitterFriends = await getFriends(screenname);
	res.send({
		twitterFriends: twitterFriends
	});
});


app.use('/', router);

module.exports = app;