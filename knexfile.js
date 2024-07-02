module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost', // your database host
        user: 'root', // your database user
        password: 'admin', // your database password
        database: 'tutor', // your database name
      },
      migrations: {
        directory: './migrations',
      },
      seeds:{
        directory: './seeds',
      }
    },
  };


