// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_DEV_HOST,
      user: process.env.MYSQL_DEV_USER,
      password: process.env.MYSQL_DEV_PASSWORD,
      database: process.env.MYSQL_DEV_DATABASE,

    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./migrations/seeds"
    }
  },


  staging: {
    client: 'mysql2',
    connection: {
      host: 'db4free.net',
      database: 'pump_database',
      user: 'fadlulanre',
      password: 'fadlullah',
      port: 3306
    },   
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: "./prod_migrations"
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
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
