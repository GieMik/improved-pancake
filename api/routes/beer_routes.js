module.exports = function(app) {
  let beersList = require('../../models/beers')

  app.get('/api/beer/:id', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization !== 'VerySecretToken') {
      res.status(401);
	    res.send('Unauthorized');
	    return;
    }

    // Create a copy
    let beers = JSON.parse(JSON.stringify(beersList))

    let beer = beers.items.find(x => x.id === req.params.id)

    if (!beer) {
      res.send({errors: 1, data: null, message: 'Sorry, such beer doesnt\' exist'});
      return
    }

    res.send({errors: false, data: beer, message: 'Success'});
  });

	app.get('/api/beers', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization !== 'VerySecretToken') {
      res.status(401);
	    res.send('Unauthorized');
	    return;
    }
    
    // Create a copy
    let beers = JSON.parse(JSON.stringify(beersList))

    if (req.query.hasOwnProperty('name')) {
      beers.items = beers.items.filter(x => x.name.toLowerCase().includes(req.query.name.toLowerCase()))
    }

    if (req.query.hasOwnProperty('color')) {
      beers.items = beers.items.filter(x => x.color.toLowerCase() === req.query.color.toLowerCase())
    }

    if (req.query.hasOwnProperty('bitterness')) {
      beers.items = beers.items.filter(x => x.bitterness >= +req.query.bitterness[0] && x.bitterness <= +req.query.bitterness[1] )
    }

    if (req.query.hasOwnProperty('alc')) {
      beers.items = beers.items.filter(x => x.alc >= +req.query.alc[0] && x.alc <= +req.query.alc[1] )
    }

    if (req.query.hasOwnProperty('attr') && req.query.hasOwnProperty('sort')) {
      beers.items.sort((x, y) => x[req.query.attr] < y[req.query.attr])
      req.query['sort'] === 'asc' ? beers.items.reverse() : '' 
    }

    if (beers.items.length === 0) {
      res.send({errors: 1, data: null, message: 'Sorry, no beers meet your desires'});
      return
    }
    
		res.send({errors: false, data: beers, message: 'Success'});
  });
};