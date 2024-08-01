<template>
  <div class="container-domiciliarios">
    <header>
      <h2>Nuestros Domiciliarios Valorados</h2>
    </header>
    <a-row :gutter="16">
      <a-col :span="24" sm="12" md="8" lg="6" v-for="domiciliario in domiciliarios" :key="domiciliario.id">
        <a-card class="tarjeta-domiciliario" :title="domiciliario.nombre" extra>
          <div class="contenido-tarjeta">
            <img :src="getAvatarDomiciliario(domiciliario)" alt="Avatar del Domiciliario" class="avatar-domiciliario"/>
            <div class="info-domiciliario">
              <p><strong>Apellido:</strong> {{ domiciliario.apellido }}</p>
              <p><strong>Correo Electrónico:</strong> {{ domiciliario.email }}</p>
              <p><strong>Teléfono:</strong> {{ domiciliario.telefono }}</p>
              <p><strong>Dirección:</strong> {{ domiciliario.direccion }}</p>
              <p><strong>Vehículo:</strong> {{ domiciliario.vehiculo }}</p>
            </div>
          </div>
          <div class="acciones-tarjeta">
            <a-button type="primary" @click="mostrarModalEditar(domiciliario)" class="boton-editar">Editar Datos</a-button>
            <a-button type="danger" @click="mostrarModalEliminar(domiciliario.id)" class="boton-eliminar">Eliminar Cuenta</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Modal para Editar -->
    <a-modal
      v-model:visible="modalEditarVisible"
      title="Editar Domiciliario"
      @ok="manejarActualizarDomiciliario"
      class="modal-editar"
      :width="600"
    >
      <a-form :model="domiciliarioSeleccionado" layout="vertical" size="large">
        <a-form-item label="Nombre">
          <a-input v-model:value="domiciliarioSeleccionado.nombre" placeholder="Ingrese el nombre del domiciliario" />
        </a-form-item>
        <a-form-item label="Apellido">
          <a-input v-model:value="domiciliarioSeleccionado.apellido" placeholder="Ingrese el apellido del domiciliario" />
        </a-form-item>
        <a-form-item label="Correo Electrónico">
          <a-input v-model:value="domiciliarioSeleccionado.email" placeholder="Ingrese el correo electrónico del domiciliario" />
        </a-form-item>
        <a-form-item label="Teléfono">
          <a-input v-model:value="domiciliarioSeleccionado.telefono" placeholder="Ingrese el teléfono del domiciliario" />
        </a-form-item>
        <a-form-item label="Dirección">
          <a-input v-model:value="domiciliarioSeleccionado.direccion" placeholder="Ingrese la dirección del domiciliario" />
        </a-form-item>
        <a-form-item label="Vehículo">
          <a-input v-model:value="domiciliarioSeleccionado.vehiculo" placeholder="Ingrese el vehículo del domiciliario" />
        </a-form-item>
        <a-form-item label="Nueva Contraseña">
          <a-input-password v-model:value="domiciliarioSeleccionado.contraseña" placeholder="Ingrese nueva contraseña" />
        </a-form-item>
        <a-form-item label="Confirmar Contraseña">
          <a-input-password v-model:value="domiciliarioSeleccionado.confirmarContrasena" placeholder="Confirme la nueva contraseña" />
        </a-form-item>
        <a-form-item>
          <a-alert v-if="mensajeError" message="Error" type="error" :description="mensajeError" show-icon />
          <a-alert v-if="mensajeExito" message="Éxito" type="success" :description="mensajeExito" show-icon />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal para Confirmar Eliminación -->
    <a-modal
      v-model:visible="modalEliminarVisible"
      title="Confirmar Eliminación"
      ok-text="Sí"
      cancel-text="No"
      @ok="manejarEliminarDomiciliario"
      class="modal-eliminar"
    >
      <p>¿Está seguro de que desea eliminar a este domiciliario?</p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDomiciliarios, deleteDomiciliario, updateDomiciliario } from '@/api/domiciliario';

const domiciliarios = ref([]);
const modalEditarVisible = ref(false);
const modalEliminarVisible = ref(false);
const domiciliarioSeleccionado = ref({});
const token = localStorage.getItem('token');
const mensajeError = ref('');
const mensajeExito = ref('');

onMounted(async () => {
  try {
    const respuesta = await getDomiciliarios(token);
    domiciliarios.value = respuesta.data;
  } catch (error) {
    console.error('Error al cargar los domiciliarios:', error);
  }
});

const mostrarModalEditar = (domiciliario) => {
  domiciliarioSeleccionado.value = { ...domiciliario, contraseña: '', confirmarContrasena: '' };
  modalEditarVisible.value = true;
};

const manejarActualizarDomiciliario = async () => {
  mensajeError.value = '';
  mensajeExito.value = '';
  
  if (domiciliarioSeleccionado.value.contraseña !== domiciliarioSeleccionado.value.confirmarContrasena) {
    mensajeError.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    await updateDomiciliario(domiciliarioSeleccionado.value.id, domiciliarioSeleccionado.value, token);
    const respuesta = await getDomiciliarios(token);
    domiciliarios.value = respuesta.data;
    modalEditarVisible.value = false;
    mensajeExito.value = 'Domiciliario actualizado con éxito.';
  } catch (error) {
    console.error('Error al actualizar el domiciliario:', error);
    mensajeError.value = 'Error al actualizar el domiciliario.';
  }
};

const mostrarModalEliminar = (id) => {
  domiciliarioSeleccionado.value = { id };
  modalEliminarVisible.value = true;
};

const manejarEliminarDomiciliario = async () => {
  try {
    await deleteDomiciliario(domiciliarioSeleccionado.value.id, token);
    const respuesta = await getDomiciliarios(token);
    domiciliarios.value = respuesta.data;
    modalEliminarVisible.value = false;
  } catch (error) {
    console.error('Error al eliminar el domiciliario:', error);
    mensajeError.value = 'Error al eliminar el domiciliario.';
  }
};

// Función de ejemplo para obtener avatares de domiciliarios
const getAvatarDomiciliario = (domiciliario) => {
  return 'https://via.placeholder.com/80'; // Reemplaza con la URL o ruta del avatar real
};
</script>

<style scoped>
.container-domiciliarios {
  padding: 20px;
  background-color: #f5f5f5; /* Fondo gris claro para mejor contraste */
}

header h2 {
  color: #333; /* Color más oscuro para mejor legibilidad */
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-align: center;
}

.tarjeta-domiciliario {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tarjeta-domiciliario:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.contenido-tarjeta {
  display: flex;
  align-items: center;
  padding: 16px;
}

.avatar-domiciliario {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
  border: 2px solid #3498db; /* Borde azul para el avatar */
}

.info-domiciliario {
  font-size: 14px;
  color: #666; /* Color más claro para el texto */
}

.acciones-tarjeta {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.boton-editar, .boton-eliminar {
  border-radius: 6px;
}

.boton-editar {
  margin-right: 8px;
  background-color: #3498db; /* Color azul para el botón de editar */
  color: #fff;
}

.boton-eliminar {
  background-color: #e74c3c; /* Color rojo para el botón de eliminar */
  color: #fff;
}

.modal-editar .ant-modal-body {
  padding: 24px;
  background-color: #fff; /* Fondo blanco para el modal */
}

.modal-editar .ant-modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-eliminar .ant-modal-body {
  padding: 24px;
  background-color: #fff;
}
</style>
