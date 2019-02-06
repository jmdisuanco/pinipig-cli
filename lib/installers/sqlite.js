const json = require('../json')
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
    driver: 'sqlite',
    database: meta.db
  }
  conf.set(meta.name, config)
  meta.method = meta.name.charAt(0).toUpperCase() + meta.name.slice(1)
  // generate template
  writeFile(`/src/adapters/${meta.name}.js`, meta, 'adapter')
  let adapters
  pinipigConf.get('adapters') != undefined ? adapters = pinipigConf.get('adapters') : adapters = []
  adapters.push(meta.name)
  pinipigConf.set('adapters', adapters)
  moduleInstaller(['install', 'sqlite'])
}

module.exports = install