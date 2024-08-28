<template>
  <a-form
    :form="form"
    @submit.prevent="handleSubmit"
    layout="vertical"
    class="login-form"
  >
    <a-form-item name="email" label="Correo electrónico">
      <a-input v-model:value="form.email" placeholder="Correo electrónico" />
    </a-form-item>

    <a-form-item name="password" label="Contraseña">
      <a-input-password v-model:value="form.password" placeholder="Contraseña" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Iniciar sesión</a-button>
    </a-form-item>

    <a-form-item>
      <a-space>
        <router-link to="/register">Registrarse</router-link> |
        <router-link to="/forgot-password">Olvidó contraseña</router-link>
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
  emit('submit');
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
