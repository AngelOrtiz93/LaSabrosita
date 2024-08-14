<template>
  <a-modal
    :visible="modelValue"
    title="Confirmar Eliminación"
    @ok="deleteUsuarioHandler"
    @cancel="resetDeleteModal"
  >
    <p>¿Estás seguro de que deseas eliminar este usuario?</p>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const deleteUsuarioHandler = () => {
      emit('confirm');
      emit('update:modelValue', false); 
    };

    const resetDeleteModal = () => {
      emit('cancel');
      emit('update:modelValue', false); 
    };

    return {
      deleteUsuarioHandler,
      resetDeleteModal,
    };
  },
});
</script>
