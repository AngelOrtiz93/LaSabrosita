<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <a-button type="primary" @click="showCreateModal" style="margin-right: 16px;" v-if="hasPermission('Crear Rol')">
        <PlusOutlined /> Crear Rol
      </a-button>
      <a-input
        placeholder="Buscar por Nombre o Descripción"
        style="width: 400px; margin: 0;"
        @input="handleSearch"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
    </a-layout-header>

    <a-layout-content class="content">
      <a-table :columns="columns" :data-source="filteredRoles" rowKey="id">
        <template v-slot:actions="{ record }">
          <a-button type="link" @click="showEditModal(record)" v-if="hasPermission('Actualizar Rol')">
            <EditOutlined />
          </a-button>
          <a-button type="link" @click="viewDetails(record)" v-if="hasPermission('Obtener Rol por ID')">
            <EyeOutlined />
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)" v-if="hasPermission('Eliminar Rol')">
            <DeleteOutlined />
          </a-button>
        </template>
      </a-table>
    </a-layout-content>

    <a-modal
    v-model:open="isModalVisible"
    :title="isEditing ? 'Editar Rol' : 'Crear Rol'"
    :width="'35%'"
    @ok="isEditing ? updateRole() : createRole()"
    @cancel="resetModal"
  >
  <a-form :model="form">
  <a-form-item label="Nombre">
    <a-input v-model:value="form.nombre" />
  </a-form-item>
  <a-form-item label="Descripción">
    <a-input v-model:value="form.descripcion" />
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
import { ref, reactive, onMounted, computed } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';

const showNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: 'topRight',
  });
};


export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
  },
  setup() {
    const roles = ref([]);
    const availablePermissions = ref([]);
    const searchText = ref('');
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
      Permissions: [],
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

    const filteredRoles = computed(() => {
      return roles.value.filter(role =>
        role.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        role.description.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/roles', {
          headers: { Authorization:  token },
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
      form.id = role.id;
      form.nombre = role.name;
      form.descripcion = role.description;
      form.permisos = (role.Permissions || []).map(permission => permission.id); 
      isEditing.value = true;
      isModalVisible.value = true;
    };



    const createRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/roles', {
          nombre: form.nombre,  // Usa 'name' en lugar de 'nombre' para alinear con el modelo
          descripcion: form.descripcion,
          permisos: form.permisos,
        }, {
          headers: { Authorization: token },
        });
        fetchRoles();
        resetModal();
        showNotification('success', 'Rol creado', 'El rol se ha creado exitosamente.');  // Notificación de éxito
      } catch (error) {
        console.error('Error al crear rol:', error);
        showNotification('error', 'Error al crear rol', `Error: ${error.response.data.details}`);  // Notificación de error
      }
    };

    const updateRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/roles/${form.id}`, {
          nombre: form.nombre,  // Usa 'name' en lugar de 'nombre' para alinear con el modelo
          descripcion: form.descripcion,
          permisos: form.permisos,
        }, {
          headers: { Authorization: token },
        });
        fetchRoles();
        resetModal();
        showNotification('success', 'Rol actualizado', 'El rol se ha actualizado exitosamente.');  // Notificación de éxito
      } catch (error) {
        console.error('Error al actualizar rol:', error);
        showNotification('error', 'Error al actualizar rol', `Error: ${error.response.data.details}`);  // Notificación de error
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
        showNotification('success', 'Rol eliminado', 'El rol se ha eliminado exitosamente.'); 
      } catch (error) {
        console.error('Error al eliminar rol:', error);
        showNotification('error', 'Error al eliminar rol', `Error: ${error.response.data.details}`); 
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
        name: '',
        description: '',
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
        name: '',
        description: '',
        Permissions: [],
      };
      isDetailsModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    const hasPermission = (requiredPermission) => {
      const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
      return userPermissions.includes(requiredPermission);
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
      filteredRoles,
      showCreateModal,
      showEditModal,
      createRole,
      updateRole,
      confirmDelete,
      deleteRole,
      viewDetails,
      handleSearch,
      resetModal,
      resetDetailsModal,
      resetDeleteModal,
      hasPermission,
    };
  },
};
</script>


<style scoped>
.admin-dashboard-layout {
  height: 100vh;
  background: #f0f2f5;
}

.header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.content {
  padding: 24px;
  background: #fff;
}
</style>
