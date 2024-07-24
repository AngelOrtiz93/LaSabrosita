<template>
  <a-form
    :form="form"
    @submit.prevent="handleSubmit"
    layout="vertical"
    class="reset-password-form"
  >

    <a-form-item name="newPassword" label="Nueva Contraseña">
      <a-input-password v-model:value="form.newPassword" placeholder="Nueva Contraseña" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Restablecer Contraseña</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
const props = defineProps({
  form: Object
});

const emit = defineEmits(['submit']);

const handleSubmit = () => {
  emit('submit', props.form);
};
</script>
