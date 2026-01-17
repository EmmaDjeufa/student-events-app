const cloudinary = require('cloudinary').v2

console.log('CLOUDINARY CONFIG CHECK', {
  cloud: process.env.CLOUDINARY_NAME,
  keyPresent: !!process.env.CLOUDINARY_KEY,
  secretPresent: !!process.env.CLOUDINARY_SECRET,
})



module.exports = cloudinary
