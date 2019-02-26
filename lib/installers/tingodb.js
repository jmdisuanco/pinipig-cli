const json = require('../json')
const fs = require('fs-extra')


const {
  moduleInstaller
} = require('../npm')
const pinipigConf = new json()
const conf = new json()
const writeFile = require('../writefile')
let install = (meta) => {
  pinipigConf.init('/.pinipig.json')
  let configpath = 'src/config/default.json'
  conf.init(configpath)

  //write config entry
  let config = {
    driver: 'tingodb',
    database: meta.database
  }
  let dir = meta.database

  conf.set(meta.name, config)
  meta.method = meta.name.charAt(0).toUpperCase() + meta.name.slice(1)
  // generate template
  writeFile(`/src/adapters/${meta.name}.js`, meta, 'adapter')
  let adapters
  pinipigConf.get('adapters') != undefined ? adapters = pinipigConf.get('adapters') : adapters = []
  adapters.push(meta.name)
  pinipigConf.set('adapters', adapters)
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    console.log('directory /db/data has been created')
  })
  moduleInstaller(['install', 'tingodb'])
}

module.exports = install