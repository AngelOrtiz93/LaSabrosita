<template>
  <a-modal
    :visible="isVisible"
    title="Detalles del Pedido"
    @cancel="closeModal"
    :footer="null"
  >
    <div v-if="pedido">
      <p><strong>Número de Pedido:</strong> {{ pedido.id }}</p>
      <p><strong>Cliente:</strong> {{ pedido.Usuario ? pedido.Usuario.nombre : 'No disponible' }}</p>
      <p><strong>Teléfono:</strong> {{ pedido.Usuario ? pedido.Usuario.telefono : 'No disponible' }}</p>
      <p><strong>Dirección:</strong> {{ pedido.Usuario ? pedido.Usuario.direccion : 'No disponible' }}</p>
      <p><strong>Fecha del Pedido:</strong> {{ new Date(pedido.fechaPedido).toLocaleString() }}</p>
      <p><strong>Estado:</strong> {{ pedido.estado }}</p>

      <!-- Tabla para los detalles del pedido -->
      <a-table :columns="detailColumns" :data-source="pedido.DetallePedidos" rowKey="id" />
      <p class="valor-total"><strong>Valor Total:</strong> ${{ pedido.total.toFixed(2) }}</p>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    pedido: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:isVisible'],
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false); // Emitir el evento para cerrar el modal
    },
  },
  computed: {
  detailColumns() {
    return [
      {
        title: 'Producto',
        dataIndex: ['Producto', 'nombre'],
        key: 'productoNombre',
        render: (text, record) => record.Producto ? record.Producto.nombre : 'No disponible', // Manejo de caso donde puede que no haya producto
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
      },
      {
        title: 'Precio',
        dataIndex: 'precioUnitario', // Este campo se está utilizando correctamente
        key: 'precio',
        render: (text) => `$${text.toFixed(2)}`, // Muestra el precio formateado
      },
    ];
  },
},

};
</script>

<style scoped>
/* Estilos opcionales */
.valor-total {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
