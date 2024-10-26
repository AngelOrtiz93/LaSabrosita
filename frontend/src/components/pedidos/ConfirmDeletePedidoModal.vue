<template>
    <a-modal
      :visible="isVisible"
      title="Confirmar Eliminación"
      @cancel="closeModal"
      @ok="confirmDelete"
      ok-type="danger"
    >
      <p>¿Estás seguro de que deseas eliminar este pedido?</p>
    </a-modal>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      pedidoId: {
        type: Number,
        required: true,
      },
    },
    emits: ['update:isVisible', 'deleteConfirmed'],
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false);
      },
      confirmDelete() {
        this.$emit('deleteConfirmed', this.pedidoId);
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  