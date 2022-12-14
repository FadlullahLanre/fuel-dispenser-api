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

  testing: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_TES_HOST ,
      user: process.env.MYSQL_TES_USER ,
      password: process.env.MYSQL_TES_PASSWORD,
      database: process.env.MYSQL_TES_DATABASE,

    },
    migrations: {
      directory: "./testing_migrations"
    },
    seeds: {
      directory: "./testing_migrations/seeds"
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
