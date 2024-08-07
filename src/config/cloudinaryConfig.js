// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dl91kein6', // Reemplaza con tu Cloud Name
  api_key: '121388871514333',       // Reemplaza con tu API Key
  api_secret: 'lNaWxURDHZjr9a166L8BDkZx_68'  // Reemplaza con tu API Secret
});

module.exports = cloudinary;
