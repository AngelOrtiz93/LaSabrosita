<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-headera>
      <a-button type="primary" @click="showCreateModal">
        <PlusOutlined /> Crear Permiso
      </a-button>
    </a-layout-headera>
    <a-layout-content>
      <a-table :columns="columns" :data-source="permissions" rowKey="id">
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
    >
      <a-form :form="form">
        <a-form-item label="Nombre">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="Descripción">
          <a-input v-model:value="form.description" />
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
      @cancel="resetDetailsModal"
    >
      <p><strong>ID:</strong> {{ selectedPermission.id }}</p>
      <p><strong>Nombre:</strong> {{ selectedPermission.name }}</p>
      <p><strong>Descripción:</strong> {{ selectedPermission.description }}</p>
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
    EyeOutlined
  },
  setup() {
    const permissions = ref([]);
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      name: '',
      description: '',
    });
    const selectedPermission = ref({});

    const columns = [
      { title: 'Nombre', dataIndex: 'name' },
      { title: 'Descripción', dataIndex: 'description' },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

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
      form.name = permission.name;
      form.description = permission.description;
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createPermission = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/permissions', form, {
          headers: { Authorization: token },
        });
        fetchPermissions();
        resetModal();
      } catch (error) {
        console.error('Error al crear permiso:', error);
      }
    };

    const updatePermission = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/permissions/${form.id}`, form, {
          headers: { Authorization: token },
        });
        fetchPermissions();
        resetModal();
      } catch (error) {
        console.error('Error al actualizar permiso:', error);
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
      } catch (error) {
        console.error('Error al eliminar permiso:', error);
      }
    };

    const viewDetails = (permission) => {
      selectedPermission.value = permission;
      isDetailsModalVisible.value = true;
    };

    const resetForm = () => {
      form.id = null;
      form.name = '';
      form.description = '';
    };

    const resetModal = () => {
      resetForm();
      isModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      selectedPermission.value = {};
      isDetailsModalVisible.value = false;
    };

    onMounted(() => {
      fetchPermissions();
    });

    return {
      permissions,
      isModalVisible,
      isDeleteModalVisible,
      isDetailsModalVisible,
      isEditing,
      form,
      selectedPermission,
      columns,
      showCreateModal,
      showEditModal,
      createPermission,
      updatePermission,
      confirmDelete,
      deletePermission,
      viewDetails,
      resetModal,
      resetDeleteModal,
      resetDetailsModal,
    };
  },
};
</script>

<style scoped>

</style>
