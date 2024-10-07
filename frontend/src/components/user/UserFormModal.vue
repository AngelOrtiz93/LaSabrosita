<template>
  <a-modal
    :visible="visible"
    @update:visible="handleVisibilityChange"
    :title="isEditing ? 'Editar Usuario' : 'Crear Usuario'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :model="form"
      layout="vertical"
      :rules="rules"
      ref="userForm"
      enctype="multipart/form-data"
    >
      <a-form-item label="Nombre" :rules="rules.nombre">
        <a-input v-model:value="form.nombre" placeholder="Nombre" />
      </a-form-item>

      <a-form-item label="Apellido" :rules="rules.apellido">
        <a-input v-model:value="form.apellido" placeholder="Apellido" />
      </a-form-item>

      <a-form-item label="Email" :rules="rules.email">
        <a-input v-model:value="form.email" placeholder="Email" />
      </a-form-item>

      <a-form-item label="Teléfono" :rules="rules.telefono">
        <a-input v-model:value="form.telefono" placeholder="Teléfono" />
      </a-form-item>

      <a-form-item label="Dirección" :rules="rules.direccion">
        <a-input v-model:value="form.direccion" placeholder="Dirección" />
      </a-form-item>

      <a-form-item label="Contraseña" v-if="!isEditing" :rules="rules.contraseña">
        <a-input-password v-model:value="form.contraseña" placeholder="Contraseña" />
      </a-form-item>

      <a-form-item label="Imagen">
        <a-input type="file" @change="handleFileChange" />
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
        nombre: [{ required: true, message: 'Por favor ingresa el nombre' }],
        apellido: [{ required: true, message: 'Por favor ingresa el apellido' }],
        email: [{ required: true, type: 'email', message: 'Por favor ingresa un email válido' }],
        telefono: [{ required: true, message: 'Por favor ingresa el teléfono' }],
        direccion: [{ required: true, message: 'Por favor ingresa la dirección' }],
        contraseña: [{ required: true, message: 'Por favor ingresa la contraseña' }],
      },
      selectedFile: null,
    };
  },
  methods: {
    handleVisibilityChange(visible) {
      this.$emit('update:visible', visible);
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.form.imagen = file; // Asigna el archivo a `form.imagen`
      }
    },
    async handleOk() {
      try {
        await this.$refs.userForm.validate();

        const formData = new FormData();

        // Añadir los campos del formulario a FormData, excluyendo 'imagen' y 'contraseña' si no es necesario
        Object.keys(this.form).forEach(key => {
          if (this.isEditing && key === 'contraseña' && !this.form.contraseña) {
            return; // No añadir contraseña si no se proporciona
          }
          if (key !== 'imagen') {
            formData.append(key, this.form[key] || '');
          }
        });

        // Añadir el archivo imagen a FormData si existe
        if (this.selectedFile) {
          formData.append('imagen', this.selectedFile);
        }

        console.log('Datos del FormData:', Array.from(formData.entries()));

        if (this.isEditing) {
          this.$emit('update', formData);
        } else {
          this.$emit('create', formData);
        }
      } catch (error) {
        console.error('Error en handleOk:', error);
      }
    },
    handleCancel() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
</style>
