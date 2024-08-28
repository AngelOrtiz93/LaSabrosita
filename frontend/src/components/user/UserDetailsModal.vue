<template>
  <a-modal
    :visible="visible"
    @update:visible="handleVisibilityChange"
    title="Detalles del Usuario"
    @cancel="handleCancel"
  >
    <a-form :model="detailsForm" layout="vertical" :disabled="true">
      <a-form-item label="Nombre">
        <a-input v-model:value="detailsForm.nombre" />
      </a-form-item>
      <a-form-item label="Apellido">
        <a-input v-model:value="detailsForm.apellido" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model:value="detailsForm.email" />
      </a-form-item>
      <a-form-item label="Teléfono">
        <a-input v-model:value="detailsForm.telefono" />
      </a-form-item>
      <a-form-item label="Dirección">
        <a-input v-model:value="detailsForm.direccion" />
      </a-form-item>
      <a-form-item label="Roles">
        <a-tag v-for="role in detailsForm.roles" :key="role.id">{{ role.name }}</a-tag>
      </a-form-item>
      <a-form-item label="Imagen">
        <a-img :src="detailsForm.imagenUrl" alt="Imagen del usuario" style="width: 100px; height: 100px; object-fit: cover;" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>


<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    detailsForm: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleVisibilityChange(visible) {
      this.$emit('update:visible', visible);
    },
    handleCancel() {
      this.$emit('close');
    },
  },
};
</script>

