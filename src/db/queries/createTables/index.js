/* eslint-disable no-console */
const db = require('../../connect');
const userTableQuery = require('../createTables/userTable');
const busTableQuery = require('../createTables/busTable');
const tripTableQuery = require('../createTables/tripTable');
const bookingTableQuery = require('../createTables/bookingTable');

const tableQuery = `${userTableQuery}${busTableQuery}${tripTableQuery}${bookingTableQuery}`;


const create = async () => {
  const res = await db.query(tableQuery)
    .then((result) => {
      console.log(result.rows);
      console.log('Tables created');
    })
    .catch(err => console.log(err));

  return res;
};


create();

module.exports = create;
