// app/services/AuthService.js
const jwt = require('jsonwebtoken');
const RepositoryFactory = require('../repositories/RepositoryFactory');

const AuthService = {
  generateToken: (user) => {
    return jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  },
  login: async (email, password) => {
    const userRepository = RepositoryFactory.getRepository('User');
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }
    return AuthService.generateToken(user);
  }
};

module.exports = AuthService;
