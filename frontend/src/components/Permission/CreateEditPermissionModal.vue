<template>
  <a-modal
    :open="visible"  
    :title="isEditing ? 'Editar Permiso' : 'Crear Permiso'"
    @ok="isEditing ? updatePermission() : createPermission()"
    @cancel="$emit('cancel')"
  >
    <a-form :model="form">
      <a-form-item label="Nombre">
        <a-input v-model:value="form.nombre" />
      </a-form-item>
      <a-form-item label="Descripción">
        <a-input v-model:value="form.descripcion" />
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
    isEditing: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
  },
  emits: ['cancel', 'save'],
  methods: {
    createPermission() {
      this.$emit('save', { action: 'create', data: this.form });
    },
    updatePermission() {
      this.$emit('save', { action: 'update', data: this.form });
    },
  },
};
</script>
