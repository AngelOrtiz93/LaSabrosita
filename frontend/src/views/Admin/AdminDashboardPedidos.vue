<template>
    <div>
      <h1>Administrar Pedidos</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchPedidos"
        :deleteRecordFn="handleDeletePedido"
        :updateRecordFn="handleUpdatePedido"
        :createRecordFn="handleCreatePedido"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getPedidos, deletePedido, updatePedido, createPedido } from '@/api/pedido';
  
  // URL de la API de pedidos
  const apiUrl = 'http://localhost:3001/pedidos';
  
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
      title: 'Cliente ID',
      dataIndex: 'clienteId',
      key: 'clienteId',
    },
    {
      title: 'Empleado ID',
      dataIndex: 'empleadoId',
      key: 'empleadoId',
    },
    {
      title: 'Domiciliario ID',
      dataIndex: 'domiciliarioId',
      key: 'domiciliarioId',
    },
    {
      title: 'Fecha de Pedido',
      dataIndex: 'fechaPedido',
      key: 'fechaPedido',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Fecha de Actualización',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Acciones',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
    },
  ]);
  
  const fetchPedidos = async (token) => {
    return await getPedidos(token);
  };
  
  const handleDeletePedido = async (id, token) => {
    return await deletePedido(id, token);
  };
  
  const handleUpdatePedido = async (id, pedidoData, token) => {
    return await updatePedido(id, pedidoData, token);
  };
  
  const handleCreatePedido = async (pedidoData, token) => {
    return await createPedido(pedidoData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>