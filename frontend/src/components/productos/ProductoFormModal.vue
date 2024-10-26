<template>
  <a-modal
    :visible="isVisible" 
    :title="isEditing ? 'Editar Producto' : 'Crear Producto'"
    @ok="handleSubmit"
    @cancel="$emit('update:isVisible', false)"
  >
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nombre del Producto</label>
        <input v-model="producto.name" id="name" required />
      </div>
      <div>
        <label for="price">Precio</label>
        <input v-model="producto.price" id="price" type="number" required />
      </div>
      <!-- Otros campos del formulario -->
    </form>
  </a-modal>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    producto: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleSubmit() {
      // Lógica para crear o editar el producto
      this.$emit('submit', this.producto);
    },
  },
};
</script>
