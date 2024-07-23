<template>
  <a-layout class="login-layout">
    <a-layout-content class="login-content">
      <a-card title="Iniciar sesión" class="login-card">
        <LoginForm :form="form" @submit="handleLogin" />
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { login } from '@/api/auth'; // Ajusta la ruta según tu estructura
import LoginForm from '@/components/auth/LoginForm.vue';

const form = ref({
  email: '',
  password: '',
  userType: ''
});

const router = useRouter();

const handleLogin = async () => {
  try {
    const { token } = await login(form.value);
    localStorage.setItem('token', token);
    message.success('Inicio de sesión exitoso');
    router.push('/');
  } catch (error) {
    message.error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
</script>

<style scoped>
@import '@/assets/auth/login.css';
</style>
