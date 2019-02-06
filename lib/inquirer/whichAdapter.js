const inquirer = require('inquirer')
/**
 * SQLite whichAdapter Questions
 */
let whichAdapter = () => {
  let questions = [{
    type: 'list',
    name: 'adapter',
    default: 'mongodb',
    description: 'Database',
    choices: ['memory', 'sqlite', 'mongodb', 'mysql', 'redis', 'postgres', 'rethinkdb']
  }]
  return inquirer.prompt(questions)
}
module.exports = whichAdapter