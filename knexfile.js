// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/traveldiaries.sqlite3' // OBS! Den här sökvägen måste vara helt rätt! 
      // Detta medddelande kommer annars - >SQLITE_CANTOPEN: unable to open database file Error: SQLITE_CANTOPEN: unable to open database file
          }, 
    useNullAsDefault:true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
