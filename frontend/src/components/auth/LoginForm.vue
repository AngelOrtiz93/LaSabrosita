<template>
    <a-form
      :form="form"
      @submit.prevent="handleSubmit"
      layout="vertical"
      class="login-form"
    >
      <a-form-item name="email" label="Correo electrónico">
        <a-input v-model:value="form.email" placeholder="Correo electrónico" />
      </a-form-item>
  
      <a-form-item name="password" label="Contraseña">
        <a-input-password v-model:value="form.password" placeholder="Contraseña" />
      </a-form-item>
  
      <a-form-item name="userType" label="Tipo de usuario">
        <a-select v-model:value="form.userType" placeholder="Seleccionar tipo de usuario">
          <a-select-option value="cliente">Cliente</a-select-option>
          <a-select-option value="empleado">Empleado</a-select-option>
          <a-select-option value="domiciliario">Domiciliario</a-select-option>
        </a-select>
      </a-form-item>
  
      <a-form-item>
        <a-button type="primary" html-type="submit">Iniciar sesión</a-button>
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
  
  <style scoped>
  .login-form {
    max-width: 100%;
  }
  </style>
  