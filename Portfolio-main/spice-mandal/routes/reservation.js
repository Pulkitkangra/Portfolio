const express = require('express');
const router = express.Router();

// GET - Reservation page
router.get('/', (req, res) => {
  res.render('reservation', {
    title: 'Reserve a Table | Spice Mandal',
    activePage: 'reservation'
  });
});

// POST - Handle reservation form
router.post('/', (req, res) => {
  const { firstName, lastName, email, phone, date, time, guests, occasion, requests } = req.body;

  // Basic validation
  if (!firstName || !email || !phone || !date || !guests) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields.'
    });
  }

  // In production: save to DB, send email, etc.
  const reservationId = 'SM' + Date.now().toString().slice(-6);

  console.log(`\n📅 New Reservation Request:`);
  console.log(`   ID: ${reservationId}`);
  console.log(`   Guest: ${firstName} ${lastName}`);
  console.log(`   Date: ${date} at ${time}`);
  console.log(`   Party: ${guests}`);
  console.log(`   Contact: ${email} | ${phone}\n`);

  res.json({
    success: true,
    reservationId,
    message: `Table reserved! Your confirmation ID is ${reservationId}. We'll send confirmation to ${email} within 10 minutes.`
  });
});

module.exports = router;
