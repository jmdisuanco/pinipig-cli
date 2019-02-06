const fs = require('fs')
const path = require('path')

let getCurrentDirectoryBase = () => {
  return path.basename(process.cwd())
}

let getCurrentPath = () => {
  let rootpath = `${path.dirname(process.cwd())}/${path.basename(process.cwd())}`
  return rootpath
}

let directoryExists = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory()
  } catch (err) {
    return false;
  }
}



/**
 * Insert a line on a file
 * 
 * @param {Int} line 
 * @param {String} newdata 
 * @param {String} sourceFile 
 * 
 */
let insertLine = (line, data, sourceFile) => {
  let srcPath = getCurrentPath() + sourceFile
  let sourceData = fs.readFileSync(srcPath).toString().split('\n')
  sourceData.splice(line - 1, 0, data)
  let result = sourceData.join('\n')
  fs.writeFileSync(srcPath, result)
}


/**
 * Append on a file
 * 
 * @param {String} newdata 
 * @param {String} sourceFile 
 * 
 */
let append = (data, sourceFile) => {
  let srcPath = getCurrentPath() + sourceFile
  fs.appendFileSync(srcPath, data)

}

module.exports = {
  getCurrentDirectoryBase,
  getCurrentPath,
  directoryExists,
  insertLine,
  append
}