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

    <CreateEditPermissionModal
      :visible="isModalVisible"
      :isEditing="isEditing"
      :form="form"
      @cancel="resetModal"
      @save="handleSave"
    />

    <DeletePermissionModal
      :visible="isDeleteModalVisible"
      @cancel="resetDeleteModal"
      @delete="deletePermissionHandler"
    />

    <DetailsPermissionModal
      :visible="isDetailsModalVisible"
      :permission="selectedPermission"
      @cancel="resetDetailsModal"
    />
  </a-layout>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { getPermisos, createPermiso, updatePermiso, deletePermiso } from '@/api/permission'; 
import CreateEditPermissionModal from '@/components/Permission/CreateEditPermissionModal.vue';
import DeletePermissionModal from '@/components/Permission/DeletePermissionModal.vue';
import DetailsPermissionModal from '@/components/Permission/DetailsPermissionModal.vue';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
    CreateEditPermissionModal,
    DeletePermissionModal,
    DetailsPermissionModal,
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
    const selectedPermission = ref({});

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

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const viewDetails = (permission) => {
      selectedPermission.value = permission;
      isDetailsModalVisible.value = true;
    };

    const resetForm = () => {
      form.id = null;
      form.nombre = '';
      form.descripcion = '';
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

    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    const fetchAllPermissions = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de obtener el token
        const response = await getPermisos(token);
        permissions.value = response.data; // Cambia a response.data si el backend lo requiere
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudieron cargar los permisos.',
        });
      }
    };

    const deletePermissionHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        await deletePermiso(form.id, token);
        fetchAllPermissions();
        resetDeleteModal();
        notification.success({
          message: 'Éxito',
          description: 'Permiso eliminado correctamente.',
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo eliminar el permiso.',
        });
      }
    };

    onMounted(() => {
      fetchAllPermissions();
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
      confirmDelete,
      viewDetails,
      handleSearch,
      resetModal,
      resetDeleteModal,
      resetDetailsModal,
      deletePermissionHandler,
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
