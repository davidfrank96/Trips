/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Trip = require('../models/trip');
const db = require('../db/connect');


const findTripQuery = 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1';
const createTripQuery = 'INSERT INTO trips (bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4) RETURNING *';
const getAllTripsQuery = 'SELECT * FROM trips ORDER BY id DESC';


class TripController {
  static createTrip(req, res) {
    const {
      busId, origin, destination, fare,
    } = req.body;

    const trip = new Trip(busId, origin, destination, fare);
    const tripDetails = [trip.busId, trip.origin, trip.destination, trip.fare];

    db.query(findTripQuery, [busId])
      .then((result1) => {
        const tripFound = result1.rows[0];
        

        if (!tripFound) {
          res.status(400).json({
            status: 400,
            error: `Bus with ID ${busId} not registered`,
          });
          return;
        }

       
        const tripActive = result1.rows.filter(eachtrip => eachtrip.status === 'active');
        // console.log(tripActive, '4');

        if (tripFound && tripActive.length) {
          res.status(404).json({
            status: 404,
            error: `Bus with ID ${busId} & PLATE-NUMBER ${tripActive[0].plate_number} is already assigned`,
          });
        } else {
          db.query(createTripQuery, tripDetails)
            // eslint-disable-next-line no-unused-vars
            .then((result2) => {
            //   console.log(result2.rows);

              res.status(201).json({
                status: 201,
                // status: 'Success',
                data: 'Trip created',
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }


  static getTrips(req, res) {
    db.query(getAllTripsQuery)
      .then((result) => {
        // console.log(result.rows);

        if (result.rows.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available',
          });
        } else {
          const trips = result.rows.map(item => (
            {
              trip_id: item.id,
              bus_id: item.bus_id,
              origin: item.origin,
              destination: item.destination,
              trip_date: item.trip_date,
              booking_status: item.booking_status,
              // passengers: item.passengers,
              fare: item.fare,
              status: item.status,
            }));

          res.status(200).json({
            status: 200,
            data: trips,
          });
        }
      })
      .catch(err => console.log(err));
  }


  static patchTrip(req, res) {
    const { token, userId, isAdmin } = req.body;
    const { tripId } = req.params;

    const patchTripQuery = 'UPDATE trips SET status = $1 WHERE id = $2 RETURNING *';

    db.query(patchTripQuery, ['cancelled', tripId])
      .then((result) => {
        const patchedTrip = result.rows[0];
        // console.log(patchedTrip);

        if (!patchedTrip) {
          res.status(404).json({
            error: 'Trip neither found nor updated',
          });
          return;
        }

        res.status(205).json({
          status: 205,
          message: 'Trip cancelled successfully',
        });
      })
      .catch(err => console.log(err));
  }
}


module.exports = TripController;
