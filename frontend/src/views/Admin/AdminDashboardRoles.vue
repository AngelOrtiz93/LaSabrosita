<template>
    <div>
      <h1>Administrar Roles</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchRoles"
        :deleteRecordFn="handleDeleteRole"
        :updateRecordFn="handleUpdateRole"
        :createRecordFn="handleCreateRole"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getRoles, deleteRole, updateRole, createRole } from '@/api/roles';
  
  // URL de la API de roles
  const apiUrl = 'http://localhost:3001/roles';
  
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
  
  const fetchRoles = async (token) => {
    return await getRoles(token);
  };
  
  const handleDeleteRole = async (id, token) => {
    return await deleteRole(id, token);
  };
  
  const handleUpdateRole = async (id, roleData, token) => {
    return await updateRole(id, roleData, token);
  };
  
  const handleCreateRole = async (roleData, token) => {
    return await createRole(roleData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  