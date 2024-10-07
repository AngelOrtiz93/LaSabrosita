<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <a-button type="primary" @click="showCreateModal" style="margin-right: 16px;">
        <PlusOutlined /> Crear Permiso
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
      <a-table :columns="columns" :data-source="filteredPermissions" rowKey="id">
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

    <!-- Modal para Crear/Editar Permiso -->
    <a-modal
      v-model:open="isModalVisible"
      :title="isEditing ? 'Editar Permiso' : 'Crear Permiso'"
      @ok="isEditing ? updatePermission() : createPermission()"
      @cancel="resetModal"
      :width="'35%'"
    >
      <a-form :model="form">
        <a-form-item label="Nombre">
          <a-input v-model:value="form.nombre" />
        </a-form-item>
        <a-form-item label="Descripción">
          <a-input v-model:value="form.descripcion" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal de Confirmación de Eliminación -->
    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deletePermission()"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este permiso?</p>
    </a-modal>

    <!-- Modal de Detalles del Permiso -->
    <a-modal
      v-model:visible="isDetailsModalVisible"
      title="Detalles del Permiso"
      :width="'60%'"
      @cancel="resetDetailsModal"
      :footer="null"
    >
      <div>
        <h3>Nombre: {{ selectedPermission.name }}</h3>
        <p>Descripción: {{ selectedPermission.description }}</p>
      </div>
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
    const permissions = ref([]);
    const searchText = ref('');
    const isModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      nombre: '',
      descripcion: '',
    });
    const selectedPermission = ref({
      id: '',
      name: '',
      description: '',
    });

    const columns = [
      { title: 'Nombre', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
      { title: 'Descripción', dataIndex: 'description', sorter: (a, b) => a.description.localeCompare(b.description) },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const filteredPermissions = computed(() => {
      return permissions.value.filter(permission =>
        permission.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/permissions', {
          headers: { Authorization: token },
        });
        permissions.value = response.data;
      } catch (error) {
        console.error('Error al obtener permisos:', error);
      }
    };

    const showCreateModal = () => {
      resetForm();
      isEditing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = (permission) => {
      form.id = permission.id;
      form.nombre = permission.name;
      form.descripcion = permission.description;
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createPermission = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/permissions', {
          nombre: form.nombre,
          descripcion: form.descripcion,
        }, {
          headers: { Authorization: token },
        });
        fetchPermissions();
        resetModal();
        showNotification('success', 'Permiso creado', 'El permiso se ha creado exitosamente.');
      } catch (error) {
        console.error('Error al crear permiso:', error);
        showNotification('error', 'Error al crear permiso', `Error: ${error.response.data.details}`);
      }
    };

    const updatePermission = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/permissions/${form.id}`, {
          nombre: form.nombre,
          descripcion: form.descripcion,
        }, {
          headers: { Authorization: token },
        });
        fetchPermissions();
        resetModal();
        showNotification('success', 'Permiso actualizado', 'El permiso se ha actualizado exitosamente.');
      } catch (error) {
        console.error('Error al actualizar permiso:', error);
        showNotification('error', 'Error al actualizar permiso', `Error: ${error.response.data.details}`);
      }
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deletePermission = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/permissions/${form.id}`, {
          headers: { Authorization: token },
        });
        fetchPermissions();
        resetDeleteModal();
        showNotification('success', 'Permiso eliminado', 'El permiso se ha eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar permiso:', error);
        showNotification('error', 'Error al eliminar permiso', `Error: ${error.response.data.details}`);
      }
    };

    const viewDetails = (permission) => {
      selectedPermission.value = permission;
      isDetailsModalVisible.value = true;
    };

    const resetForm = () => {
      Object.assign(form, {
        id: null,
        nombre: '',
        descripcion: '',
      });
    };

    const resetModal = () => {
      resetForm();
      isModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      selectedPermission.value = {
        id: '',
        name: '',
        description: '',
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

    onMounted(() => {
      fetchPermissions();
    });

    return {
      permissions,
      isModalVisible,
      isDetailsModalVisible,
      isDeleteModalVisible,
      isEditing,
      form,
      selectedPermission,
      columns,
      filteredPermissions,
      showCreateModal,
      showEditModal,
      createPermission,
      updatePermission,
      confirmDelete,
      deletePermission,
      viewDetails,
      handleSearch,
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
