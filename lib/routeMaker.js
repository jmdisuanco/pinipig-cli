const writeFile = require('./writefile')
const path = require('path')
const {
  getCurrentPath
} = require('../lib/files')
const fs = require('fs')
const {
  insertLine
} = require('../lib/files')
const locater = require('locater')

let ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * model maker
 * @param {String} model 
 * @param {Array} schema 
 */
let routeMaker = (schema, options) => {
  let Model = ucfirst(options.model)
  let model = options.model
  let target = '/src/routes/index.js'
  let meta = {
    Model,
    model
  }
  writeFile(`/src/routes/${model}.js`, meta, 'route')
  insertLine(1, `const ${model} = require('./${model}')`, target)
  //OPEN INDEX.JS
  let input = fs.readFileSync(path.join(getCurrentPath(), target), {
    encoding: 'utf8'
  })
  let loc = locater.find('let Routes', input)
  let needle = input.split("\n")
  let line = loc[0].line - 1
  needle[line] = needle[line].replace(']', `, ${model}]`)
  let output = needle.join("\n")
  fs.writeFileSync(path.join(getCurrentPath(), target), output)
}

module.exports = routeMaker