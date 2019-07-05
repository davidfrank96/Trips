const trip1 = `INSERT INTO trips (
                bus_id, origin, destination, fare, status)
                VALUES (1, 'IBADAN', 'LAGOS', 2000, 'cancelled');`;

const trip2 = `INSERT INTO trips (
                bus_id, origin, destination, fare)
                VALUES (2, 'OSOGBO', 'LAGOS', 2000);`;

const trip3 = `INSERT INTO trips (
                bus_id, origin, destination, fare, status)
                VALUES (3, 'IBADAN', 'BENIN', 2000, 'cancelled');`;

const trip4 = `INSERT INTO trips (
                bus_id, origin, destination, fare)
                VALUES (4, 'IBADAN', 'ABUJA', 2000);`;


const tripsQuery = `${trip1}${trip2}${trip3}${trip4}`;

module.exports = tripsQuery;
