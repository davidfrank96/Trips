// const pg = require('pg');
const { Client } = require('pg');
const dotenv = require('dotenv');
const configString = require('../config');
const configStringHeroku = require('../config/herokuconfig');

dotenv.config();


// const db = new pg.Pool(configString);
// const db = new pg.Pool({ configStringHeroku, ssl: true });
//   connectionString: configString,

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Client({
    connectionString: configStringHeroku,
    ssl: true,
  });
} else {
  db = new Client(configString);
}

db.connect();


// if (process.env.NODE_ENV === 'production') {
//     options = uri;
// } else {
//     options = uri;
// }
// console.log(options);


// client.connect();

// module.exports = { client };


module.exports = db;
