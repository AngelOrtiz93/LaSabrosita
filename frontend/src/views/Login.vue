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
    const { token, roleNames } = await login(form.value);
    localStorage.setItem('token', token);

    message.success('Inicio de sesión exitoso');

    // Prioriza los roles y redirige según el rol más alto
    if (roleNames.includes('Administrador')) {
      router.push('/administrador-dashboard');
    } else if (roleNames.includes('Empleado')) {
      router.push('/empleado-dashboard');
    } else if (roleNames.includes('Domiciliario')) {
      router.push('/domiciliario-dashboard');
    } else if (roleNames.includes('Cliente')) {
      router.push('/cliente-dashboard');
    } else {
      router.push('/default-dashboard'); // Página por defecto si no hay roles conocidos
    }
  } catch (error) {
    message.error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
