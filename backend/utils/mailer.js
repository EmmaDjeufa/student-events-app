const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
})

async function sendMail(to, subject, text) {
  await transporter.sendMail({
    from: 'no-reply@student-events.com',
    to,
    subject,
    text
  })
}

module.exports = sendMail
