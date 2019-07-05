/* eslint-disable no-console */
const db = require('../../connect');
const userSeedQuery = require('../seedTables/users');
const busSeedQuery = require('../seedTables/buses');
const tripSeedQuery = require('../seedTables/trips');
const bookingSeedQuery = require('../seedTables/bookings');

const seedQuery = `${userSeedQuery}${busSeedQuery}${tripSeedQuery}${bookingSeedQuery}`;


const seed = async () => {
  const res = await db.query(seedQuery)
    .then((result) => {
      console.log(result.rows);
      console.log('Tables seeded');
    })
    .catch(err => console.log(err));

  return res;
};


seed();

module.exports = seed;
