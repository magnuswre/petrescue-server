const dbEngine = process.env.DB_ENVIRONMENT || 'developement';
const config = require('./knexfile')[dbEngine]

module.exports = require('knex')(config)