/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const Booking = require('../models/booking');
const db = require('../db/connect');


class BookingController {
  static createBooking(req, res) {
    const {
      token, userId, isAdmin, tripId,
    } = req.body;

    const newBooking = new Booking(userId, tripId);
    const getTripsQuery = 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE buses.id = $1';
    const checkBookingQuery = 'SELECT * FROM bookings INNER JOIN users ON bookings.user_id = users.id WHERE user_id = $1 AND trip_id = $2';
    const updateTripQuery = 'UPDATE trips SET booking_status = $1 WHERE id = $2 RETURNING *';
    const updateData = [1, tripId];
    const bookingQuery = 'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const bookingData = [userId, tripId];

    // console.log(tripId, userId);
    // console.log(newBooking);

    db.query(getTripsQuery, [tripId])
      .then((result1) => {
        const foundTrip = result1.rows[0];
        console.log('Trip found', foundTrip);

        if (foundTrip.status === 'cancelled') {
          res.status(404).json({
            status: 404,
            error: 'Trip has been cancelled',
          });
          return;
        }

        if (!foundTrip) {
          res.status(404).json({
            status: 404,
            error: 'Trip is not available',
          });
          return;
        }

        db.query(checkBookingQuery, bookingData)
          .then((result2) => {
            const tripBooked = result2.rows[0];
            console.log('Booking checked', tripBooked);

            if (tripBooked) {
              res.status(404).json({
                status: 404,
                error: 'You are booked on this trip already',
              });
              return;
            }
            // console.log('updateData', updateData);

            db.query(updateTripQuery, updateData)
              .then((result3) => {
                const tripUpdate = result3.rows[0];
                // console.log('Trip updated', tripUpdate);

                // res.status(200).json({
                //   status: 200,
                //   data: 'Your trip has been booked',
                // });

                // console.log('bookingData', bookingData);

                const moreBookingData = [foundTrip.bus_id, tripUpdate.trip_date, tripUpdate.booking_status];
                const completeBookingData = [...bookingData, ...moreBookingData];

                db.query(bookingQuery, completeBookingData)
                  .then((result4) => {
                    const booking = result4.rows[0];
                    // console.log('Booked:', booking);

                    const data = {
                      booking_id: booking.id,
                      trip_id: booking.trip_id,
                      user_id: booking.user_id,
                      bus_id: foundTrip.bus_id,
                      trip_date: tripUpdate.trip_date,
                      seat_number: tripUpdate.booking_status,
                      message: 'Your trip has been booked',
                    };

                    res.status(200).json({
                      status: 200,
                      data,
                    });
                  })
                  .catch(err => console.log(err));
                //     let errorMessage;
                //     if (err.routine === '_bt_check_unique') {
                //       errorMessage = 'You are booked on this trip already';
                //     }
                //     console.log(errorMessage);
                //     res.status(400).json({
                //       status: 400,
                //       errorMessage,
                //     });
                //   });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }


  static getBookings(req, res) {
    const { token, userId, isAdmin } = req.body;
    // const getBookingQuery = 'SELECT * FROM bookings INNER JOIN users ON bookings.user_id = users.id ORDER BY bookings.id DESC';
    const getBookingQuery = 'SELECT * FROM bookings INNER JOIN users ON bookings.user_id = users.id';

    db.query(getBookingQuery)
      .then((result) => {
        // console.log(result.rows);
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No bookings on record',
          });
          return;
        }

        const data = result.rows.map(item => (
          {
            booking_id: item.id,
            trip_id: item.trip_id,
            user_id: item.user_id,
            bus_id: item.bus_id,
            trip_date: item.created_on,
            seat_number: item.seat_number,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
          }
        ));

        res.status(200).json({
          status: 200,
          data,
        });
      })
      .catch(err => console.log(err));
  }

  static deleteBooking(req, res) {
    const { token, userId, isAdmin } = req.body;
    const { bookingId } = req.params;

    console.log(bookingId, userId);

    const deleteBookingQuery = 'DELETE FROM bookings WHERE id = $1 RETURNING *';

    db.query(deleteBookingQuery, [bookingId])
      .then((result) => {
        const data = result.rows[0];
        console.log(data);

        if (data === undefined) {
          res.status(404).json({
            status: 404,
            error: 'Booking neither found nor deleted',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          message: 'Booking deleted successfully',
        });
      })
      .catch(err => console.log(err));
  }
}


module.exports = BookingController;
