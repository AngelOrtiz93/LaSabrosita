<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-headera>
      <a-button type="primary" @click="showCreateModal">
        <PlusOutlined /> Crear Producto
      </a-button>
    </a-layout-headera>
    <a-layout-content>
      <a-table :columns="columns" :data-source="productos" rowKey="id">
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
        <template v-slot:image="{ record }">
          <a-avatar
            :src="record.imagenUrl"
            size="small"
            shape="square"
            @click="showImageModal(record.imagenUrl)"
            style="cursor: pointer;"
          />
        </template>
      </a-table>
    </a-layout-content>

    <!-- Modal para Crear/Editar Producto -->
    <a-modal
      v-model:open="isModalVisible"
      :title="isEditing ? 'Editar Producto' : 'Crear Producto'"
      @ok="isEditing ? updateProducto() : createProducto()"
      @cancel="resetModal"
    >
      <a-form :form="form">
        <a-form-item label="Nombre">
          <a-input v-model:value="form.nombre" />
        </a-form-item>
        <a-form-item label="Descripción">
          <a-input v-model:value="form.descripcion" />
        </a-form-item>
        <a-form-item label="Precio">
          <a-input type="number" v-model:value="form.precio" />
        </a-form-item>
        <a-form-item label="Stock">
          <a-input type="number" v-model:value="form.stock" />
        </a-form-item>
        <a-form-item label="Imagen URL">
          <a-input v-model:value="form.imagenUrl" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal para Confirmar Eliminación -->
    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deleteProducto()"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
    </a-modal>

    <!-- Modal para Ver Imagen -->
    <a-modal
      v-model:open="isImageModalVisible"
      title="Imagen del Producto"
      footer={null}
      @cancel="resetImageModal"
    >
      <img :src="selectedImageUrl" style="width: 100%; height: auto;" />
    </a-modal>

    <!-- Modal para Ver Detalles del Producto -->
    <a-modal
      v-model:open="isDetailsModalVisible"
      title="Detalles del Producto"
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
        <a-form-item label="Descripción">
          <a-input v-model:value="detailsForm.descripcion" disabled />
        </a-form-item>
        <a-form-item label="Precio">
          <a-input v-model:value="detailsForm.precio" disabled />
        </a-form-item>
        <a-form-item label="Stock">
          <a-input v-model:value="detailsForm.stock" disabled />
        </a-form-item>
        <a-form-item label="Imagen URL">
          <a-input v-model:value="detailsForm.imagenUrl" disabled />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
  },
  setup() {
    const productos = ref([]);
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isImageModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const selectedImageUrl = ref('');
    const isEditing = ref(false);
    const form = reactive({
      id: null,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagenUrl: '',
    });
    const detailsForm = reactive({
      id: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagenUrl: '',
    });

    const columns = [
      { title: 'Id', dataIndex: 'id' },
      { title: 'Nombre', dataIndex: 'nombre' },
      { title: 'Descripción', dataIndex: 'descripcion' },
      { title: 'Precio', dataIndex: 'precio' },
      { title: 'Stock', dataIndex: 'stock' },
      {
        title: 'Imagen',
        key: 'imagen',
        slots: { customRender: 'image' },
      },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/productos', {
          headers: { Authorization: token },
        });
        productos.value = response.data;
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo obtener la lista de productos.',
        });
      }
    };

    const showCreateModal = () => {
      resetForm();
      isEditing.value = false;
      isModalVisible.value = true;
    };

    const showEditModal = (producto) => {
      form.id = producto.id;
      form.nombre = producto.nombre;
      form.descripcion = producto.descripcion;
      form.precio = producto.precio;
      form.stock = producto.stock;
      form.imagenUrl = producto.imagenUrl;
      isEditing.value = true;
      isModalVisible.value = true;
    };

    const createProducto = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/productos', form, {
          headers: { Authorization: token },
        });
        notification.success({
          message: 'Éxito',
          description: 'Producto creado exitosamente.',
        });
        fetchProductos();
        resetModal();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo crear el producto.',
        });
      }
    };

    const updateProducto = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/productos/${form.id}`, form, {
          headers: { Authorization: token },
        });
        notification.success({
          message: 'Éxito',
          description: 'Producto actualizado exitosamente.',
        });
        fetchProductos();
        resetModal();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo actualizar el producto.',
        });
      }
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deleteProducto = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/productos/${form.id}`, {
          headers: { Authorization: token },
        });
        notification.success({
          message: 'Éxito',
          description: 'Producto eliminado exitosamente.',
        });
        fetchProductos();
        resetDeleteModal();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo eliminar el producto.',
        });
      }
    };

    const showImageModal = (imageUrl) => {
      selectedImageUrl.value = imageUrl;
      isImageModalVisible.value = true;
    };

    const viewDetails = (producto) => {
      detailsForm.id = producto.id;
      detailsForm.nombre = producto.nombre;
      detailsForm.descripcion = producto.descripcion;
      detailsForm.precio = producto.precio;
      detailsForm.stock = producto.stock;
      detailsForm.imagenUrl = producto.imagenUrl;
      isDetailsModalVisible.value = true;
    };

    const resetForm = () => {
      form.id = null;
      form.nombre = '';
      form.descripcion = '';
      form.precio = 0;
      form.stock = 0;
      form.imagenUrl = '';
    };

    const resetModal = () => {
      isModalVisible.value = false;
      resetForm();
    };

    const resetDeleteModal = () => {
      isDeleteModalVisible.value = false;
    };

    const resetImageModal = () => {
      isImageModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      isDetailsModalVisible.value = false;
    };

    onMounted(() => {
      fetchProductos();
    });

    return {
      productos,
      columns,
      isModalVisible,
      isDeleteModalVisible,
      isImageModalVisible,
      isDetailsModalVisible,
      selectedImageUrl,
      isEditing,
      form,
      detailsForm,
      fetchProductos,
      showCreateModal,
      showEditModal,
      createProducto,
      updateProducto,
      confirmDelete,
      deleteProducto,
      showImageModal,
      viewDetails,
      resetModal,
      resetDeleteModal,
      resetImageModal,
      resetDetailsModal,
    };
  },
};
</script>

<style scoped>
.admin-dashboard-layout {
  min-height: 100vh;
}
</style>
