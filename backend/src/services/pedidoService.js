// src/services/pedidoService.js

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
          attributes: ['nombre', 'telefono', 'direccion'] // Incluye el campo nombre del Usuario
        },
        {
          model: DetallePedido,
          include: [Producto] // Incluye los detalles del pedido
        }
      ]
    });
  } catch (error) {
    throw new Error('Error al obtener pedidos: ' + error.message);
  }
};

// Obtener pedidos por cliente
exports.getPedidosByUsuario = async (usuarioId) => {
  try {
    return await Pedido.findAll({
      where: { usuarioId: usuarioId },
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'telefono', 'direccion'] // Incluye los campos que necesitas
        },
        {
          model: DetallePedido,
          include: [
            {
              model: Producto,
              attributes: ['nombre', 'precio', 'descripcion', 'stock', 'imagenUrl'] // Incluye atributos necesarios de Producto
            }
          ]
        }
      ]
    });
  } catch (error) {
    throw new Error('Error al obtener pedidos del usuario: ' + error.message);
  }
};

// Obtener un pedido por ID con detalles y el nombre del usuario
exports.getPedidoById = async (id) => {
  try {
    return await Pedido.findByPk(id, {
      include: [
        {
          model: Usuario,
          attributes: ['nombre', 'telefono', 'direccion'] // Incluye campos del Usuario
        },
        {
          model: DetallePedido,
          include: [Producto] // Incluye detalles del pedido
        }
      ]
    });
  } catch (error) {
    throw new Error('Error al obtener pedido: ' + error.message);
  }
};

exports.createPedido = async (pedidoData) => {
  try {
    const { detalles, usuarioId, ...pedidoInfo } = pedidoData;

    // Calcular el total
    const total = detalles.reduce((sum, detalle) => {
      return sum + (detalle.precioUnitario * detalle.cantidad); // Suponiendo que tienes estos campos en detalle
    }, 0);

    const newPedido = await Pedido.create({
      ...pedidoInfo,
      usuarioId,
      total // Guarda el total calculado
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

exports.updatePedido = async (id, data) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  // Actualizar solo los campos permitidos
  if (data.estado) {
    pedido.estado = data.estado;
  }

  await pedido.save();
  return pedido;
};

// Eliminar un pedido
exports.deletePedido = async (id) => {
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error('Pedido no encontrado');

    // Eliminar detalles del pedido
    await DetallePedido.destroy({ where: { pedidoId: id } });

    // Eliminar pedido
    await pedido.destroy();

    return true;
  } catch (error) {
    throw new Error('Error al eliminar pedido: ' + error.message);
  }
};

// Obtener pedidos asignados a un domiciliario
exports.getPedidosAsignados = async (domiciliarioId) => {
  try {
    return await Pedido.findAll({ where: { domiciliarioId } });
  } catch (error) {
    throw new Error('Error al obtener pedidos asignados al domiciliario: ' + error.message);
  }
};

// Contar pedidos completados por un domiciliario
exports.countPedidosCompletados = async (domiciliarioId) => {
  try {
    return await Pedido.count({ where: { domiciliarioId, estado: 'Completado' } });
  } catch (error) {
    throw new Error('Error al contar pedidos completados por domiciliario: ' + error.message);
  }
};

// Obtener pedidos asignados a un empleado
exports.getPedidosAsignadosEmpleado = async (empleadoId) => {
  try {
    return await Pedido.findAll({ where: { empleadoId } });
  } catch (error) {
    throw new Error('Error al obtener pedidos asignados al empleado: ' + error.message);
  }
};

// Contar pedidos completados por un empleado
exports.countPedidosCompletadosEmpleado = async (empleadoId) => {
  try {
    return await Pedido.count({ where: { empleadoId, estado: 'Completado' } });
  } catch (error) {
    throw new Error('Error al contar pedidos completados por empleado: ' + error.message);
  }
};
