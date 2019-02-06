let emoji = require('./emoji')

let get = (string) => {
  return emoji[string]
}

module.exports = {
  get
}