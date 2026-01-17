const cloudinary = require('cloudinary').v2

console.log('CLOUDINARY CONFIG:', {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY ? 'OK' : 'MISSING',
  secret: process.env.CLOUDINARY_SECRET ? 'OK' : 'MISSING',
})


module.exports = cloudinary
