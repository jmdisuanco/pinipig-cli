const inquirer = require('inquirer')

/**
 * MongoDB Questions
 */
let mongodb = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "mongodb",
    },
    {
      name: 'host',
      type: 'input',
      message: 'mongoDB host',
      default: "localhost"
    },
    {
      name: 'port',
      type: 'input',
      message: 'mongoDB port',
      default: 27017
    },
    {
      name: 'username',
      type: 'input',
      message: 'username',
      default: undefined
    },
    {
      name: 'password',
      type: 'input',
      message: 'password',
      default: undefined
    },

  ]

  return inquirer.prompt(questions)
}

module.exports = mongodb