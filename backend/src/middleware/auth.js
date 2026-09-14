const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protege rutas verificando el token JWT enviado en el header Authorization
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalido o expirado' });
    }
  }

  return res.status(401).json({ message: 'No autorizado, falta token' });
};

module.exports = { protect };
