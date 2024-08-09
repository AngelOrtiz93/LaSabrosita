<template>
  <a-layout class="user-profile-layout">
    <a-layout-headera>
      <h1>Perfil del Cliente</h1>
    </a-layout-headera>
    <a-layout-content>
      <a-card title="Detalles del Cliente">
        <a-form :model="user" layout="vertical">
          <a-form-item label="Nombre">
            <a-input v-model:value="user.nombre" :disabled="!editing" />
          </a-form-item>
          <a-form-item label="Apellido">
            <a-input v-model:value="user.apellido" :disabled="!editing" />
          </a-form-item>
          <a-form-item label="Correo Electrónico">
            <a-input v-model:value="user.email" :disabled="!editing" />
          </a-form-item>
          <a-form-item label="Teléfono">
            <a-input v-model:value="user.telefono" :disabled="!editing" />
          </a-form-item>
          <a-form-item label="Dirección">
            <a-input v-model:value="user.direccion" :disabled="!editing" />
          </a-form-item>
        </a-form>
        <div class="actions">
          <a-button type="primary" @click="handleEdit">{{ editing ? 'Guardar' : 'Editar' }}</a-button>
          <a-button type="danger" class="delete-button" @click="showDeleteConfirm">Eliminar Cuenta</a-button>
        </div>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Modal, notification } from 'ant-design-vue';

const user = ref({});
const editing = ref(false);
const route = useRoute();
const router = useRouter();
const userId = route.params.id;

const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3001/clientes/${userId}`, {
      headers: {
        Authorization: token,
      }
    });
    user.value = response.data;
  } catch (error) {
    console.error('Error al obtener cliente:', error.response ? error.response.data : error.message);
  }
};

const handleEdit = async () => {
  if (editing.value) {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/clientes/${userId}`, user.value, {
        headers: {
          Authorization: token,
        }
      });
      editing.value = false;
      notification.success({
        message: 'Éxito',
        description: 'El perfil se ha actualizado correctamente.',
        duration: 3, // Tiempo en segundos
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response ? error.response.data : error.message,
        duration: 3, // Tiempo en segundos
      });
    }
  } else {
    editing.value = true;
  }
};

const handleDelete = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3001/clientes/${userId}`, {
      headers: {
        Authorization: token,
      }
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    notification.success({
      message: 'Éxito',
      description: 'La cuenta se ha eliminado correctamente.',
      duration: 3, // Tiempo en segundos
    });
    router.push('/login');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.response ? error.response.data : error.message,
      duration: 3, // Tiempo en segundos
    });
  }
};

const showDeleteConfirm = () => {
  Modal.confirm({
    title: '¿Estás seguro de que deseas eliminar tu cuenta?',
    content: 'Esta acción no se puede deshacer.',
    okText: 'Sí, eliminar',
    okType: 'danger',
    cancelText: 'Cancelar',
    onOk() {
      handleDelete();
    }
  });
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.user-profile-layout {
  min-height: 100vh;
}

a-layout-header {
  background-color: #001529;
  color: #fff;
  padding: 20px;
  text-align: center;
}

a-layout-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

a-card {
  width: 100%;
  max-width: 600px;
}

a-form-item {
  margin-bottom: 16px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.delete-button {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}
</style>
