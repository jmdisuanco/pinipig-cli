const path = require('path')
const { getCurrentPath } = require('./files')
const fs = require('fs')
const { insertLine } = require('./files')
const locater = require('locater')

let ucfirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * route Installer
 * @param {Array} routes
 * return true if no duplicated entry and created a new route
 * returns false if route is already defined
 */
let routeInsert = (plugin, route, fromPlugin = true) => {
  let target = '/src/routes/index.js'

  //OPEN INDEX.JS
  let input = fs.readFileSync(path.join(getCurrentPath(), target), {
    encoding: 'utf8',
  })
  let loc = locater.find('let Routes', input)
  let needle = input.split('\n')
  let line = loc[0].line - 1
  //check if route exist
  let arr = needle[line]
    .split('=')[1]
    .replace(/\s/g, '')
    .replace('[', '')
    .replace(']', '')
    .split(',')
  let routes = arr
  if (routes.includes(route)) {
    return false //already exist
  } else {
    needle[line] = needle[line].replace(']', `, ${route}]`)
    let output = needle.join('\n')
    fs.writeFileSync(path.join(getCurrentPath(), target), output)

    if (fromPlugin) {
      insertLine(
        1,
        `const ${route} = require('../plugins/${[plugin]}/routes/${route}')`,
        target
      )
    } else {
      //if routeEject
      insertLine(1, `const ${route} = require('./${route}')`, target)
    }

    return true //created
  }
}

module.exports = routeInsert
