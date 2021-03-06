const c = require('8colors')
const fs = require('fs-extra')
const path = require('path')
const { getCurrentPath } = require('./files')
const curl = require('curlrequest')
const { moduleInstaller } = require('./npm')
const routeInsert = require('./routeInsert')
const updateScripts = require('./updateScripts')
const setupWorkingDir = require('./setupWorkingDir')
const setupRootLevelDir = require('./setupRootLevelDir')
const degit = require('degit')
const emoji = require('./simple-emoji')

const degitInfo = (msg) => {
  let newMessage = `${emoji.get('zap')} : ${msg}`
  const lines = msg.split(' ')
  lines.includes('found')
    ? (newMessage = `${emoji.get('zap')} : Found plugin repository`)
    : lines.includes('locally')
    ? (newMessage = `${emoji.get('zap')} : Installing from Locally cache repo`)
    : lines.includes('extracting')
    ? (newMessage = `${emoji.get('zap')} : Extracting to ${lines[3]}`)
    : null
  return newMessage
}
const getRegistry = () => {
  return new Promise((resolve, reject) => {
    curl.request(
      {
        url: `https://raw.githubusercontent.com/jmdisuanco/pinipig-plugin-registry/master/registry.json`,
      },
      (err, stdout) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(stdout))
        }
      }
    )
  })
}

const getInstallerMeta = (repository) => {
  return new Promise((resolve, reject) => {
    curl.request(
      {
        url: repository,
      },
      (err, stdout) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(stdout))
        }
      }
    )
  })
}

const getRaw = (repo) => {
  let raw = repo
    .replace('.git', '/')
    .replace('https://github.com/', 'https://raw.githubusercontent.com/')
    .split('/')
  let l = raw.length
  raw.splice(l, 0, 'master')
  let str = raw
  let result = str.join('/') + '/installer.json'
  return result
}

const pluginInstaller = async (data) => {
  let { plugin } = data
  let repo = ''
  let raw
  if (RegExp(/^https?:/).test(plugin)) {
    raw = getRaw(plugin)
  } else if (RegExp(/([a-z]*)\/([a-z]*)/).test(plugin)) {
    let meta = plugin.split('/')
    let newendpoint = `https://github.com/${meta[0]}/pinipig-plugin-${meta[1]}`
    raw = getRaw(newendpoint)
  } else {
    let registry = await getRegistry()
    let details = registry.find(function(o) {
      return o.name == plugin
    })
    repo = await details.repository
    raw = getRaw(repo)
  }
  let config = await getInstallerMeta(raw)
  let {
    name,
    dependencies,
    required,
    route,
    model,
    scripts,
    devDependencies,
    repository,
    folderName,
    workingDir,
    public,
    routeEject,
  } = config

  //if repository is defined Degit Files
  if (repository) {
    console.log(`${c.green('Cloning')} : ${repository}`)
    const emitter = degit(repository, {
      cache: false,
      force: true,
      verbose: true,
    })

    emitter.on('info', (info) => {
      console.log(degitInfo(info.message))
    })

    emitter.clone(`${process.cwd()}/src/plugins/${folderName}`).then(() => {
      if (workingDir) {
        setupWorkingDir(folderName, workingDir)
      }
      if (public) {
        setupRootLevelDir(folderName, 'public')
      }
      if (routeEject) {
        let src = path.join(
          getCurrentPath(),
          `/src/plugins/${folderName}/routes/${routeEject}.js`
        )
        let target = path.join(getCurrentPath(), `/src/routes/${routeEject}.js`)
        let options = { overwrite: true }
        fs.move(src, target, options, () => {
          //define
          routeInsert(null, routeEject, false)
          console.log(`server route ${routeEject} : created`)
        })
      }
      console.log(`${emoji.get('sunny')} : Success`)
    })
  }

  //Install Dev Dependencies
  if (devDependencies.length != 0) {
    console.log(`${emoji.get('gear')} : installing dev dependencies`)
    devDependencies.unshift('install', '--save-dev')
    moduleInstaller(devDependencies)
  }
  //Install Dependencies
  if (dependencies.length != 0) {
    console.log(`${emoji.get('gear')} : installing dependencies`)

    dependencies.unshift('install')
    moduleInstaller(dependencies)
  }
  if (route) {
    console.log(`${emoji.get('construction')} : Constructing routes`)
    let result = routeInsert(folderName, route)
    if (result) {
      console.log(`${emoji.get('white_check_mark')} : routes created`)
    } else {
      console.log(
        `${emoji.get(
          'warning'
        )} : warning skipping  route  ${route} is  already used`
      )
    }
  }

  if (scripts) {
    updateScripts(scripts)
  }
}

module.exports = pluginInstaller
