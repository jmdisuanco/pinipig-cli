const inquirer = require('inquirer')

/**
 * MongoDB Questions
 */
let rethinkdb = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "rethinkdb",
    },
    {
      name: 'host',
      type: 'input',
      message: 'reThinkDB host',
      default: "localhost"
    },
    {
      name: 'port',
      type: 'input',
      message: 'reThinkDB port',
      default: 28015
    }
  ]

  return inquirer.prompt(questions)
}

module.exports = rethinkdb