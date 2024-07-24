<template>
    <a-form
      :form="form"
      @submit.prevent="handleSubmit"
      layout="vertical"
      class="register-form"
    >
      <a-form-item name="nombre" label="Nombre">
        <a-input v-model:value="form.nombre" placeholder="Nombre" />
      </a-form-item>
  
      <a-form-item name="apellido" label="Apellido">
        <a-input v-model:value="form.apellido" placeholder="Apellido" />
      </a-form-item>
  
      <a-form-item name="email" label="Correo electrónico">
        <a-input v-model:value="form.email" placeholder="Correo electrónico" />
      </a-form-item>
  
      <a-form-item name="telefono" label="Teléfono">
        <a-input v-model:value="form.telefono" placeholder="Teléfono" />
      </a-form-item>
  
      <a-form-item name="direccion" label="Dirección">
        <a-input v-model:value="form.direccion" placeholder="Dirección" />
      </a-form-item>
  
      <a-form-item name="contraseña" label="Contraseña">
        <a-input-password v-model:value="form.contraseña" placeholder="Contraseña" />
      </a-form-item>
  
      <a-form-item>
        <a-button type="primary" html-type="submit">Registrarse</a-button>
      </a-form-item>
  
      <a-form-item>
        <a-space>
          <router-link to="/login">Iniciar sesión</router-link>
        </a-space>
      </a-form-item>
    </a-form>
  </template>
  
  <script setup>
  const props = defineProps({
    form: Object
  });
  
  const emit = defineEmits(['submit']);
  
  const handleSubmit = () => {
    emit('submit');
  };
  </script>
  