const packageJson = require('./package_json')
const mongodb = require('./mongodb')
const postgres = require('./postgres')
const mysql = require('./mysql')
const sqlite = require('./sqlite')
const rethinkdb = require('./rethinkdb')
const whichAdapter = require('./whichAdapter')
const memory = require('./memory')
const redis = require('./redis')
module.exports = {
  packageJson,
  mongodb,
  sqlite,
  whichAdapter,
  memory,
  rethinkdb,
  mysql,
  redis,
  postgres
}