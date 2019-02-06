const inquirer = require('inquirer')
/**
 * MongoDB Questions
 */
let memory = () => {
  let questions = [{
    name: 'name',
    type: 'input',
    message: 'Adapter Name',
    default: "memory",
  }]
  return inquirer.prompt(questions)
}

module.exports = memory