/* eslint-disable no-undef */
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:@Skunky85@localhost/book_order',
    migrations: {
        directory: `${__dirname}/migrations`,
    },
    seeds: {
        directory: `${__dirname}/seeds`,
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
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
