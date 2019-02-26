const inquirer = require('inquirer')

/**
 * TingoDB Questions
 */
let tingodb = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "tingoDB",
    },
    {
      name: 'database',
      type: 'input',
      message: 'tingoDB database Path',
      default: "./data/db"
    }

  ]

  return inquirer.prompt(questions)
}

module.exports = tingodb