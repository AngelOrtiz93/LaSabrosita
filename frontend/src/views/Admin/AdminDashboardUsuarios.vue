<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <a-button
        type="primary"
        @click="showCreateModal"
        style="margin-right: 16px;"
        v-if="hasPermission('Crear Usuario')"
      >
        <PlusOutlined /> Crear Usuario
      </a-button>
      <a-input
        placeholder="Buscar por Nombre, Apellido, Email o Teléfono"
        style="width: 400px; margin: 0;"
        @input="handleSearch"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
    </a-layout-header>

    <a-layout-content class="content">
      <a-table :columns="columns" :data-source="filteredUsuarios" rowKey="id">
        <template #image="{ record }">
          <img 
            :src="getImageUrl(record.imagenUrl)" 
            alt="Imagen del Usuario" 
            style="width: 50px; height: 50px; object-fit: cover;" 
          />
        </template>
        <template #actions="{ record }">
          <a-button
            type="link"
            @click="showEditModal(record)"
            v-if="hasPermission('Actualizar Usuario')"
          >
            <EditOutlined />
          </a-button>
          <a-button
            type="link"
            @click="viewDetails(record)"
            v-if="hasPermission('Obtener Usuario por ID')"
          >
            <EyeOutlined />
          </a-button>
          <a-button
            type="link"
            danger
            @click="confirmDelete(record.id)"
            v-if="hasPermission('Eliminar Usuario')"
          >
            <DeleteOutlined />
          </a-button>
        </template>
      </a-table>
    </a-layout-content>

    <UserFormModal
      v-model:visible="isModalVisible"
      :isEditing="isEditing"
      :form="form"
      @create="createUsuarioHandler"
      @update="updateUsuarioHandler"
      @close="resetModal"
    />

    <UserDetailsModal
      v-model:visible="isDetailsModalVisible"
      :detailsForm="detailsForm"
      @close="resetDetailsModal"
    />

    <ConfirmDeleteModal
      v-model:visible="isDeleteModalVisible"
      @confirm="deleteUsuarioHandler"
      @cancel="resetDeleteModal"
    />
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { notification, Input } from 'ant-design-vue';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario, getUsuarioById } from '@/api/usuario';
import UserFormModal from '@/components/user/UserFormModal.vue';
import UserDetailsModal from '@/components/user/UserDetailsModal.vue';
import ConfirmDeleteModal from '@/components/user/ConfirmDeleteModal.vue';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
    UserFormModal,
    UserDetailsModal,
    ConfirmDeleteModal,
    Input
  },
  setup() {
    const usuarios = ref([]);
    const searchText = ref('');
    const isModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      contraseña: '',
      imagen: null
    });
    const detailsForm = reactive({
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      roles: [],
      imagenUrl: ''
    });

    const getImageUrl = (imagenUrl) => {
    return imagenUrl ? `http://localhost:3001${imagenUrl}` : ''; // Asegúrate de que la URL sea correcta
  };

    const columns = [
      { title: 'Nombre', dataIndex: 'nombre', sorter: (a, b) => a.nombre.localeCompare(b.nombre) },
      { title: 'Apellido', dataIndex: 'apellido', sorter: (a, b) => a.apellido.localeCompare(b.apellido) },
      { title: 'Email', dataIndex: 'email', sorter: (a, b) => a.email.localeCompare(b.email) },
      { title: 'Teléfono', dataIndex: 'telefono', sorter: (a, b) => a.telefono.localeCompare(b.telefono) },
      { title: 'Dirección', dataIndex: 'direccion', sorter: (a, b) => a.direccion.localeCompare(b.direccion) },
      { 
        title: 'Imagen', 
        dataIndex: 'imagenUrl', 
        slots: { customRender: 'image' }  // Asegúrate de que esto sea correcto
      },
      { title: 'Acciones', key: 'actions', slots: { customRender: 'actions' } }
    ];

    
    const filteredUsuarios = computed(() => {
      return usuarios.value.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchText.value.toLowerCase()) || 
        usuario.telefono.toLowerCase().includes(searchText.value.toLowerCase()) || 
        usuario.apellido.toLowerCase().includes(searchText.value.toLowerCase()) || 
        usuario.email.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getUsuarios(token);
        usuarios.value = data.data;
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al obtener usuarios.' });
      }
    };

    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    const showCreateModal = () => {
      resetForm();
      isEditing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = async (usuario) => {
  try {
    const token = localStorage.getItem('token');
    const response = await getUsuarioById(usuario.id, token);
    if (response.data) {
      Object.assign(form, response.data);
      isEditing.value = true;
      isModalVisible.value = true;
    } else {
      notification.error({ message: 'Error', description: 'Usuario no encontrado.' });
    }
  } catch (error) {
    notification.error({ message: 'Error', description: 'Error al obtener detalles del usuario.' });
  }
};


    const createUsuarioHandler = async () => {
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
        await createUsuario(formData, token);
        fetchUsuarios();
        resetModal();
        notification.success({ message: 'Éxito', description: 'Usuario creado correctamente.' });
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al crear usuario.' });
      }
    };

    const updateUsuarioHandler = async () => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    // Solo agregar contraseña si se ha proporcionado
    Object.keys(form).forEach(key => {
      if (key === 'imagen' && form[key]) {
        formData.append(key, form[key]);
      } else if (key !== 'contraseña' || form[key]) { // No agregar contraseña si es una edición y no hay nuevo valor
        formData.append(key, form[key] || '');
      }
    });

    if (form.id) {
      await updateUsuario(form.id, formData, token);
      fetchUsuarios();
      resetModal();
      notification.success({ message: 'Éxito', description: 'Usuario actualizado correctamente.' });
    } else {
      notification.error({ message: 'Error', description: 'ID de usuario no especificado.' });
    }
  } catch (error) {
    notification.error({ message: 'Error', description: 'Error al actualizar usuario.' });
  }
};



    const viewDetails = async (usuario) => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUsuarioById(usuario.id, token);
        if (response.data) {
          Object.assign(detailsForm, response.data, {
            roles: response.data.Roles || [],
            imagenUrl: response.data.imagenUrl || ''
          });
        }
        isDetailsModalVisible.value = true;
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al obtener detalles del usuario.' });
      }
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deleteUsuarioHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        await deleteUsuario(form.id, token);
        fetchUsuarios();
        resetDeleteModal();
        notification.success({ message: 'Éxito', description: 'Usuario eliminado correctamente.' });
      } catch (error) {
        notification.error({ message: 'Error', description: 'Error al eliminar usuario.' });
      }
    };

    const resetModal = () => {
      isModalVisible.value = false;
      resetForm();
      isEditing.value = false;
    };

    const resetForm = () => {
      Object.assign(form, {
        id: null,
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        contraseña: '',
        imagen: null
      });
    };

    const resetDetailsModal = () => {
      isDetailsModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      isDeleteModalVisible.value = false;
    };

    const hasPermission = (requiredPermission) => {
      const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
      return userPermissions.includes(requiredPermission);
    };

    onMounted(fetchUsuarios);

    return {
      usuarios,
      columns,
      isModalVisible,
      isEditing,
      form,
      isDetailsModalVisible,
      detailsForm,
      isDeleteModalVisible,
      showCreateModal,
      showEditModal,
      createUsuarioHandler,
      updateUsuarioHandler,
      viewDetails,
      confirmDelete,
      deleteUsuarioHandler,
      resetModal,
      resetDetailsModal,
      resetDeleteModal,
      handleSearch,
      filteredUsuarios,
      hasPermission,
      getImageUrl
    };
  }
};
</script>

<style scoped>
.admin-dashboard-layout {
  min-height: 100vh;
}

.header {
  padding: 0 16px;
  background: #fff;
}

.content {
  padding: 16px;
}
</style>
