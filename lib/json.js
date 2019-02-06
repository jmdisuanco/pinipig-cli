const fs = require('fs')
const path = require('path')
const files = require('./files')


function json() {

  this.jsonData
  this.filename
  this.jsonPath

  this.init = (jsonPath) => {
    this.jsonPath = jsonPath
    this.filename = path.join(files.getCurrentPath(), this.jsonPath)
    if (fs.existsSync(this.filename)) {
      this.jsonData = require(this.filename)
    } else {
      this.jsonData = {}
    }

  }

  this.get = (path) => {
    return path.split('.').reduce((obj, key) => obj[key], this.jsonData)
  }

  this.set = (key, value) => {
    if (typeof key === 'object') {
      this.jsonData = key
    } else {
      Object.assign(this.jsonData, {
        [key]: value
      })
    }
    this.save()
  }

  this.save = () => {
    if (fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, JSON.stringify(this.jsonData, null, 2))
    } else {
      fs.mkdir(this.filename.substring(0, this.filename.lastIndexOf("/")), () => {
        fs.writeFileSync(this.filename, JSON.stringify(this.jsonData, null, 2))
      })


    }
  }

  this.del = (path) => {
    path.split('.').reduce((obj, key) => this.jsonData[key] = undefined, this.jsonData)
    this.save()
  }

  return this
}

module.exports = json