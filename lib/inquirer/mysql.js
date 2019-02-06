const inquirer = require('inquirer')

/**
 * Mysql Questions
 */
let mysql = () => {
  let questions = [{
      name: 'name',
      type: 'input',
      message: 'Adapter Name',
      default: "mysql",
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
      default: 3306,
    },
    {
      name: 'database',
      type: 'input',
      message: 'Database',
      default: "pinipig",
    },
    {
      name: 'username',
      type: 'input',
      message: 'Username',
      default: "root",
    },
    {
      name: 'password',
      type: 'input',
      message: 'Password',
      default: "password",
    },
    {
      name: 'pool',
      type: 'input',
      message: 'Pool',
      default: true,
    },

  ]

  return inquirer.prompt(questions)
}

module.exports = mysql