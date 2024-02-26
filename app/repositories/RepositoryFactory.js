const UserRepository = require('./UserRepository');

module.exports = {
  getRepository: (entity) => {
    switch (entity) {
      case 'User':
        return UserRepository;
      default:
        throw new Error('Repositorio no encontrado');
    }
  }
};
