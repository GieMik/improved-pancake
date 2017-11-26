const express = require('express');
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser');

const app = express();

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8000;

// Import and set Nuxt.js options
let config = require('./nuxt.config.js')

const nuxt = new Nuxt(config)

config.dev = process.env.NODE_ENV !== 'production'

// Start build process in dev mode
if (config.dev) {
	const builder = new Builder(nuxt)
	builder.build()
}

app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes')(app)
// app.use(express.static('assets'))

app.use(nuxt.render)

app.listen(port, host)
