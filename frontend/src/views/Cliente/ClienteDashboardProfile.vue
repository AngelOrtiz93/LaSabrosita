<template>
  <div class="container-clientes">
    <header>
      <h2>Nuestros Clientes Valorados</h2>
    </header>
    <a-row :gutter="16">
      <a-col :span="24" sm="12" md="8" lg="6" v-for="cliente in clientes" :key="cliente.id">
        <a-card class="tarjeta-cliente" :title="cliente.nombre" extra>
          <div class="contenido-tarjeta">
            <img :src="getAvatarCliente(cliente)" alt="Avatar del Cliente" class="avatar-cliente"/>
            <div class="info-cliente">
              <p><strong>Apellido:</strong> {{ cliente.apellido }}</p>
              <p><strong>Correo Electrónico:</strong> {{ cliente.email }}</p>
              <p><strong>Teléfono:</strong> {{ cliente.telefono }}</p>
              <p><strong>Dirección:</strong> {{ cliente.direccion }}</p>
            </div>
          </div>
          <div class="acciones-tarjeta">
            <a-button type="primary" @click="mostrarModalEditar(cliente)" class="boton-editar">Editar Datos</a-button>
            <a-button type="danger" @click="mostrarModalEliminar(cliente.id)" class="boton-eliminar">Eliminar Cuenta</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Modal para Editar -->
    <a-modal
      v-model:visible="modalEditarVisible"
      title="Editar Cliente"
      @ok="manejarActualizarCliente"
      class="modal-editar"
      :width="600"
    >
      <a-form :model="clienteSeleccionado" layout="vertical" size="large">
        <a-form-item label="Nombre">
          <a-input v-model:value="clienteSeleccionado.nombre" placeholder="Ingrese el nombre del cliente" />
        </a-form-item>
        <a-form-item label="Apellido">
          <a-input v-model:value="clienteSeleccionado.apellido" placeholder="Ingrese el apellido del cliente" />
        </a-form-item>
        <a-form-item label="Correo Electrónico">
          <a-input v-model:value="clienteSeleccionado.email" placeholder="Ingrese el correo electrónico del cliente" />
        </a-form-item>
        <a-form-item label="Teléfono">
          <a-input v-model:value="clienteSeleccionado.telefono" placeholder="Ingrese el teléfono del cliente" />
        </a-form-item>
        <a-form-item label="Dirección">
          <a-input v-model:value="clienteSeleccionado.direccion" placeholder="Ingrese la dirección del cliente" />
        </a-form-item>
        <a-form-item label="Nueva Contraseña">
          <a-input-password v-model:value="clienteSeleccionado.contraseña" placeholder="Ingrese nueva contraseña" />
        </a-form-item>
        <a-form-item label="Confirmar Contraseña">
          <a-input-password v-model:value="clienteSeleccionado.confirmarContrasena" placeholder="Confirme la nueva contraseña" />
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
      @ok="manejarEliminarCliente"
      class="modal-eliminar"
    >
      <p>¿Está seguro de que desea eliminar a este cliente?</p>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getClientes, deleteCliente, updateCliente } from '@/api/cliente';

const clientes = ref([]);
const modalEditarVisible = ref(false);
const modalEliminarVisible = ref(false);
const clienteSeleccionado = ref({});
const token = localStorage.getItem('token');
const mensajeError = ref('');
const mensajeExito = ref('');

onMounted(async () => {
  try {
    const respuesta = await getClientes(token);
    clientes.value = respuesta.data;
  } catch (error) {
    console.error('Error al cargar los clientes:', error);
  }
});

const mostrarModalEditar = (cliente) => {
  clienteSeleccionado.value = { ...cliente, contraseña: '', confirmarContrasena: '' };
  modalEditarVisible.value = true;
};

const manejarActualizarCliente = async () => {
  mensajeError.value = '';
  mensajeExito.value = '';
  
  if (clienteSeleccionado.value.contraseña !== clienteSeleccionado.value.confirmarContrasena) {
    mensajeError.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    await updateCliente(clienteSeleccionado.value.id, clienteSeleccionado.value, token);
    const respuesta = await getClientes(token);
    clientes.value = respuesta.data;
    modalEditarVisible.value = false;
    mensajeExito.value = 'Cliente actualizado con éxito.';
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    mensajeError.value = 'Error al actualizar el cliente.';
  }
};

const mostrarModalEliminar = (id) => {
  clienteSeleccionado.value = { id };
  modalEliminarVisible.value = true;
};

const manejarEliminarCliente = async () => {
  try {
    await deleteCliente(clienteSeleccionado.value.id, token);
    const respuesta = await getClientes(token);
    clientes.value = respuesta.data;
    modalEliminarVisible.value = false;
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    mensajeError.value = 'Error al eliminar el cliente.';
  }
};

// Función de ejemplo para obtener avatares de clientes
const getAvatarCliente = (cliente) => {
  return 'https://via.placeholder.com/80'; // Reemplaza con la URL o ruta del avatar real
};
</script>

<style scoped>
/* Tu estilo aquí */
</style>




  <style scoped>
  .container-clientes {
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

  .tarjeta-cliente {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .tarjeta-cliente:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .contenido-tarjeta {
    display: flex;
    align-items: center;
    padding: 16px;
  }

  .avatar-cliente {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 16px;
    object-fit: cover;
    border: 2px solid #3498db; /* Borde azul para el avatar */
  }

  .info-cliente {
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
