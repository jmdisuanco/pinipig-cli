const inquirer = require('inquirer')

let packageJson = (data) => {
  console.log('package', data)
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Pinipig App Name',
      default: data.name,
    },
    {
      type: 'list',
      name: 'appType',
      default: 'REST',
      description: 'Server Type',
      choices: ['REST', 'REST and Real-Time (Socket.io)']
    },
    {
      name: 'description',
      type: 'input',
      message: 'Description',
      default: 'Yet another Pinipig App',
    },
    {
      name: 'keywords',
      type: 'input',
      message: 'Keywords(coma separated)',
      default: '"pinipig", "app", "api", "backend"',
    },
    {
      name: 'version',
      type: 'input',
      description: 'Version',
      default: '1.0.0'
    },
    {
      name: 'author',
      type: 'input',
      description: 'Author'
    },
    {
      type: 'list',
      name: 'license',
      default: 'MIT',
      description: 'License',
      choices: ['MIT', 'ISC']
    }
  ]
  return inquirer.prompt(questions)
}

module.exports = packageJson