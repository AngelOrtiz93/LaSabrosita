<template>
    <div>
      <h1>Administrar Permisos</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchPermisos"
        :deleteRecordFn="handleDeletePermiso"
        :updateRecordFn="handleUpdatePermiso"
        :createRecordFn="handleCreatePermiso"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getPermisos, deletePermiso, updatePermiso, createPermiso } from '@/api/permission';
  
  // URL de la API de permisos
  const apiUrl = 'http://localhost:3001/permissions';
  
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
    },
  ]);
  
  const fetchPermisos = async (token) => {
    return await getPermisos(token);
  };
  
  const handleDeletePermiso = async (id, token) => {
    return await deletePermiso(id, token);
  };
  
  const handleUpdatePermiso = async (id, permisoData, token) => {
    return await updatePermiso(id, permisoData, token);
  };
  
  const handleCreatePermiso = async (permisoData, token) => {
    return await createPermiso(permisoData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  