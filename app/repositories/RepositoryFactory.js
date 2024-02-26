// app/repositories/RepositoryFactory.js
const UserRepository = require('./UserRepository');
// Importar otros repositorios según sea necesario
// const ProductRepository = require('./ProductRepository');

module.exports = {
  getRepository: (entity) => {
    switch (entity) {
      case 'User':
        return UserRepository;
      // Agregar casos para otros repositorios
      // case 'Product':
      //   return ProductRepository;
      default:
        throw new Error('Repositorio no encontrado');
    }
  }
};
