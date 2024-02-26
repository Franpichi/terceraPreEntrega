const User = require('../models/User');

module.exports = {
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error al crear usuario en el repositorio');
    }
  },
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Error al obtener usuario por ID en el repositorio');
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar usuario en el repositorio');
    }
  },
  deleteUser: async (userId) => {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error al eliminar usuario en el repositorio');
    }
  }
};
