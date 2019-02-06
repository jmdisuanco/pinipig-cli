const fs = require('fs')
const path = require('path')
const parser = require('./parser')
const files = require('./files')
const prettier = require('prettier')
/**
 * Writes Generate Template into a file
 * @param {String} targetpath 
 * @param {*} data 
 * @param {String} template 
 */
let writeFile = (targetpath, data, template) => {
  let option = {
    parser: 'babel',
    tabWidth: 2,
    semi: false,
    singleQuote: true
  }
  let source = path.join(__dirname, '../templates/' + template + '.template')
  let fileTemplate = fs.readFileSync(source).toString()
  let result = parser(data, fileTemplate)
  console.log(`Writing... ${files.getCurrentPath()}${targetpath}`)
  if (template.split('.')[1] != 'json') {
    fs.writeFileSync(files.getCurrentPath() + targetpath, prettier.format(result, option))
  } else {
    fs.writeFileSync(files.getCurrentPath() + targetpath, result)
  }

}
module.exports = writeFile