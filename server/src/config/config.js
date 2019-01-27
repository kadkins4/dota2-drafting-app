module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'd2drafter',
    user: process.env.DB_USER || 'd2drafter',
    password: process.env.DB_PASS || 'd2drafter',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './d2drafter.sqlite',
      operatorsAliases: false,
    },
  },
};
