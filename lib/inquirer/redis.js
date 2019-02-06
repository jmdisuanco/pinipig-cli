const inquirer = require('inquirer')

/**
 * MongoDB Questions
 */
let redis = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "redis",
    },
    {
      name: 'host',
      type: 'input',
      message: 'Host',
      default: "localhost",
    },
    {
      name: 'port',
      type: 'input',
      message: 'Port',
      default: 6379,
    },

  ]

  return inquirer.prompt(questions)
}

module.exports = redis