<template>
  <div class="container-empleados">
    <header>
      <h2>Nuestros Empleados Valorados</h2>
    </header>
    <a-row :gutter="16">
      <a-col :span="24" sm="12" md="8" lg="6" v-for="empleado in empleados" :key="empleado.id">
        <a-card class="tarjeta-empleado" :title="empleado.nombre" extra>
          <div class="contenido-tarjeta">
            <img :src="getAvatarEmpleado(empleado)" alt="Avatar del Empleado" class="avatar-empleado"/>
            <div class="info-empleado">
              <p><strong>Apellido:</strong> {{ empleado.apellido }}</p>
              <p><strong>Correo Electrónico:</strong> {{ empleado.email }}</p>
              <p><strong>Teléfono:</strong> {{ empleado.telefono }}</p>
              <p><strong>Dirección:</strong> {{ empleado.direccion }}</p>
            </div>
          </div>
          <div class="acciones-tarjeta">
            <a-button type="primary" @click="mostrarModalEditar(empleado)" class="boton-editar">Editar Datos</a-button>
            <a-button type="danger" @click="mostrarModalEliminar(empleado.id)" class="boton-eliminar">Eliminar Cuenta</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Modal para Editar -->
    <a-modal
      v-model:visible="modalEditarVisible"
      title="Editar Empleado"
      @ok="manejarActualizarEmpleado"
      class="modal-editar"
      :width="600"
    >
      <a-form :model="empleadoSeleccionado" layout="vertical" size="large">
        <a-form-item label="Nombre">
          <a-input v-model:value="empleadoSeleccionado.nombre" placeholder="Ingrese el nombre del empleado" />
        </a-form-item>
        <a-form-item label="Apellido">
          <a-input v-model:value="empleadoSeleccionado.apellido" placeholder="Ingrese el apellido del empleado" />
        </a-form-item>
        <a-form-item label="Correo Electrónico">
          <a-input v-model:value="empleadoSeleccionado.email" placeholder="Ingrese el correo electrónico del empleado" />
        </a-form-item>
        <a-form-item label="Teléfono">
          <a-input v-model:value="empleadoSeleccionado.telefono" placeholder="Ingrese el teléfono del empleado" />
        </a-form-item>
        <a-form-item label="Dirección">
          <a-input v-model:value="empleadoSeleccionado.direccion" placeholder="Ingrese la dirección del empleado" />
        </a-form-item>
        <a-form-item label="Nueva Contraseña">
          <a-input-password v-model:value="empleadoSeleccionado.contraseña" placeholder="Ingrese nueva contraseña" />
        </a-form-item>
        <a-form-item label="Confirmar Contraseña">
          <a-input-password v-model:value="empleadoSeleccionado.confirmarContrasena" placeholder="Confirme la nueva contraseña" />
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
      @ok="manejarEliminarEmpleado"
      class="modal-eliminar"
    >
      <p>¿Está seguro de que desea eliminar a este empleado?</p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEmpleados, deleteEmpleado, updateEmpleado } from '@/api/empleado';

const empleados = ref([]);
const modalEditarVisible = ref(false);
const modalEliminarVisible = ref(false);
const empleadoSeleccionado = ref({});
const token = localStorage.getItem('token');
const mensajeError = ref('');
const mensajeExito = ref('');

onMounted(async () => {
  try {
    const respuesta = await getEmpleados(token);
    empleados.value = respuesta.data;
  } catch (error) {
    console.error('Error al cargar los empleados:', error);
  }
});

const mostrarModalEditar = (empleado) => {
  empleadoSeleccionado.value = { ...empleado, contraseña: '', confirmarContrasena: '' };
  modalEditarVisible.value = true;
};

const manejarActualizarEmpleado = async () => {
  mensajeError.value = '';
  mensajeExito.value = '';
  
  if (empleadoSeleccionado.value.contraseña !== empleadoSeleccionado.value.confirmarContrasena) {
    mensajeError.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    await updateEmpleado(empleadoSeleccionado.value.id, empleadoSeleccionado.value, token);
    const respuesta = await getEmpleados(token);
    empleados.value = respuesta.data;
    modalEditarVisible.value = false;
    mensajeExito.value = 'Empleado actualizado con éxito.';
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    mensajeError.value = 'Error al actualizar el empleado.';
  }
};

const mostrarModalEliminar = (id) => {
  empleadoSeleccionado.value = { id };
  modalEliminarVisible.value = true;
};

const manejarEliminarEmpleado = async () => {
  try {
    await deleteEmpleado(empleadoSeleccionado.value.id, token);
    const respuesta = await getEmpleados(token);
    empleados.value = respuesta.data;
    modalEliminarVisible.value = false;
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    mensajeError.value = 'Error al eliminar el empleado.';
  }
};

// Función de ejemplo para obtener avatares de empleados
const getAvatarEmpleado = (empleado) => {
  return 'https://via.placeholder.com/80'; // Reemplaza con la URL o ruta del avatar real
};
</script>

<style scoped>
/* Tu estilo aquí */
</style>

<style scoped>
.container-empleados {
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

.tarjeta-empleado {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tarjeta-empleado:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.contenido-tarjeta {
  display: flex;
  align-items: center;
  padding: 16px;
}

.avatar-empleado {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
  border: 2px solid #3498db; /* Borde azul para el avatar */
}

.info-empleado {
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
  background-color: #fff; /* Fondo blanco para el modal */
}

a-form-item {
  margin-bottom: 16px;
}

a-input {
  border-radius: 4px;
  border: 1px solid #dcdcdc; /* Borde gris claro para los inputs */
}

a-input:focus {
  border-color: #3498db; /* Borde azul al enfocar */
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2); /* Sombra azul clara al enfocar */
}
</style>
