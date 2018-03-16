'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH_HOST: '"http://localhost:3000"',
  API_ROOT: '"http://api.local.com:3000"',
  WEB_HOST: '"http://localhost:5020"'
})
