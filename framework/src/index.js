const pinipig = require('pinipig')
const routes = require('./routes')
const config = require('./config/default')

let options = {
  port: config.port,
  routes: routes
}

let server = pinipig.createServer(options)