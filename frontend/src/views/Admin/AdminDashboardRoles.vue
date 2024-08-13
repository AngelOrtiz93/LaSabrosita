<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-headera>
      <a-button type="primary" @click="showCreateModal">
        <PlusOutlined /> Crear Rol
      </a-button>
    </a-layout-headera>
    <a-layout-content>
      <a-table :columns="columns" :data-source="roles" rowKey="id">
        <template v-slot:actions="{ record }">
          <a-button type="link" @click="showEditModal(record)">
            <EditOutlined />
          </a-button>
          <a-button type="link" @click="viewDetails(record)">
            <EyeOutlined />
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)">
            <DeleteOutlined />
          </a-button>
        </template>
      </a-table>
    </a-layout-content>

    <!-- Modal para crear/editar rol -->
    <a-modal
      v-model:open="isModalVisible"
      :title="isEditing ? 'Editar Rol' : 'Crear Rol'"
      :width="'35%'"
      @ok="isEditing ? updateRole() : createRole()"
      @cancel="resetModal"
    >
      <a-form :model="form">
        <a-form-item label="Nombre">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="Descripción">
          <a-input v-model:value="form.description" />
        </a-form-item>
        <a-form-item label="Permisos">
          <a-checkbox-group v-model:value="form.permisos">
            <a-checkbox
              v-for="permission in availablePermissions"
              :key="permission.id"
              :value="permission.id"
            >
              {{ permission.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal para ver detalles del rol -->
    <a-modal
      v-model:open="isDetailsModalVisible"
      title="Detalles del Rol"
      :width="'60%'"
      @cancel="resetDetailsModal"
      :footer="null"
    >
      <div>
        <h3>Nombre: {{ selectedRole.name }}</h3>
        <p>Descripción: {{ selectedRole.description }}</p>
        <a-table :columns="permissionsColumns" :data-source="selectedRole.Permissions" rowKey="id" />
      </div>
    </a-modal>

    <!-- Modal para confirmar eliminación -->
    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deleteRole"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este rol?</p>
    </a-modal>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
  },
  setup() {
    const roles = ref([]);
    const availablePermissions = ref([]);
    const isModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      name: '',
      description: '',
      permisos: [],
    });
    const selectedRole = ref({
      id: '',
      name: '',
      description: '',
      permisos: [],
    });

    const columns = [
      { title: 'Nombre', dataIndex: 'name' },
      { title: 'Descripción', dataIndex: 'description' },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const permissionsColumns = [
      { title: 'Permiso', dataIndex: 'name' },
      { title: 'Descripción', dataIndex: 'description' },
    ];

    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/roles', {
          headers: { Authorization: token },
        });
        roles.value = response.data;
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/permissions', {
          headers: { Authorization: token },
        });
        availablePermissions.value = response.data;
      } catch (error) {
        console.error('Error al obtener permisos:', error);
      }
    };

    const showCreateModal = () => {
      resetForm();
      isEditing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = (role) => {
      Object.assign(form, role);
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/roles', {
          nombre: form.name,
          descripcion: form.description,
          permisos: form.permisos,
        }, {
          headers: { Authorization: token },
        });
        fetchRoles();
        resetModal();
      } catch (error) {
        console.error('Error al crear rol:', error);
      }
    };

    const updateRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/roles/${form.id}`, {
          nombre: form.name,
          descripcion: form.description,
          permisos: form.permisos,
        }, {
          headers: { Authorization: token },
        });
        fetchRoles();
        resetModal();
      } catch (error) {
        console.error('Error al actualizar rol:', error);
      }
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deleteRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/roles/${form.id}`, {
          headers: { Authorization: token },
        });
        fetchRoles();
        resetDeleteModal();
      } catch (error) {
        console.error('Error al eliminar rol:', error);
      }
    };

    const viewDetails = async (role) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/roles/${role.id}`, {
          headers: { Authorization: token },
        });
        selectedRole.value = response.data;
        isDetailsModalVisible.value = true;
      } catch (error) {
        console.error('Error al obtener detalles del rol:', error);
      }
    };

    const resetForm = () => {
      Object.assign(form, {
        id: null,
        nombre: '',
        descripcion: '',
        permisos: [],
      });
    };

    const resetModal = () => {
      resetForm();
      isModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      selectedRole.value = {
        id: '',
        nombre: '',
        descripcion: '',
        permisos: [],
      };
      isDetailsModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    onMounted(() => {
      fetchRoles();
      fetchPermissions();
    });

    return {
      roles,
      availablePermissions,
      isModalVisible,
      isDetailsModalVisible,
      isDeleteModalVisible,
      isEditing,
      form,
      selectedRole,
      columns,
      permissionsColumns,
      showCreateModal,
      showEditModal,
      createRole,
      updateRole,
      confirmDelete,
      deleteRole,
      viewDetails,
      resetModal,
      resetDetailsModal,
      resetDeleteModal,
    };
  },
};
</script>

<style scoped>
.admin-dashboard-layout {
  height: 100vh;
}

a-layout-header {
  background: #fff;
  padding: 0 16px;
}

a-layout-content {
  padding: 16px;
  background: #fff;
}
</style>
