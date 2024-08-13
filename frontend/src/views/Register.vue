<template>
  <a-layout class="layout register-layout">
    <a-layout-content class="content register-content">
      <a-card title="Registrarse" class="card register-card">
        <RegisterForm :form="form" @submit="handleRegister" />
      </a-card>
    </a-layout-content>
    <a-layout-footer class="footer">Restaurante La Sabrosita ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { register } from '@/api/auth';
import RegisterForm from '@/components/auth/RegisterForm.vue'; // Asegúrate de que la ruta sea correcta

const form = ref({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  contraseña: ''
});

const router = useRouter();

const handleRegister = async () => {
  try {
    console.log('Datos a enviar:', form.value); 
    await register(form.value);
    message.success('Registro exitoso');
    router.push('/login');
  } catch (error) {
    console.error('Error al registrar:', error); 
    message.error(error.response?.data?.message || 'Error al registrarse');
  }
};

</script>

<style scoped>
@import '@/assets/auth/common.css';
</style>
