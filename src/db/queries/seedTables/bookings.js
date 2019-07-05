const booking1 = `INSERT INTO bookings (
                    trip_id, user_id, bus_id)
                    VALUES (1, 2, 1);`;

const booking2 = `INSERT INTO bookings (
                    trip_id, user_id, bus_id)
                    VALUES (2, 4, 2);`;

const booking3 = `INSERT INTO bookings (
                    trip_id, user_id, bus_id)
                    VALUES (1, 1, 1);`;

const booking4 = `INSERT INTO bookings (
                    trip_id, user_id, bus_id)
                    VALUES (4, 3, 4);`;


const bookingsQuery = `${booking1}${booking2}${booking3}${booking4}`;

module.exports = bookingsQuery;
