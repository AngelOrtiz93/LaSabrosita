<template>
  <a-layout class="admin-dashboard-layout">
    <!-- Header similar al de Roles -->
    <a-layout-header class="header">
      <a-input
        placeholder="Buscar por Número de Pedido o Estado"
        style="width: 400px; margin: 0;"
        @input="handleSearch"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
    </a-layout-header>

    <!-- Contenido de la tabla -->
    <a-layout-content class="content">
      <a-table :columns="columns" :data-source="filteredPedidos" rowKey="id">
        <template v-slot:actions="{ record }">
          <a-button type="link" @click="showDetailsModal(record)">
            <InfoCircleOutlined /> Detalles
          </a-button>
          <a-button type="link" @click="showEditModal(record)">
            <EditOutlined />
          </a-button>
          <a-button type="link" danger @click="confirmDelete(record.id)">
            <DeleteOutlined />
          </a-button>
        </template>
      </a-table>
    </a-layout-content>

    <!-- Modal para editar pedido -->
    <a-modal
      v-model:open="isModalVisible"
      title="Editar Pedido"
      @ok="updatePedido"
      @cancel="resetModal"
    >
      <a-form :form="form">
        <a-form-item label="Estado">
          <a-select v-model:value="form.estado">
            <a-select-option value="Pendiente">Pendiente</a-select-option>
            <a-select-option value="En Proceso">En Proceso</a-select-option>
            <a-select-option value="Enviado">Enviado</a-select-option>
            <a-select-option value="Entregado">Entregado</a-select-option>
            <a-select-option value="Cancelado">Cancelado</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Modal para detalles del pedido -->
<a-modal
  v-model:open="isDetailsModalVisible"
  title="Detalles del Pedido"
  @ok="resetDetailsModal"
  @cancel="resetDetailsModal"
  width="70%"
>
  <div v-if="selectedPedido"><br>
    <p><strong>Número de Pedido:</strong> {{ selectedPedido.id }}</p>
    <p><strong>Nombre: </strong> {{ selectedPedido.Usuario ? selectedPedido.Usuario.nombre : 'No disponible' }}</p>
    <p><strong>Teléfono: </strong> {{ selectedPedido.Usuario ? selectedPedido.Usuario.telefono : 'No disponible' }}</p>
    <p><strong>Dirección: </strong> {{ selectedPedido.Usuario ? selectedPedido.Usuario.direccion : 'No disponible' }}</p>
    <p><strong>Fecha del Pedido:</strong> {{ selectedPedido.fechaPedido }}</p>
    <p><strong>Estado:</strong> {{ selectedPedido.estado }}</p><br>
    
    <!-- Valor Total Mejorado -->
    
    <a-table :columns="detailColumns" :data-source="selectedPedido.DetallePedidos" rowKey="id" />

    <p class="valor-total"><strong>Valor Total:</strong> ${{ selectedPedido.total.toFixed(2) }}</p>
  </div>
</a-modal>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';

export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    SearchOutlined,
  },
  setup() {
    const pedidos = ref([]);
    const searchText = ref('');
    const isModalVisible = ref(false);
    const isDetailsModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const form = reactive({
      id: null,
      estado: '',
    });
    const selectedPedido = ref(null);

    const columns = [
      { title: 'Número de Pedido', dataIndex: 'id' },
      { title: 'Estado', dataIndex: 'estado' },
      { 
        title: 'Nombre del Cliente', 
        dataIndex: ['Usuario', 'nombre', ],  
        render: text => text || 'No disponible' 
      },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const detailColumns = [
      {
        title: 'Producto',
        dataIndex: ['Producto', 'nombre'],
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad',
      },
      {
        title: 'Precio Unitario',
        dataIndex: 'precioUnitario',
      },
      {
        title: 'Descripción',
        dataIndex: ['Producto', 'descripcion'],
      },
    ];

    const filteredPedidos = computed(() => {
      return pedidos.value.filter(pedido =>
        pedido.id.toString().includes(searchText.value.toLowerCase()) ||
        pedido.estado.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/pedidos', {
          headers: { Authorization: token },
        });
        console.log('Pedidos:', response.data); // Verifica la respuesta aquí
        pedidos.value = response.data;
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    const showEditModal = (pedido) => {
      form.id = pedido.id;
      form.estado = pedido.estado;
      isModalVisible.value = true;
    };

    const updatePedido = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3001/pedidos/${form.id}`, {
          estado: form.estado,
        }, {
          headers: { Authorization: token },
        });
        await fetchPedidos();
        notification.success({
          message: 'Éxito',
          description: 'El pedido ha sido actualizado correctamente.',
        });
        resetModal();
      } catch (error) {
        console.error('Error al actualizar el pedido:', error);
        notification.error({
          message: 'Error',
          description: 'No se pudo actualizar el pedido.',
        });
      }
    };

    const showDetailsModal = (pedido) => {
      selectedPedido.value = pedido;
      isDetailsModalVisible.value = true;
    };

    const resetDetailsModal = () => {
      isDetailsModalVisible.value = false;
      selectedPedido.value = null;
    };

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const resetModal = () => {
      isModalVisible.value = false;
    };

    const resetForm = () => {
      form.id = null;
      form.estado = '';
    };

    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    const hasPermission = (requiredPermission) => {
      const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
      return userPermissions.includes(requiredPermission);
    };

    onMounted(() => {
      fetchPedidos();
    });

    return {
      pedidos,
      filteredPedidos,
      columns,
      detailColumns,
      form,
      isModalVisible,
      isDetailsModalVisible,
      selectedPedido,
      showEditModal,
      showDetailsModal,
      resetDetailsModal,
      confirmDelete,
      updatePedido,
      resetModal,
      resetForm,
      handleSearch,
      hasPermission,
    };
  }
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
.valor-total {
  font-size: 1.5em; /* Tamaño de fuente más grande */
  color: #ff5722; /* Color atractivo */
  font-weight: bold; /* Negrita */
  padding: 10px; /* Espaciado */
  border: 2px solid #ff5722; /* Borde alrededor del total */
  border-radius: 5px; /* Bordes redondeados */
  background-color: #fff3e0; /* Fondo ligero */
  margin-top: 10px; /* Espacio superior */
}
</style>
