<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-content>
      <a-table :columns="columns" :data-source="pedidos" rowKey="id">
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

    <!-- Modal para detalles del pedido -->
    <a-modal
      v-model:open="isDetailsModalVisible"
      title="Detalles del Pedido"
      @ok="resetDetailsModal"
      @cancel="resetDetailsModal"
      width="70%"
    >
      <div v-if="selectedPedido"><br>
        <p><strong>Numero de Pedido:</strong> {{ selectedPedido.id }}</p>
        <p><strong>Nombre: </strong> {{ selectedPedido.Usuario ? selectedPedido.Usuario.nombre : 'No disponible' }}</p>
        <p><strong>Fecha del Pedido:</strong> {{ selectedPedido.fechaPedido }}</p>
        <p><strong>Estado:</strong> {{ selectedPedido.estado }}</p><br>
        <a-table :columns="detailColumns" :data-source="selectedPedido.DetallePedidos" rowKey="id" />
      </div>
    </a-modal>

   <!-- Modal para editar pedido -->
<a-modal
  v-model:open="isModalVisible"
  title="Editar Pedido"
  @ok="updatePedido"
  @cancel="resetModal"
>
  <a-form :form="form">
    <a-form-item label="Cliente ID">
      <a-input v-model:value="form.clienteId" />
    </a-form-item>
    <a-form-item label="Empleado ID">
      <a-input v-model:value="form.empleadoId" />
    </a-form-item>
    <a-form-item label="Domiciliario ID">
      <a-input v-model:value="form.domiciliarioId" />
    </a-form-item>
    <a-form-item label="Fecha del Pedido">
      <a-date-picker v-model:value="form.fechaPedido" format="YYYY-MM-DD HH:mm:ss" />
    </a-form-item>
  </a-form>
</a-modal>


    <!-- Modal para confirmar eliminación -->
    <a-modal
      v-model:open="isDeleteModalVisible"
      title="Confirmar Eliminación"
      @ok="deletePedido"
      @cancel="resetDeleteModal"
    >
      <p>¿Estás seguro de que deseas eliminar este pedido?</p>
    </a-modal>
  </a-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import axios from 'axios';

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
  },
  setup() {
    const pedidos = ref([]);
    const isModalVisible = ref(false);
    const isDeleteModalVisible = ref(false);
    const isEditing = ref(false);
    const isDetailsModalVisible = ref(false);
    const selectedPedido = ref(null);
    const form = reactive({
      id: null,
      usuarioId: '',
      fechaPedido: null,
      productos: '',
    });

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Nombre del Cliente', dataIndex: ['Usuario', 'nombre'] },
      { title: 'Fecha del Pedido', dataIndex: 'fechaPedido' },
      { title: 'Estado', dataIndex: 'estado' },
      {
        title: 'Acciones',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    const detailColumns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Producto ID', dataIndex: 'productoId' },
      { title: 'Cantidad', dataIndex: 'cantidad' },
      { title: 'Precio Unitario', dataIndex: 'precioUnitario' },
    ];

    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/pedidos', {
          headers: { Authorization: token },
        });
        console.log('Datos de pedidos:', response.data); // Verifica la estructura
        pedidos.value = response.data;
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    const showEditModal = (pedido) => {
  form.id = pedido.id;
  form.clienteId = pedido.clienteId; // Ajustado para coincidir con el backend
  form.empleadoId = pedido.empleadoId; // Ajustado para coincidir con el backend
  form.domiciliarioId = pedido.domiciliarioId; // Ajustado para coincidir con el backend
  form.fechaPedido = pedido.fechaPedido;
  isModalVisible.value = true;
};



    const showDetailsModal = async (pedido) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/pedidos/${pedido.id}`, {
          headers: { Authorization: token },
        });
        console.log('Datos del pedido:', response.data); // Verifica la estructura de los datos
        selectedPedido.value = response.data;
        isDetailsModalVisible.value = true;
      } catch (error) {
        console.error('Error al obtener detalles del pedido:', error);
      }
    };
   
    const updatePedido = async () => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      clienteId: form.clienteId,
      empleadoId: form.empleadoId,
      domiciliarioId: form.domiciliarioId,
      fechaPedido: form.fechaPedido,
    };
    await axios.put(`http://localhost:3001/pedidos/${form.id}`, payload, {
      headers: { Authorization: token },
    });
    fetchPedidos();
    resetModal();
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
  }
};





    const confirmDelete = (id) => {
      form.id = id;
      isDeleteModalVisible.value = true;
    };

    const deletePedido = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/pedidos/${form.id}`, {
          headers: { Authorization: token },
        });
        fetchPedidos();
        resetDeleteModal();
      } catch (error) {
        console.error('Error al eliminar pedido:', error);
      }
    };

    const resetForm = () => {
      form.id = null;
      form.usuarioId = '';
      form.fechaPedido = null;
      form.productos = '';
    };

    const resetModal = () => {
      resetForm();
      isModalVisible.value = false;
    };

    const resetDetailsModal = () => {
      selectedPedido.value = null;
      isDetailsModalVisible.value = false;
    };

    const resetDeleteModal = () => {
      form.id = null;
      isDeleteModalVisible.value = false;
    };

    onMounted(() => {
      fetchPedidos();
    });

    return {
      pedidos,
      isModalVisible,
      isDeleteModalVisible,
      isEditing,
      isDetailsModalVisible,
      selectedPedido,
      form,
      columns,
      detailColumns,
      showEditModal,
      showDetailsModal,
      updatePedido,
      confirmDelete,
      deletePedido,
      resetModal,
      resetDetailsModal,
      resetDeleteModal,
    };
  },
};
</script>
