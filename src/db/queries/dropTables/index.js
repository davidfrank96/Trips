/* eslint-disable no-console */
const db = require('../../connect');

const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropBusesTable = 'DROP TABLE IF EXISTS buses CASCADE;';
const dropTripsTable = 'DROP TABLE IF EXISTS trips CASCADE;';
const dropBookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE;';

const dropQuery = `${dropUsersTable}${dropBusesTable}${dropTripsTable}${dropBookingsTable}`;

const drop = async () => {
  const res = await db.query(dropQuery)
    .then((result) => {
      console.log(result.rows);
      console.log('Tables dropped');
    })
    .catch(err => console.log(err));

  return res;
};

drop();

module.exports = drop;
