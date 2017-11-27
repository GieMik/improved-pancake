module.exports = function(app) {
	app.get('/api/beers', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization !== 'VerySecretToken') {
      res.status(401);
	    res.send('Unauthorized');
	    return;
	  }
    
    let beersList = require('../../models/beers')
    // Create a copy
    let beers = JSON.parse(JSON.stringify(beersList))

    if (req.query.hasOwnProperty('name')) {
      beers.items = beers.items.filter(x => x.name.toLowerCase().includes(req.query.name.toLowerCase()))
    }

    if (req.query.hasOwnProperty('color')) {
      beers.items = beers.items.filter(x => x.color.toLowerCase() === req.query.color.toLowerCase())
    }

    if (req.query.hasOwnProperty('attr')) {
      beers.items.sort((x, y) => x[req.query.attr] < y[req.query.attr])
    }

    if (req.query.hasOwnProperty('sort')) {
      req.query['sort'] === 'asc' ? beers.items.reverse() : '' 
    }

    console.log(req.query)
    
		res.send(beers);
	});
};