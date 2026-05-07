module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'my_app_dev'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'password'),
      schema: 'public',
      ssl: env.bool('DATABASE_TLS', false)
        ? { rejectUnauthorized: false }
        : false,
    },
    acquireConnectionTimeout: 60000 * 10,
    debug: env.bool('DATABASE_DEBUG', false),
    pool: {
      min: 0,
      max: env.int('DATABASE_POOL_SIZE_MAX', 10),
      acquireTimeoutMillis: 60000 * 10,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
    },
  },
});
