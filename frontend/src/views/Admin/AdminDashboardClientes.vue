<template>
    <div>
      <h1>Administrar Clientes</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchClientes"
        :deleteRecordFn="handleDeleteCliente"
        :updateRecordFn="handleUpdateCliente"
        :createRecordFn="handleCreateCliente"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getClientes, deleteCliente, updateCliente, createCliente } from '@/api/cliente';
  
  // URL de la API de clientes
  const apiUrl = 'http://localhost:3001/clientes';
  
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
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
  },
  {
    title: 'Correo Electrónico',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
  },
  {
    title: 'Dirección',
    dataIndex: 'direccion',
    key: 'direccion',
  },
  {
    title: 'Fecha de Registro',
    dataIndex: 'fechaRegistro',
    key: 'fechaRegistro',
  },
  {
    title: 'Acciones',
    key: 'actions',
    scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
  },
]);
  
  const fetchClientes = async (token) => {
    return await getClientes(token);
  };
  
  const handleDeleteCliente = async (id, token) => {
    return await deleteCliente(id, token);
  };
  
  const handleUpdateCliente = async (id, clienteData, token) => {
    return await updateCliente(id, clienteData, token);
  };
  
  const handleCreateCliente = async (clienteData, token) => {
    return await createCliente(clienteData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  