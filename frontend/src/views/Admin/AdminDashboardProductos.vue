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

    <a-modal
      v-model:visible="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deleteProducto()"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
    </a-modal>

    <a-modal
      v-model:open="isImageModalVisible"
      title="Imagen del Producto"
      footer={null}
      @cancel="resetImageModal"
    >
      <img :src="selectedImageUrl" style="width: 100%; height: auto;" />
    </a-modal>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    const productos = ref([]);
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isImageModalVisible = ref(false); 
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
        console.error('Error al obtener productos:', error);
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
        fetchProductos();
        resetModal();
      } catch (error) {
        console.error('Error al crear producto:', error);
      }
    };

    const updateProducto = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/productos/${form.id}`, form, {
          headers: { Authorization: token },
        });
        fetchProductos();
        resetModal();
      } catch (error) {
        console.error('Error al actualizar producto:', error);
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
        fetchProductos();
        resetDeleteModal();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    };

    const showImageModal = (url) => {
      selectedImageUrl.value = url;
      isImageModalVisible.value = true;
    };

    const resetImageModal = () => {
      selectedImageUrl.value = '';
      isImageModalVisible.value = false;
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
      resetForm();
      isModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    onMounted(() => {
      fetchProductos();
    });

    return {
      productos,
      isModalVisible,
      isDeleteModalVisible,
      isImageModalVisible,
      selectedImageUrl,
      isEditing,
      form,
      columns,
      showCreateModal,
      showEditModal,
      createProducto,
      updateProducto,
      confirmDelete,
      deleteProducto,
      resetModal,
      resetDeleteModal,
      showImageModal,
      resetImageModal,
    };
  },
};
</script>

<style scoped>
/* Añade estilos específicos si es necesario */
</style>
