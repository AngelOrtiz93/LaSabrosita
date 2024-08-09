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
            Ver Detalles
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)">
            <DeleteOutlined />
          </a-button>
        </template>
      </a-table>
    </a-layout-content>

    <!-- Modal para crear/editar rol -->
    <a-modal
      v-model:visible="isModalVisible"
      :title="isEditing ? 'Editar Rol' : 'Crear Rol'"
      @cancel="resetModal"
      @ok="isEditing ? updateRole() : createRole()"
    >
      <a-form
        :model="form"
        labelCol="{ span: 4 }"
        wrapperCol="{ span: 20 }"
      >
        <a-form-item label="Nombre">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="Descripción">
          <a-input v-model:value="form.description" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal para confirmar eliminación -->
    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @cancel="resetDeleteModal"
      @ok="deleteRole"
    >
      <p>¿Estás seguro de que deseas eliminar este rol?</p>
    </a-modal>

    <!-- Modal para ver detalles del rol -->
    <a-modal
      v-model:visible="isDetailsModalVisible"
      title="Detalles del Rol"
      :width="'80%'"
      @cancel="resetDetailsModal"
    >
      <div>
        <h3>Nombre: {{ selectedRole.name }}</h3>
        <p>Descripción: {{ selectedRole.description }}</p>
        <a-table :columns="permissionsColumns" :dataSource="selectedRole.Permissions" rowKey="id" />
      </div>
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
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      name: '',
      description: '',
    });
    const selectedRole = ref({ Permissions: [] });

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
          headers: { Authorization: token }, // Sin 'Bearer'
        });
        roles.value = response.data;
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    const showCreateModal = () => {
      resetForm();
      isEditing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = (role) => {
      form.id = role.id;
      form.name = role.name;
      form.description = role.description;
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createRole = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/roles', form, {
          headers: { Authorization: token }, // Sin 'Bearer'
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
        await axios.put(`http://localhost:3001/roles/${form.id}`, form, {
          headers: { Authorization: token }, // Sin 'Bearer'
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
          headers: { Authorization: token }, // Sin 'Bearer'
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
          headers: { Authorization: token }, // Sin 'Bearer'
        });
        selectedRole.value = response.data;
        isDetailsModalVisible.value = true;
      } catch (error) {
        console.error('Error al obtener detalles del rol:', error);
      }
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
      selectedRole.value = { Permissions: [] };
      isDetailsModalVisible.value = false;
    };

    onMounted(() => {
      fetchRoles();
    });

    return {
      roles,
      isModalVisible,
      isDeleteModalVisible,
      isDetailsModalVisible,
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
      resetDeleteModal,
      resetDetailsModal,
    };
  },
};
</script>

