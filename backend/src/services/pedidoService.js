const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detallePedido');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

// Obtener todos los pedidos con detalles y el nombre del usuario
exports.getAllPedidos = async () => {
  try {
    return await Pedido.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['nombre'] // Incluye el campo nombre del Usuario
        },
        {
          model: DetallePedido,
          include: [Producto]
        }
      ]
    });
  } catch (error) {
    throw new Error('Error al obtener pedidos: ' + error.message);
  }
};

// Obtener un pedido por ID con detalles y el nombre del usuario
exports.getPedidoById = async (id) => {
  try {
    return await Pedido.findByPk(id, {
      include: [
        {
          model: DetallePedido,
          include: [Producto]
        },
        {
          model: Usuario,
          attributes: ['nombre'] // Incluye el campo nombre del Usuario
        }
      ]
    });
  } catch (error) {
    throw new Error('Error al obtener pedido: ' + error.message);
  }
};

// Crear un nuevo pedido
exports.createPedido = async (pedidoData) => {
  try {
    const { detalles, usuarioId, ...pedidoInfo } = pedidoData;
    const newPedido = await Pedido.create({
      ...pedidoInfo,
      usuarioId // Incluye el usuarioId si es necesario
    });

    if (detalles && detalles.length > 0) {
      await Promise.all(detalles.map(detalle => 
        DetallePedido.create({
          ...detalle,
          pedidoId: newPedido.id
        })
      ));
    }

    return newPedido;
  } catch (error) {
    throw new Error('Error al crear pedido: ' + error.message);
  }
};

// Actualizar un pedido
exports.updatePedido = async (id, pedidoData) => {
  try {
    const { detalles, usuarioId, ...pedidoInfo } = pedidoData;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error('Pedido no encontrado');

    await pedido.update({
      ...pedidoInfo,
      usuarioId // Actualiza el usuarioId si es necesario
    });

    // Actualizar detalles si es necesario
    if (detalles) {
      // Eliminar detalles existentes y agregar los nuevos
      await DetallePedido.destroy({ where: { pedidoId: pedido.id } });

      if (detalles.length > 0) {
        await Promise.all(detalles.map(detalle => 
          DetallePedido.create({
            ...detalle,
            pedidoId: pedido.id
          })
        ));
      }
    }

    return pedido;
  } catch (error) {
    throw new Error('Error al actualizar pedido: ' + error.message);
  }
};
