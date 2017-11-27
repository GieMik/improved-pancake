const beerRoutes = require('./beer_routes');

module.exports = function(app) {
	app.use(function(req, res, next) {
		// console.log(req)
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});
  beerRoutes(app);
};