<template>
    <a-modal
      :visible="isVisible"
      title="Detalles del Pedido"
      @cancel="closeModal"
      footer={null}
    >
      <div v-if="pedido">
        <p><strong>Número de Pedido:</strong> {{ pedido.id }}</p>
        <p><strong>Cliente:</strong> {{ pedido.Usuario ? pedido.Usuario.nombre : 'No disponible' }}</p>
        <p><strong>Teléfono:</strong> {{ pedido.Usuario ? pedido.Usuario.telefono : 'No disponible' }}</p>
        <p><strong>Dirección:</strong> {{ pedido.Usuario ? pedido.Usuario.direccion : 'No disponible' }}</p>
        <p><strong>Fecha del Pedido:</strong> {{ pedido.fechaPedido }}</p>
        <p><strong>Estado:</strong> {{ pedido.estado }}</p>
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
        this.$emit('update:isVisible', false);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  