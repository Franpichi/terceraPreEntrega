const CartRepository = require('../repositories/CartRepository');
const ProductRepository = require('../repositories/ProductRepository');
const TicketRepository = require('../repositories/TicketRepository');

module.exports = {
  purchaseCart: async (req, res) => {
    try {
      const cartId = req.params.cid;
      // Obtener el carrito
      const cart = await CartRepository.getCartById(cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      
      // Verificar el stock del producto
      for (const item of cart.items) {
        const product = await ProductRepository.getProductById(item.product);
        if (!product) {
          return res.status(404).json({ message: `Producto ${item.product} no encontrado` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `No hay suficiente stock para ${product.name}` });
        }
      }
      
      // Restar del stock si hay suficiente
      for (const item of cart.items) {
        const product = await ProductRepository.getProductById(item.product);
        product.stock -= item.quantity;
        await product.save();
      }
      
      // Generar ticket de compra
      const ticketData = {
        code: generateTicketCode(),
        purchase_datetime: new Date(),
        amount: cart.total,
        purchaser: cart.user
      };
      const ticket = await TicketRepository.createTicket(ticketData);
      
      // Actualizar el carrito
      cart.items = [];
      cart.total = 0;
      await cart.save();
      
      res.status(200).json({ message: 'Compra realizada con éxito', ticket });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al finalizar la compra del carrito' });
    }
  }
};

// Función para generar un código de ticket único
function generateTicketCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}
