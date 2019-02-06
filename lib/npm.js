let {
    spawn
} = require('child_process')
const ora = require('ora')

/**
 * 
 * @param {Array} packages 
 */
let moduleInstaller = (packages) => {
    console.log(packages)
    let npminstall = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', packages)
    const spinner = ora('Installing Packages').start();
    npminstall.on('message', (msg) => {
        console.log(msg)
    })
    npminstall.on('close', () => {
        spinner.succeed(['Packages Installed'])
    })
}
let installFromPackage = () => {
    const spinner = ora('Installing Dependencies').start();
    let npminstall = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'])
    npminstall.on('message', (msg) => {
        console.log(msg)
    })
    npminstall.on('close', (data) => {
        spinner.succeed(['Dependencies Installed'])
    })
}


module.exports = {
    moduleInstaller,
    installFromPackage
}