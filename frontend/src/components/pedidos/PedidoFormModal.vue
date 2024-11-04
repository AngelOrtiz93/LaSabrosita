<template>
  <a-modal
    :open="visible"
    title="Editar Pedido"
    @ok="updatePedido"
    @cancel="resetModal"
  >
    <a-form :form="form">
      <a-form-item label="Estado">
        <a-select v-model="form.estado">
          <a-select-option value="Pendiente">Pendiente</a-select-option>
          <a-select-option value="En Proceso">En Proceso</a-select-option>
          <a-select-option value="Enviado">Enviado</a-select-option>
          <a-select-option value="Entregado">Entregado</a-select-option>
          <a-select-option value="Cancelado">Cancelado</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    // Emitir la actualización del modal cuando cambia la propiedad `visible`
    watch(() => props.visible, (newVal) => {
      if (!newVal) resetForm();
    });

    const resetForm = () => {
      // Reiniciar el formulario aquí si es necesario
      props.form.estado = '';
    };

    const updatePedido = () => {
      emit('update:open', false); // Cerrar el modal
    };

    return {
      resetForm,
      updatePedido,
    };
  },
};
</script>
