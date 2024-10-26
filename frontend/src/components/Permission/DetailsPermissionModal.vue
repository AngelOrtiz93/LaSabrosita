<template>
  <a-modal
    :visible="visible"
    title="Detalles del Permiso"
    :width="'60%'"
    @cancel="$emit('cancel')"
    :footer="null"
  >
    <div>
      <h3>Nombre: {{ permission.name }}</h3>
      <p>Descripción: {{ permission.description }}</p>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    permission: {
      type: Object,
      required: true,
    },
  },
};
</script>
