const { getHash } = require('../../../helpers/hashToken');

const user1 = `INSERT INTO users (
                email, first_name, last_name, password, is_admin)
                VALUES ('oba@gmail.com', 'oba', 'femi', '${getHash('pass1')}', true);`;

const user2 = `INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('dami@gmail.com', 'dami', 'lola', '${getHash('pass2')}');`;

const user3 = `INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('demi@gmail.com', 'demi', 'lade', '${getHash('pass3')}');`;

const user4 = `INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('oye@gmail.com', 'oye', 'toke', '${getHash('pass4')}');`;


const usersQuery = `${user1}${user2}${user3}${user4}`;

module.exports = usersQuery;
