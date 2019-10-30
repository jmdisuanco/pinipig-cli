#!/usr/bin/env node

const c = require('8colors')
const clear = require('clear')
const figlet = require('figlet')
const files = require('./lib/files')
const writeFile = require('./lib/writefile')
const inquirer = require('./lib/inquirer')
const pinipig = require('commander')
const pkg = require('./package')
const path = require('path')
const ora = require('ora')
const install = require('./lib/installers')
const pluginInstaller = require('./lib/pluginInstaller')
const fs = require('fs-extra')
const modelMaker = require('./lib/modelMaker')
const routeMaker = require('./lib/routeMaker')
const json = require('./lib/json')
const generateSecret = require('./lib/generatesecret')
const conf = new json()
const { installFromPackage } = require('./lib/npm')

let askPackageDetails = async data => {
  const package = await inquirer.packageJson(data)
  package.keywords = JSON.stringify(package.keywords.split(','))

  //write package file
  writeFile('/package.json', package, 'package.json')

  //create needed empty directories
  const fs = require('fs-extra')
  const adaptersDir = './src/adapters'
  const hooksDir = './src/hooks'
  const modelsDir = './src/models'
  fs.ensureDir(adaptersDir, err => {
    console.log(err) // => null
    console.log(`directory ${adaptersDir} has been created`)
  })

  fs.ensureDir(hooksDir, err => {
    console.log(err) // => null
    console.log(`directory ${hooksDir} has been created`)
  })

  fs.ensureDir(modelsDir, err => {
    console.log(err) // => null
    console.log(`directory ${modelsDir} has been created`)
  })
  //copy framework structure
  let source = path.join(__dirname, './framework')

  fs.copy(source, files.getCurrentPath(), function(err) {
    const spinnerF = ora('Building Structure').start()
    if (err) {
      spinnerF.fail(['Unable to Build the Structure'])
      return false
    }
    spinnerF.succeed(['Pinipig structure built'])
    conf.init('./src/config/default.json')
    let confJWT = {
      secret: `${generateSecret(128)}`,
      option: {
        issuer: `${package.name}`,
        subject: 'userAuth',
        expiresIn: '1w',
      },
    }
    conf.set('jwt', confJWT)
  })

  installFromPackage()
}

/**  Start of console **/
clear()
console.log(
  c.yellow(
    figlet.textSync('Pinipig', {
      horizontalLayout: 'full',
    })
  )
)
pinipig.version(`v${pkg.version}`)

pinipig
  .command('init [name]')
  .description('run setup commands for all envs')
  .option('-a, --auto', 'auto install')
  .action(function(name, options) {
    name == undefined
      ? (name = files.getCurrentDirectoryBase().replace('-', ''))
      : null
    let data = {
      name: name,
    }
    console.log(`initializing ${name} App`)
    askPackageDetails(data)
  })

pinipig
  .command('install [plugin]')
  .description('install pinipig plugin')
  .option('-f')
  .action(function(plugin, options) {
    if (plugin == undefined) {
      console.log('install which plugin?')
      return
    }
    let data = {
      plugin,
    }
    console.log(`installing ${plugin} plugin...`)
    pluginInstaller(data)
  })

pinipig
  .command('adapter')
  .alias('db')
  .description('Add DB Adapter')
  .option(
    '-a --add',
    'Add Database Connection/ Adapter [memory, mongodb, sqlite, redis]'
  )
  .option('-ls --list', 'List Existing DB Adapters')
  .action(function(cmd, options) {
    if (cmd) {
      if (cmd === 'sqlite') {
        ;(async () => {
          console.log('creating SQLlite3 Adapter')
          const meta = await inquirer.sqlite()
          install.sqlite(meta)
        })()
      } else if (cmd === 'mongodb') {
        ;(async () => {
          console.log('creating MongoDB Adapter')
          const db = await inquirer.mongodb()
          console.log(db)
        })()
      } else if (cmd === 'mysql') {
        ;(async () => {
          console.log('creating mySQL Adapter')
          const db = await inquirer.mysql()
          console.log(db)
        })()
      } else if (cmd === 'rethinkdb') {
        ;(async () => {
          console.log('creating reThinkDB Adapter')
          const db = await inquirer.rethinkdb()
          console.log(db)
        })()
      } else if (cmd === 'postgres') {
        ;(async () => {
          console.log('creating Postgres Adapter')
          const db = await inquirer.postgres()
          console.log(db)
        })()
      } else if (cmd === 'redis') {
        ;(async () => {
          console.log('creating Redis Adapter')
          const db = await inquirer.redis()
          console.log(db)
        })()
      } else if (cmd === 'memory') {
        ;(async () => {
          console.log('creating memory Adapter')
          const db = await inquirer.memory()
          console.log(db)
        })()
      } else {
        ;(async () => {
          console.log('DB Adapter not found \n please select from the list')
          const answer = await inquirer.whichAdapter()
          if (answer.adapter === 'sqlite') {
            let meta = await inquirer.sqlite()
            install.sqlite(meta)
          } else if (answer.adapter === 'mongodb') {
            let meta = await inquirer.mongodb()
            install.mongodb(meta)
          } else if (answer.adapter === 'memory') {
            let meta = await inquirer.memory()
            install.memory(meta)
          } else if (answer.adapter === 'redis') {
            let meta = await inquirer.redis()
            install.redis(meta)
          } else if (answer.adapter === 'mysql') {
            let meta = await inquirer.mysql()
            install.mysql(meta)
          } else if (answer.adapter === 'rethinkdb') {
            let meta = await inquirer.rethinkdb()
            install.rethinkdb(meta)
          } else if (answer.adapter === 'postgres') {
            let meta = await inquirer.postgres()
            install.postgres(meta)
          } else if (answer.adapter === 'tingodb') {
            let meta = await inquirer.tingodb()
            install.tingodb(meta)
          }
        })()
      }
    } else {
      ;(async () => {
        console.log('Please specify a Database')
        const adapter = await inquirer.whichAdapter()
        console.log(adapter)
      })()
    }
  })

pinipig
  .command('model')
  .alias('m')
  .option('-m,  --model <model>')
  .option('-a,  --adapter <adapet>')
  .option('-r --route')
  .description('create a Model')
  .action((cmd, options) => {
    console.log('Generating Model')
    modelMaker(cmd, options)
    if (options.route) {
      routeMaker(cmd, options)
    }
  })

pinipig.parse(process.argv)
