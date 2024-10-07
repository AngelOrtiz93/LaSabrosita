<template>
  <div>
    <h1>Administrar Detalles de Pedidos</h1>
    <CrudTable 
      :apiUrl="apiUrl"
      :columns="columns"
      :token="token"
      :fetchDataFn="fetchDetallePedidos"
      :deleteRecordFn="handleDeleteDetallePedido"
      :updateRecordFn="handleUpdateDetallePedido"
      :createRecordFn="handleCreateDetallePedido"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CrudTable from '@/components/Utils/CrudTable.vue';
import { getDetallePedidos, deleteDetallePedido, updateDetallePedido, createDetallePedido } from '@/api/detallePedido';

// URL de la API de detalles de pedidos
const apiUrl = 'http://localhost:3001/detalle-pedidos';

// Obtener el token desde localStorage
const token = ref(localStorage.getItem('token'));

// Definir las columnas de la tabla
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Cantidad',
    dataIndex: 'cantidad',
    key: 'cantidad',
  },
  {
    title: 'Precio Unitario',
    dataIndex: 'precioUnitario',
    key: 'precioUnitario',
  },
  {
    title: 'Producto ID',
    dataIndex: 'productoId',
    key: 'productoId',
  },
  {
    title: 'Pedido ID',
    dataIndex: 'pedidoId',
    key: 'pedidoId',
  },
  {
    title: 'Acciones',
    key: 'actions',
    scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
  },
]);

const fetchDetallePedidos = async (token) => {
  try {
    const response = await getDetallePedidos(token);
    return response.data; // Devuelve solo los datos del array
  } catch (error) {
    console.error('Error al obtener los detalles de pedido:', error);
    throw error;
  }
};

const handleDeleteDetallePedido = async (id, token) => {
  try {
    await deleteDetallePedido(id, token);
  } catch (error) {
    console.error('Error al eliminar detalle de pedido:', error);
    throw error;
  }
};

const handleUpdateDetallePedido = async (id, detallePedidoData, token) => {
  try {
    await updateDetallePedido(id, detallePedidoData, token);
  } catch (error) {
    console.error('Error al actualizar detalle de pedido:', error);
    throw error;
  }
};

const handleCreateDetallePedido = async (detallePedidoData, token) => {
  try {
    await createDetallePedido(detallePedidoData, token);
  } catch (error) {
    console.error('Error al crear detalle de pedido:', error);
    throw error;
  }
};
</script>

<style scoped>
/* Agrega aquí estilos específicos si es necesario */
</style>
