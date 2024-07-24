<template>
  <a-layout class="layout forgot-password-layout">
    <a-layout-content class="content forgot-password-content">
      <a-card title="Olvidó Contraseña" class="card forgot-password-card">
        <ForgotPasswordForm :form="form" @submit="handleForgotPassword" />
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { forgotPassword } from '@/api/auth';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';

const form = ref({
  email: ''
});

const handleForgotPassword = async (formData) => {
  try {
    await forgotPassword(formData);
    message.success('Correo de recuperación enviado');
  } catch (error) {
    message.error(error.response?.data?.message || 'Error al enviar correo de recuperación');
  }
};
</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
