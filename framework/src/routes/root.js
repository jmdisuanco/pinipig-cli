const pkg = require('../../package')
const {
  streamFile
} = require('pinipig')
const Info = (ctx) => {
  let message = {
    result: 'Ok',
    server: 'Pinipig Server',
    app: pkg.name,
    version: pkg.version,
    description: pkg.description
  }
  ctx.res.json(message)
}

let routes = [{
    url: '/info.json',
    GET: Info,
  },
  {
    url: '/*',
    GET: streamFile('./src/public')
  }
]


module.exports = routes