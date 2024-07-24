<template>
    <a-form
      :form="form"
      @submit.prevent="handleSubmit"
      layout="vertical"
      class="forgot-password-form"
    >
      <a-form-item name="email" label="Correo electrónico">
        <a-input v-model:value="form.email" placeholder="Correo electrónico" />
      </a-form-item>
  
      <a-form-item>
        <a-button type="primary" html-type="submit">Enviar correo de recuperación</a-button>
      </a-form-item>
  
      <a-form-item>
        <a-space>
          <router-link to="/register">Registrarse</router-link> |
          <router-link to="/login">Iniciar Sesión</router-link>
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
    emit('submit', props.form);
  };
  </script>
  