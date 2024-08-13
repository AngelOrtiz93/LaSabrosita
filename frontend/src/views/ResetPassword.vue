<template>
  <a-layout class="layout reset-password-layout">
    <a-layout-content class="content reset-password-content">
      <a-card title="Restablecer Contraseña" class="card reset-password-card">
        <ResetPasswordForm :form="form" @submit="handleResetPassword" />
      </a-card>
    </a-layout-content>
    <a-layout-footer class="footer">Restaurante La Sabrosita ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';  // Import useRouter
import { message } from 'ant-design-vue';
import { resetPassword } from '@/api/auth';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue';

const form = ref({
  token: '',
  newPassword: ''
});

const route = useRoute();
const router = useRouter();  // Initialize router

// Cargar el token desde los parámetros de ruta cuando el componente se monta
onMounted(() => {
  const routeToken = route.params.token;
  if (routeToken) {
    form.value.token = routeToken;
  }
});

// Manejar el envío del formulario
const handleResetPassword = async (formData) => {
  try {
    const response = await resetPassword(formData);
    // Mostrar el mensaje de éxito desde el backend
    message.success(response.message || 'Contraseña restablecida exitosamente');
    // Redirigir al login después de mostrar el mensaje de éxito
    setTimeout(() => router.push('/login'), 1000); // Tiempo para que el mensaje se muestre
  } catch (error) {
    // Mostrar el mensaje de error desde el backend
    message.error(error.response?.data?.message || 'Error al restablecer la contraseña');
  }
};
</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
