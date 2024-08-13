<template>
  <a-layout class="layout login-layout">
    <a-layout-content class="content login-content">
      <a-card title="Iniciar sesión" class="card login-card">
        <LoginForm :form="form" @submit="handleLogin" />
      </a-card>
    </a-layout-content>
    <a-layout-footer class="footer">Restaurante La Sabrosita ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { login } from '@/api/auth';
import LoginForm from '@/components/auth/LoginForm.vue';
import { errorMessages } from 'vue/compiler-sfc';

const form = ref({
  email: '',
  password: ''
});

const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login(form.value);
    const { token } = response;

    // Decodifica el token para obtener la información del usuario
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const { roleNames = [], roleIds = [], id } = decodedToken;

    // Almacena roleNames y roleIds en localStorage
    localStorage.setItem('roleNames', JSON.stringify(roleNames)); // Guardamos roleNames como una cadena JSON
    localStorage.setItem('userId', id);
    localStorage.setItem('roleIds', JSON.stringify(roleIds)); // Guardamos roleIds como una cadena JSON

    if (roleNames.includes('Cliente')) {
      router.push('/cliente-dashboard');
    } else {
      router.push('/administrador-dashboard');
    }
  } catch (error) {
    // Muestra una notificación de error si ocurre un problema
    const errorMessage = error.response?.data?.message || error.message;

    notification.error({
      message: 'Error de inicio de sesión',
      description: errorMessage,
      placement: 'topRight',
    });
  }
};

</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
