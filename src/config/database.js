// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    modelPaths: [path.resolve('src/features/**/entities/*.entity{.ts}')],
  },
};
