<template>
    <div>
      <h1>Administrar Domiciliarios</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchDomiciliarios"
        :deleteRecordFn="handleDeleteDomiciliario"
        :updateRecordFn="handleUpdateDomiciliario"
        :createRecordFn="handleCreateDomiciliario"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getDomiciliarios, deleteDomiciliario, updateDomiciliario, createDomiciliario } from '@/api/domiciliario';
  
  // URL de la API de domiciliarios
  const apiUrl = 'http://localhost:3001/domiciliarios';
  
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
      title: 'Fecha de Contratación',
      dataIndex: 'fechaContratacion',
      key: 'fechaContratacion',
    },
    {
      title: 'Acciones',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
    },
  ]);
  
  const fetchDomiciliarios = async (token) => {
    return await getDomiciliarios(token);
  };
  
  const handleDeleteDomiciliario = async (id, token) => {
    return await deleteDomiciliario(id, token);
  };
  
  const handleUpdateDomiciliario = async (id, domiciliarioData, token) => {
    return await updateDomiciliario(id, domiciliarioData, token);
  };
  
  const handleCreateDomiciliario = async (domiciliarioData, token) => {
    return await createDomiciliario(domiciliarioData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  