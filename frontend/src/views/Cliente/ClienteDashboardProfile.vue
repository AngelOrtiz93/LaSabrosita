<template>
  <a-layout class="user-profile-layout">
    <a-layout-content class="user-profile-content">
      <div class="profile-container">
        <!-- Información de la imagen -->
        <div class="profile-image-section">
          <div class="image-container" @click="expandImage">
            <img
              v-if="userDetails.imagenUrl"
              :src="getImageUrl(userDetails.imagenUrl)"
              alt="Imagen de perfil"
              class="profile-image"
            />
          </div>
        </div>

        <!-- Información del usuario -->
        <div class="profile-info-section">
          <h2 class="profile-title">Información del Usuario</h2>
          <div class="info-item">
            <strong>Nombre:</strong>
            <p>{{ userDetails.nombre }}</p>
          </div>
          <div class="info-item">
            <strong>Apellido:</strong>
            <p>{{ userDetails.apellido }}</p>
          </div>
          <div class="info-item">
            <strong>Email:</strong>
            <p>{{ userDetails.email }}</p>
          </div>
          <div class="info-item">
            <strong>Teléfono:</strong>
            <p>{{ userDetails.telefono }}</p>
          </div>
          <div class="info-item">
            <strong>Dirección:</strong>
            <p>{{ userDetails.direccion }}</p>
          </div>

          <!-- Botones de acción -->
          <div class="action-buttons">
            <a-button type="primary" @click="showEditModal">Editar Perfil</a-button>
            <a-button type="danger" @click="showDeleteConfirm">Eliminar Cuenta</a-button>
          </div>
        </div>
      </div>

      <!-- Modal para mostrar la imagen expandida -->
      <a-modal v-model:visible="isImageModalVisible" footer={null} @cancel="closeImageModal">
        <img :src="getImageUrl(userDetails.imagenUrl)" alt="Imagen ampliada" class="expanded-profile-image" />
      </a-modal>

      <UserFormModal
        v-model:visible="isModalVisible"
        :isEditing="true"
        :form="form"
        @update="updateProfileHandler"
        @close="resetModal"
      />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { notification, Modal } from 'ant-design-vue';
import { getUsuarioById, updateUsuario, deleteUsuario } from '@/api/usuario'; 
import UserFormModal from '@/components/user/UserFormModal.vue';

export default {
  components: {
    UserFormModal
  },
  setup() {
    const userDetails = ref({});
    const isModalVisible = ref(false);
    const isImageModalVisible = ref(false);
    const form = reactive({
      id: null,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      imagen: null
    });

    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const response = await getUsuarioById(userId, token);
        userDetails.value = response.data;
        Object.assign(form, response.data); 
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al obtener detalles del usuario.' });
      }
    };

    const getImageUrl = (imagenUrl) => `http://localhost:3001${imagenUrl}`;

    const showEditModal = () => {
      isModalVisible.value = true;
    };

    const showDeleteConfirm = () => {
      Modal.confirm({
        title: '¿Estás seguro de que deseas eliminar tu cuenta?',
        content: 'Esta acción es irreversible y perderás todos tus datos.',
        onOk() {
          deleteAccount(); 
        },
        onCancel() {
          console.log('Cancelado');
        }
      });
    };

    const deleteAccount = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        await deleteUsuario(userId, token); 
        notification.success({ message: 'Éxito', description: 'Cuenta eliminada correctamente.' });
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al eliminar cuenta.' });
      }
    };

    const updateProfileHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        Object.keys(form).forEach(key => {
          if (key === 'imagen' && form[key]) {
            formData.append(key, form[key]);
          } else {
            formData.append(key, form[key] || '');
          }
        });
        await updateUsuario(form.id, formData, token);
        fetchUserDetails(); 
        resetModal();
        notification.success({ message: 'Éxito', description: 'Perfil actualizado correctamente.' });
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al actualizar perfil.' });
      }
    };

    const resetModal = () => {
      isModalVisible.value = false;
    };

    const expandImage = () => {
      isImageModalVisible.value = true;
    };

    const closeImageModal = () => {
      isImageModalVisible.value = false;
    };

    onMounted(fetchUserDetails);

    return {
      userDetails,
      isModalVisible,
      isImageModalVisible,
      form,
      showEditModal,
      showDeleteConfirm,
      updateProfileHandler,
      resetModal,
      getImageUrl,
      expandImage,
      closeImageModal
    };
  }
};
</script>

<style scoped>
/* Centrar el contenido */
.user-profile-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.user-profile-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.profile-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 450px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.profile-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.profile-image-section {
  margin-bottom: 20px;
}

.profile-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1890ff; /* Borde azul */
  cursor: pointer;
  transition: transform 0.2s; /* Efecto de hover */
}

.profile-image:hover {
  transform: scale(1.05); /* Aumenta la imagen al pasar el ratón */
}

.profile-info-section {
  text-align: left;
}

.info-item {
  margin-bottom: 12px;
}

.info-item strong {
  color: #1890ff; /* Color azul para etiquetas */
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* Estilo para el modal */
.expanded-profile-image {
  width: 100%;
  height: auto;
}
</style>
