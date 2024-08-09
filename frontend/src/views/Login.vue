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
    const response = await login(form.value);
    const { token, userId, roleIds, roleNames } = response;

    localStorage.setItem('Role', roleNames);  // Cambia aquí
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    if (roleNames.includes('Cliente')) {
      router.push('/cliente-dashboard');
    } else {
      router.push('/administrador-dashboard');
    }
  } catch (error) {
    message.error(error.message);
  }
};

</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
