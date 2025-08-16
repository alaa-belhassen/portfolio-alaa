const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON POST body

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST route to send email
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received email request:', req.body);
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const mailOptions = {
    from: email, // sender address (from form)
    to: process.env.EMAIL_USER, // your email to receive messages
    subject: `New message from ${name}`,
    text: message,
    replyTo: email // Allows you to reply directly to the sender's email

  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
