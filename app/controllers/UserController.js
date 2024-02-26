const UserRepository = require('../repositories/UserRepository');

module.exports = {
  register: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await UserRepository.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el registro de usuario' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const validPassword = await user.isValidPassword(password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      // Generar y devolver un token de autenticación si lo deseas
      res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const userDTO = {
        id: user._id,
        name: user.name,
        email: user.email
      };
      res.json(userDTO);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener información del usuario' });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await UserRepository.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const userDTO = {
        id: user._id,
        name: user.name,
        email: user.email
      };
      res.json(userDTO);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener información del usuario actual' });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userData = req.body;
      const updatedUser = await UserRepository.updateUser(userId, userData);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      await UserRepository.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    }
  }
};
