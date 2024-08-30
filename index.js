const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL, 
        pass: process.env.EMAIL_APP_PASSWORD 
    }
});

// API endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;


    console.log(email);
    
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email, 
        replyTo: email,
        subject: `Contact from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
