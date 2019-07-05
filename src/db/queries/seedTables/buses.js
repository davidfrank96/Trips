const bus1 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('SMK584AZ', 'KIA', 'CERATO', '2010', 5);`;

const bus2 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('SMK787EQ', 'TOYOTA', 'COROLLA', '2010', 5);`;

const bus3 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('LND657AZ', 'VOLKSWAGEN', 'GOLF', '1999', 5);`;

const bus4 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('EKY06CC', 'TOYOTA', 'SIENNA', '2000', 8);`;


const busesQuery = `${bus1}${bus2}${bus3}${bus4}`;

module.exports = busesQuery;
