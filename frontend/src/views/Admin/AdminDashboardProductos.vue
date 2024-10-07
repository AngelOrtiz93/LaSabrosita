<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <a-button 
        type="primary" 
        @click="showCreateModal" 
        style="margin-right: 16px;" 
        v-if="hasPermission('Crear Producto')">
        <PlusOutlined /> Crear Producto
      </a-button>
      <a-input
        placeholder="Buscar por Nombre, Descripción, o ID"
        style="width: 400px; margin: 16px 0;"
        @input="handleSearch"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
    </a-layout-header>

    <a-layout-content>
      <a-table 
        :columns="columns" 
        :data-source="filteredProductos" 
        rowKey="id"
        @change="handleTableChange"
        :pagination="false"
      >
        <template v-slot:actions="{ record }">
          <a-button type="link" @click="showEditModal(record)" v-if="hasPermission('Actualizar Producto')">
            <EditOutlined />
          </a-button>
          <a-button type="link" @click="viewDetails(record)" v-if="hasPermission('Obtener Producto por ID')">
            <EyeOutlined />
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)" v-if="hasPermission('Eliminar Producto')">
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
      footer="La Sabrosita, sabor que se disfruta al instante"
      @cancel="resetImageModal"
    >
      <img :src="selectedImageUrl" style="width: 100%; height: auto;" />
    </a-modal>

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
import { ref, reactive, onMounted, computed } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
  },
  setup() {
    const productos = ref([]);
    const searchText = ref('');
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
      { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id.localeCompare(b.id) },
      { title: 'Nombre', dataIndex: 'nombre', sorter: (a, b) => a.nombre.localeCompare(b.nombre) },
      { title: 'Descripción', dataIndex: 'descripcion' },
      { title: 'Precio', dataIndex: 'precio', sorter: (a, b) => a.precio - b.precio },
      { title: 'Stock', dataIndex: 'stock', sorter: (a, b) => a.stock - b.stock },
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

    const filteredProductos = computed(() => {
      return productos.value.filter(producto =>
        producto.nombre.toLowerCase().includes(searchText.value.toLowerCase()) || 
        producto.descripcion.toLowerCase().includes(searchText.value.toLowerCase()) ||
        producto.id.toString().includes(searchText.value.toLowerCase())
      );
    });

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

    const selectProduct = (producto) => {
  let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  
  // Verificar si el producto ya está seleccionado
  if (!selectedProducts.some(p => p.id === producto.id)) {
    selectedProducts.push(producto);
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    notification.success({
      message: 'Éxito',
      description: 'Producto seleccionado exitosamente.',
    });
  } else {
    notification.info({
      message: 'Información',
      description: 'Este producto ya está seleccionado.',
    });
  }
};


    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    const hasPermission = (requiredPermission) => {
      const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
      return userPermissions.includes(requiredPermission);
    };

    const showCreateModal = () => {
      if (hasPermission('Crear Producto')) {
        resetForm();
        isEditing.value = false;
        isModalVisible.value = true;
      }
    };

    const showEditModal = (producto) => {
      if (hasPermission('Actualizar Producto')) {
        Object.assign(form, producto);
        isEditing.value = true;
        isModalVisible.value = true;
      }
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
      if (hasPermission('Eliminar Producto')) {
        form.id = id;
        isDeleteModalVisible.value = true;
      }
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

    const showImageModal = (url) => {
      selectedImageUrl.value = url;
      isImageModalVisible.value = true;
    };

    const viewDetails = (producto) => {
      if (hasPermission('Obtener Producto por ID')) {
        Object.assign(detailsForm, producto);
        isDetailsModalVisible.value = true;
      }
    };

    const resetForm = () => {
      Object.assign(form, {
        id: null,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagenUrl: '',
      });
    };

    const resetModal = () => {
      isModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      isDeleteModalVisible.value = false;
    };

    const resetImageModal = () => {
      isImageModalVisible.value = false;
      selectedImageUrl.value = '';
    };

    const resetDetailsModal = () => {
      isDetailsModalVisible.value = false;
      Object.assign(detailsForm, {
        id: '',
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagenUrl: '',
      });
    };

    onMounted(() => {
      fetchProductos();
    });

    return {
      columns,
      filteredProductos,
      isModalVisible,
      isDeleteModalVisible,
      isImageModalVisible,
      isDetailsModalVisible,
      selectedImageUrl,
      form,
      detailsForm,
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
      handleSearch,
      hasPermission,
      handleTableChange: (pagination, filters, sorter) => {
        const { field, order } = sorter;
        if (field) {
          const sortedProductos = [...productos.value].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];
            if (order === 'ascend') {
              return aValue > bValue ? 1 : -1;
            } else {
              return aValue < bValue ? 1 : -1;
            }
          });
          productos.value = sortedProductos;
        }
      },
    };
  },
};
</script>

<style scoped>
.admin-dashboard-layout {
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 0;
  line-height: 64px;
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header .logo {
  height: 31px;
  margin: 16px;
}
</style>
