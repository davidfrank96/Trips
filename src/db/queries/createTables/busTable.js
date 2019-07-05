const busTable = `CREATE TABLE IF NOT EXISTS buses(
                    id SERIAL PRIMARY KEY,
                    plate_number TEXT UNIQUE NOT NULL,
                    manufacturer TEXT NOT NULL,
                    model TEXT NOT NULL,
                    year TEXT NOT NULL,
                    capacity INT NOT NULL
                    );`;


module.exports = busTable;
