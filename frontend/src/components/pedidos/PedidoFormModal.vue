<template>
    <a-modal
      :visible="isVisible"
      title="Editar Pedido"
      @ok="updatePedido"
      @cancel="resetModal"
    >
      <a-form :model="form" @submit.prevent="updatePedido">
        <a-form-item label="Estado">
          <a-select v-model="form.estado">
            <a-select-option value="Pendiente">Pendiente</a-select-option>
            <a-select-option value="En Proceso">En Proceso</a-select-option>
            <a-select-option value="Enviado">Enviado</a-select-option>
            <a-select-option value="Entregado">Entregado</a-select-option>
            <a-select-option value="Cancelado">Cancelado</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
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
        required: true,
      },
    },
    emits: ['update:isVisible', 'pedidoUpdated'],
    data() {
      return {
        form: {
          id: this.pedido.id,
          estado: this.pedido.estado,
        },
      };
    },
    methods: {
      resetModal() {
        this.$emit('update:isVisible', false);
      },
      updatePedido() {
        this.$emit('pedidoUpdated', { ...this.form });
        this.resetModal();
      },
    },
    watch: {
      pedido: {
        immediate: true,
        handler(newValue) {
          this.form.estado = newValue.estado;
        },
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  