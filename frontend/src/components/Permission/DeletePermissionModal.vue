<template>
  <a-modal
    :visible="visible"
    title="Confirmar Eliminación"
    @ok="onDelete"
    @cancel="$emit('cancel')"
  >
    <p>¿Estás seguro de que deseas eliminar este permiso?</p>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['cancel', 'delete'],
  methods: {
    onDelete() {
      this.$emit('delete'); // Emitir el evento delete para manejar la eliminación
    },
  },
};
</script>
