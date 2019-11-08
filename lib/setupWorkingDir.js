const fs = require('fs-extra')
const path = require('path')
const { getCurrentPath } = require('./files')

const setupWorkingDir = (plugin, workingDir) => {
  let src = path.join(getCurrentPath(), `/src/plugins/${plugin}/${workingDir}`)
  let target = path.join(getCurrentPath(), `/src/${workingDir}`)
  let options = { overwrite: true }
  fs.move(src, target, options, () => {
    console.log(`${workingDir} ok!`)
  })
}

module.exports = setupWorkingDir
