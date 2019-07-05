/* eslint-disable no-console */
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../db/connect');
const { getHash, getToken, getCompared } = require('../helpers/hashToken');

const getUserQuery = 'SELECT * FROM users ORDER BY id DESC';
const findUserQuery = 'SELECT * FROM users WHERE email = $1';
const createUserQuery = 'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';


class UserController {
  static createUser(req, res) {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const user = new User(email, firstName, lastName, password);
    const sampleUser = [user.email, user.firstName, user.lastName];

    // console.log(user);
    // console.log(sampleUser);

    db.query(findUserQuery, [email])
      .then((result1) => {
        // console.log(result1.rows);

        if (result1.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Email already exist',
          });
          return;
        }

        const hash = getHash(user.password);
        db.query(createUserQuery, [...sampleUser, hash])
          .then((result2) => {
            // console.log(result2.rows, 'signed up');
            const newUser = result2.rows[0];
            delete newUser.password;
            const token = getToken(newUser);
            const userDetails = { user_id: newUser.id, is_admin: newUser.is_admin, token };

            // console.log(jwt.verify(token, 'Secretkey'));
            res.status(201).json({
              status: 201,
              data: userDetails,
            });
          })
          .catch((err) => {
            console.log(err);

            // let errorMessage;
            // if (err.routine === '_bt_check_unique') {
            //   errorMessage = 'Email already exists';
            // }
            // console.log(errorMessage);

            res.status(400).json({
              status: 400,
              err,
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({
          status: 400,
          err,
        });
      });
  }


  static signIn(req, res) {
    const {
      email, password,
    } = req.body;


    db.query(findUserQuery, [email])
      .then((result1) => {
        const loggedUser = result1.rows[0];
        // console.log(loggedUser);

        if (loggedUser) {
          const compared = getCompared(password, loggedUser.password);

          // console.log(compared);

          if (compared) {
            delete loggedUser.password;
            const token = getToken(loggedUser);
            const loggedDetails = { user_id: loggedUser.id, is_admin: loggedUser.is_admin, token };

            // console.log(jwt.verify(token, 'Secretkey'));
            res.status(200).json({
              status: 200,
              data: loggedDetails,
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Password is invalid',
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            error: 'Email is invalid',
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json({
          status: 400,
          err,
        });
      });
  }


  static getUsers(req, res) {
    db.query(getUserQuery)
      .then((result) => {
        // console.log(result.rows);

        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            message: 'No user on record',

          });
          return;
        }

        const users = result.rows.map(user => (
          {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            is_admin: user.is_admin,
          }));

        res.status(200).json({
          status: 200,
          data: users,
        });
      })
      .catch((err) => {
        console.log(err);

        res.status(400).json({
          status: 400,
          err,
        });
      });
  }
}

module.exports = UserController;
