<template>
  <a-layout class="layout login-layout">
    <a-layout-content class="content login-content">
      <a-card title="Iniciar sesión" class="card login-card">
        <LoginForm :form="form" @submit="handleLogin" />
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { login } from '@/api/auth';
import LoginForm from '@/components/auth/LoginForm.vue';

const form = ref({
  email: '',
  password: ''
});

const router = useRouter();

const handleLogin = async () => {
  try {
    const { token, userType } = await login(form.value);
    localStorage.setItem('token', token);
    message.success('Inicio de sesión exitoso');
    if (userType === 'cliente') {
      router.push('/cliente-dashboard');
    } else if (userType === 'empleado') {
      router.push('/empleado-dashboard');
    } else if (userType === 'domiciliario') {
      router.push('/domiciliario-dashboard');
    }
  } catch (error) {
    message.error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
