<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <a-button type="primary" @click="showCreateModal" style="margin-right: 16px;" v-if="hasPermission('Crear Usuario')">
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
        <template v-slot:actions="{ record }">
          <a-button type="link" @click="showEditModal(record)" v-if="hasPermission('Actualizar Usuario')">
            <EditOutlined />
          </a-button>
          <a-button type="link" @click="viewDetails(record)" v-if="hasPermission('Obtener Usuario por ID')">
            <EyeOutlined />
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)" v-if="hasPermission('Eliminar Usuario')">
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
    });
    const detailsForm = reactive({
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      roles: [],
    });

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      {
        title: 'Apellido',
        dataIndex: 'apellido',
        sorter: (a, b) => a.apellido.localeCompare(b.apellido),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: 'Teléfono',
        dataIndex: 'telefono',
        sorter: (a, b) => a.telefono.localeCompare(b.telefono),
      },
      {
        title: 'Dirección',
        dataIndex: 'direccion',
        sorter: (a, b) => a.direccion.localeCompare(b.direccion),
      },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
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
        notification.error({
          message: 'Error',
          description: 'Error al obtener usuarios.',
        });
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

    const showEditModal = (usuario) => {
      Object.assign(form, usuario);
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createUsuarioHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        await createUsuario(form, token);
        fetchUsuarios();
        resetModal();
        notification.success({
          message: 'Éxito',
          description: 'Usuario creado correctamente.',
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error al crear usuario.',
        });
      }
    };

    const updateUsuarioHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        await updateUsuario(form.id, form, token);
        fetchUsuarios();
        resetModal();
        notification.success({
          message: 'Éxito',
          description: 'Usuario actualizado correctamente.',
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error al actualizar usuario.',
        });
      }
    };

    const viewDetails = async (usuario) => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUsuarioById(usuario.id, token);
        if (response.data) {
          Object.assign(detailsForm, response.data, {
            roles: response.data.Roles || [],
          });
        }
        isDetailsModalVisible.value = true;
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error al obtener detalles del usuario.',
        });
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
        notification.success({
          message: 'Éxito',
          description: 'Usuario eliminado correctamente.',
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error al eliminar usuario.',
        });
      }
    };

    const resetModal = () => {
      isModalVisible.value = false;
      resetForm();
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
      searchIcon: SearchOutlined,
      hasPermission
    };
  },
};
</script>

<style scoped>
.admin-dashboard-layout {
  height: 100vh;
}

.header {
  background: #fff;
  padding: 0 16px;
  line-height: 64px;
  color: #000;
  box-shadow: 0 2px 8px #f0f1f2;
}

.content {
  margin: 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

.ant-table {
  margin-top: 16px;
}

.ant-input {
  width: 100%;
}
</style>
