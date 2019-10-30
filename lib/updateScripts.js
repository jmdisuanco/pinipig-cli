/**
 * Updates scripts entry in package.json
 *
 */
const path = require('path')
const { getCurrentPath } = require('./files')
const fs = require('fs')

const updateScripts = scripts => {
  let target = path.join(getCurrentPath(), 'package.json')
  let pkg = require(target)
  let result = Object.assign(pkg.scripts, scripts)
  pkg.scripts = result
  fs.writeFileSync(target, JSON.stringify(pkg, 2, null))
}

module.exports = updateScripts
