const tripTable = `CREATE TABLE IF NOT EXISTS trips (
                    id SERIAL PRIMARY KEY,
                    bus_id INT NOT NULL,
                    origin TEXT NOT NULL,
                    destination TEXT NOT NULL,
                    trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    fare NUMERIC(10, 2) NOT NULL,
                    status TEXT DEFAULT 'active',
                    booking_status INT DEFAULT 0,
                    passengers TEXT DEFAULT 'none',
                    FOREIGN KEY (bus_id) REFERENCES buses (id)
                    );`;


module.exports = tripTable;
