const c = require('8colors')
const emoji = require('./simple-emoji')
const writeFile = require('./writefile')
const json = require('./json')
const conf = new json()

list = ['Number', 'Integer', 'Float', 'Double', 'Real', 'Boolean', 'Date', 'String', 'Text', 'Json', 'BLOB']
let ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * model maker
 * @param {String} model 
 * @param {Array} schema 
 */
let modelMaker = (schema, options) => {
  let Model = ucfirst(options.model)
  let model = options.model
  let Adapter = ucfirst(options.adapter)
  let adapter = options.adapter
  let fields = schema.split(',')
  let definitions = {}
  fields.map(entry => {
    let obj = entry.split(':')
    let key = obj[0]
    let type = ucfirst(obj[1])
    let exist = list.find(function (o) {
      return o === type
    })
    if (exist != undefined) {
      Object.assign(definitions, {
        [key]: {
          type: `${Adapter}.${type}`
        }
      })
    } else {
      console.log(emoji.get('warning') + '  ' + c.br(`Ommited field ${key}. Reason: invalid data type "${type}"`).end())
    }

  })
  let schemas = JSON.stringify(definitions).replace(/"/g, '')
  let meta = {
    Model,
    model,
    adapter,
    Adapter,
    schemas
  }
  writeFile(`/src/models/${model}.js`, meta, 'model')
  conf.init('/.pinipig.json')
  let confModels
  conf.get('models') != undefined ? confModels = conf.get('adapters') : confModels = []
  confModels.push(model)
  conf.set('models', confModels)
}

module.exports = modelMaker