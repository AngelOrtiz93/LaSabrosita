<template>
  <a-modal
    :visible="isVisible" 
    title="Detalles del Producto"
    @cancel="$emit('update:isVisible', false)" 
  >
    <div>
      <p>Detalles del producto aquí...</p>
      <!-- Muestra aquí los detalles del producto -->
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
  },
};
</script>
