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
    <PedidoFormModal
      :isVisible="isModalVisible"
      :pedido="form"
      @update:isVisible="isModalVisible = $event"
      @pedidoUpdated="handleUpdate"
    />

    <!-- Modal para detalles del pedido -->
    <PedidoDetailsModal
      :isVisible="isDetailsModalVisible"
      :pedido="selectedPedido"
      @update:isVisible="isDetailsModalVisible = $event"
    />

    <!-- Modal para confirmar eliminación de pedido -->
    <ConfirmDeletePedidoModal
      :isVisible="isDeleteModalVisible"
      :pedidoId="form.id"
      @update:isVisible="isDeleteModalVisible = $event"
      @deleteConfirmed="handleDelete"
    />
  </a-layout>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { notification } from 'ant-design-vue';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { fetchPedidos, updatePedido, deletePedido } from '@/api/pedido'; // Asegúrate de que la ruta sea correcta
import ConfirmDeletePedidoModal from '@/components/pedidos/ConfirmDeletePedidoModal.vue';
import PedidoDetailsModal from '@/components/pedidos/PedidoDetailsModal.vue';
import PedidoFormModal from '@/components/pedidos/PedidoFormModal.vue';

export default {
  components: {
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    SearchOutlined,
    ConfirmDeletePedidoModal,
    PedidoDetailsModal,
    PedidoFormModal,
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
      { title: 'Nombre del Cliente', dataIndex: ['Usuario', 'nombre'], render: text => text || 'No disponible' },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const filteredPedidos = computed(() => {
      return pedidos.value.filter(pedido =>
        pedido.id.toString().includes(searchText.value) ||
        pedido.estado.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const fetchPedidosData = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await fetchPedidos(token);
        pedidos.value = data;
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    const showEditModal = (pedido) => {
      form.id = pedido.id;
      form.estado = pedido.estado;
      isModalVisible.value = true;
    };

    const handleUpdate = async (updatedData) => {
      const token = localStorage.getItem('token');
      try {
        await updatePedido(token, updatedData.id, { estado: updatedData.estado });
        notification.success({
          message: 'Éxito',
          description: 'El pedido ha sido actualizado correctamente.',
        });
        await fetchPedidosData();
      } catch (error) {
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

    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const handleDelete = async (pedidoId) => {
      const token = localStorage.getItem('token');
      try {
        await deletePedido(token, pedidoId);
        notification.success({
          message: 'Éxito',
          description: 'El pedido ha sido eliminado correctamente.',
        });
        await fetchPedidosData();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'No se pudo eliminar el pedido.',
        });
      }
    };

    const handleSearch = (event) => {
      searchText.value = event.target.value;
    };

    onMounted(fetchPedidosData);

    return {
      pedidos,
      filteredPedidos,
      columns,
      form,
      isModalVisible,
      isDetailsModalVisible,
      isDeleteModalVisible,
      selectedPedido,
      showEditModal,
      showDetailsModal,
      confirmDelete,
      handleUpdate,
      handleDelete,
      handleSearch,
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
