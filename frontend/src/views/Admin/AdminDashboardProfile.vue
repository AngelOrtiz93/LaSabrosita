<template>
  <a-layout class="user-profile-layout">
    <a-layout-header class="user-profile-header">
      <div class="header-content">
        <h1>Perfil del Usuario</h1>
        <a-button @click="goBack" class="back-button">Volver</a-button>
      </div>
    </a-layout-header>
    <a-layout-content class="user-profile-content">
      <a-card title="Detalles del Usuario" class="user-profile-card">
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

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Button, Layout, Card, Form, Input, Modal, notification } from 'ant-design-vue';

export default {
  components: {
    'a-layout': Layout,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-button': Button,
    'a-card': Card,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-modal': Modal,
  },
  setup() {
    const user = ref({});
    const editing = ref(false);
    const route = useRoute();
    const router = useRouter();
    const userId = route.params.id;

    async function fetchUser() {
      try {
        if (!userId) {
          throw new Error('User ID no disponible');
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/usuarios/${userId}`, {
          headers: {
            Authorization: token,
          }
        });
        user.value = response.data.data;
      } catch (error) {
        notification.error({
          message: 'Error al obtener usuario',
          description: error.response ? error.response.data : error.message,
        });
      }
    }

    const handleEdit = async () => {
      if (editing.value) {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:3001/usuarios/${userId}`, user.value, {
            headers: {
              Authorization: token ,
            }
          });
          editing.value = false;
          notification.success({
            message: 'Éxito',
            description: 'El perfil se ha actualizado correctamente.',
          });
        } catch (error) {
          notification.error({
            message: 'Error al actualizar',
            description: error.response ? error.response.data : error.message,
          });
        }
      } else {
        editing.value = true;
      }
    };

    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/usuarios/${userId}`, {
          headers: {
            Authorization: token ,
          }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        notification.success({
          message: 'Éxito',
          description: 'La cuenta se ha eliminado correctamente.',
        });
        router.push('/login');
      } catch (error) {
        notification.error({
          message: 'Error al eliminar cuenta',
          description: error.response ? error.response.data : error.message,
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

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      fetchUser();
    });

    return {
      user,
      editing,
      goBack,
      handleEdit,
      showDeleteConfirm,
    };
  },
};
</script>

<style scoped>
.user-profile-layout {
  min-height: 100vh;
}

.user-profile-header {
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
}

.back-button {
  margin: 0;
}

.user-profile-content {
  padding: 24px;
}

.user-profile-card {
  max-width: 600px;
  margin: 0 auto;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.delete-button {
  color: #fff;
  background-color: #f5222d;
  border-color: #f5222d;
}
</style>
