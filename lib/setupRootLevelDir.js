const fs = require('fs-extra')
const path = require('path')
const { getCurrentPath } = require('./files')

const setupRootLevelDir = (plugin, workingDir) => {
  let src = path.join(getCurrentPath(), `/src/plugins/${plugin}/${workingDir}`)
  let target = `${process.cwd()}/${workingDir}`
  let options = { overwrite: true }
  fs.move(src, target, options, () => {
    console.log('setup!')
  })
}

module.exports = setupRootLevelDir
