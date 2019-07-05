const bookingTable = `CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL NOT NULL,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        bus_id INT NOT NULL,
        trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        seat_number INT DEFAULT 1,
        created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY(trip_id, user_id),
        FOREIGN KEY (trip_id) REFERENCES trips (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
        );`;


module.exports = bookingTable;
