const pkg = require('../../package')
const Root = (ctx) => {
  let message = JSON.stringify({
    result: 'ok',
    server: 'Pinipig Server',
    app: pkg.name,
    version: pkg.version,
    description: pkg.description
  })
  ctx.res.end(message)
}

let routes = [{
    url: '/',
    GET: Root,
  },

]


module.exports = routes