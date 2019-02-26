const sqlite = require('./sqlite')
const memory = require('./memory')
const mongodb = require('./mongodb')
const redis = require('./redis')
const postgres = require('./postgres')
const mysql = require('./mysql')
const rethinkdb = require('./rethinkdb')
const tingodb = require('./tingodb')
module.exports = {
  sqlite,
  memory,
  mongodb,
  redis,
  mysql,
  postgres,
  rethinkdb,
  tingodb
}