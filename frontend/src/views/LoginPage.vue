<template>
  <a-layout class="layout">
    <a-layout-content class="content">
      <a-card title="Iniciar sesión" class="card">
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
import LoginForm from '@/components/auth/LoginFormComponent.vue';

const form = ref({
  email: '',
  password: ''
});

const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login(form.value);
    const { token } = response;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const { roleNames = [], roleIds = [], permissions = [], id } = decodedToken;

    localStorage.setItem('roleNames', JSON.stringify(roleNames));
    localStorage.setItem('roleIds', JSON.stringify(roleIds));
    localStorage.setItem('permissions', JSON.stringify(permissions));
    localStorage.setItem('userId', id);

    if (roleNames.includes('Cliente')) {
      router.push('/cliente-dashboard');
    } else {
      router.push('/administrador-dashboard');
    }
  } catch (error) {
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
@import '@/assets/auth/common.css'; /* Importa el archivo de estilos global */
</style>
