<template>
  <a-modal
    :visible="isVisible" 
    title="Confirmar Eliminación"
    @ok="handleDelete"
    @cancel="handleCancel"
  >
    <p>¿Estás seguro de que deseas eliminar este producto?</p>
  </a-modal>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleDelete() {
      // Lógica para eliminar el producto
      this.$emit('delete-confirmed');
    },
    handleCancel() {
      this.$emit('update:isVisible', false);
    },
  },
};
</script>
