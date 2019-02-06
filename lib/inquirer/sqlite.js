const inquirer = require('inquirer')

/**
 * SQLite Adapter Questions
 */
let sqlite = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "sqlite",
    },
    {
      name: 'db',
      type: 'input',
      message: 'Database',
      default: "pinipig.db",
    }
  ]
  return inquirer.prompt(questions)
}
module.exports = sqlite