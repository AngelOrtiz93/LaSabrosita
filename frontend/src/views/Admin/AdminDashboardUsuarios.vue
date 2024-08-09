<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-headera>
      <a-button type="primary" @click="showCreateModal">
        <PlusOutlined /> Crear Usuario
      </a-button>
    </a-layout-headera>
    <a-layout-content>
      <a-table :columns="columns" :data-source="usuarios" rowKey="id">
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

    <a-modal
      v-model:open="isModalVisible"
      :title="isEditing ? 'Editar Usuario' : 'Crear Usuario'"
      @ok="isEditing ? updateUsuario() : createUsuario()"
      @cancel="resetModal"
    >
      <a-form :form="form">
        <a-form-item label="Nombre">
          <a-input v-model:value="form.nombre" />
        </a-form-item>
        <a-form-item label="Apellido">
          <a-input v-model:value="form.apellido" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="form.email" />
        </a-form-item>
        <a-form-item label="Teléfono">
          <a-input v-model:value="form.telefono" />
        </a-form-item>
        <a-form-item label="Dirección">
          <a-input v-model:value="form.direccion" />
        </a-form-item>
        <a-form-item label="Contraseña" v-if="!isEditing">
          <a-input type="password" v-model:value="form.contraseña" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="isDetailsModalVisible"
      title="Detalles del Usuario"
      @cancel="resetDetailsModal"
      :footer="null"
    >
      <a-form :form="detailsForm" layout="vertical">
        <a-form-item label="ID">
          <a-input v-model:value="detailsForm.id" disabled />
        </a-form-item>
        <a-form-item label="Nombre">
          <a-input v-model:value="detailsForm.nombre" disabled />
        </a-form-item>
        <a-form-item label="Apellido">
          <a-input v-model:value="detailsForm.apellido" disabled />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="detailsForm.email" disabled />
        </a-form-item>
        <a-form-item label="Teléfono">
          <a-input v-model:value="detailsForm.telefono" disabled />
        </a-form-item>
        <a-form-item label="Dirección">
          <a-input v-model:value="detailsForm.direccion" disabled />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deleteUsuario()"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este usuario?</p>
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
    const usuarios = ref([]);
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
    });

    const columns = [
      { title: 'Nombre', dataIndex: 'nombre' },
      { title: 'Apellido', dataIndex: 'apellido' },
      { title: 'Email', dataIndex: 'email' },
      { title: 'Teléfono', dataIndex: 'telefono' },
      { title: 'Dirección', dataIndex: 'direccion' },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/usuarios', {
          headers: { Authorization: token },
        });
        usuarios.value = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
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

    const createUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/usuarios', form, {
          headers: { Authorization: token },
        });
        fetchUsuarios();
        resetModal();
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    };

    const updateUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/usuarios/${form.id}`, form, {
          headers: { Authorization: token },
        });
        fetchUsuarios();
        resetModal();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deleteUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/usuarios/${form.id}`, {
          headers: { Authorization: token },
        });
        fetchUsuarios();
        resetDeleteModal();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    };

    const viewDetails = (usuario) => {
      Object.assign(detailsForm, usuario);
      isDetailsModalVisible.value = true;
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

    const resetModal = () => {
      resetForm();
      isModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      Object.assign(detailsForm, {
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
      });
      isDetailsModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    onMounted(fetchUsuarios);

    return {
      usuarios,
      isModalVisible,
      isDetailsModalVisible,
      isDeleteModalVisible,
      isEditing,
      form,
      detailsForm,
      columns,
      showCreateModal,
      showEditModal,
      createUsuario,
      updateUsuario,
      confirmDelete,
      deleteUsuario,
      viewDetails,
      resetModal,
      resetDetailsModal,
      resetDeleteModal,
    };
  },
};
</script>
