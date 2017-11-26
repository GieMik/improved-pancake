module.exports = function(app) {
	app.get('/api/beers/', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization !== 'VerySecretToken') {
      res.status(401);
			res.send('Unauthorized');
			return;
		}
    
		const response = require('../../models/beers')

		res.send(response);
	});
};