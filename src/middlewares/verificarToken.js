const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Token recibido en el servidor:', authHeader);
  
    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ error: 'Malformed token' });
    }
  
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        console.error('Error al verificar el token:', err);
        return res.status(500).json({ error: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
}

module.exports = verificarToken;
