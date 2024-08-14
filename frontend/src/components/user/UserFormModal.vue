<template>
  <a-modal
    :visible="visible"
    @update:visible="handleVisibilityChange"
    title="Crear Usuario"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :model="form"
      layout="vertical"
      :rules="rules"
      ref="userForm"
    >
    <a-form-item label="Nombre" name="nombre">
        <a-input v-model:value="form.nombre" />
      </a-form-item>
      <a-form-item label="Apellido" name="apellido">
        <a-input v-model:value="form.apellido" />
      </a-form-item>
      <a-form-item label="Email" name="email">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="Teléfono" name="telefono">
        <a-input v-model:value="form.telefono" />
      </a-form-item>
      <a-form-item label="Dirección" name="direccion">
        <a-input v-model:value="form.direccion" />
      </a-form-item>
      <a-form-item v-if="!isEditing" label="Contraseña" name="contraseña">
        <a-input-password v-model:value="form.contraseña" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    isEditing: Boolean,
    form: Object,
  },
  data() {
    return {
      rules: {
        // Form validation rules
      },
    };
  },
  methods: {
    handleVisibilityChange(visible) {
      this.$emit('update:visible', visible);
    },
    async handleOk() {
      try {
        await this.$refs.userForm.validate();
        if (this.isEditing) {
          this.$emit('update');
        } else {
          this.$emit('create'); 
        }
      } catch (error) {
        console.log('Validación fallida:', error);
      }
    },
    handleCancel() {
      this.$emit('close');
    },
  },
};
</script>
