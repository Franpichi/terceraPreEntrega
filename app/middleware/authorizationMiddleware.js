// app/middleware/authorizationMiddleware.js
const authorizationMiddleware = (req, res, next) => {
    try {
      // Implementación de la lógica de autorización
      const userRole = req.user.role; // Suponiendo que el rol del usuario se almacena en req.user.role
      if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Acceso no autorizado' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en la autorización' });
    }
  };
  
  module.exports = authorizationMiddleware;
  