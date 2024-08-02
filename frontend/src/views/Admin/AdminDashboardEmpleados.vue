<template>
    <div>
      <h1>Administrar Empleados</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchEmpleados"
        :deleteRecordFn="handleDeleteEmpleado"
        :updateRecordFn="handleUpdateEmpleado"
        :createRecordFn="handleCreateEmpleado"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getEmpleados, deleteEmpleado, updateEmpleado, createEmpleado } from '@/api/empleado';
  
  // URL de la API de empleados
  const apiUrl = 'http://localhost:3001/empleados';
  
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
    dataIndex: 'createdAt', // Debe coincidir con la respuesta de la API
    key: 'createdAt',
  },
  {
    title: 'Fecha de Actualizacion',
    dataIndex: 'updatedAt', // Debe coincidir con la respuesta de la API
    key: 'updatedAt',
  },
  {
    title: 'Rol',
    dataIndex: 'roleId', // Debe coincidir con la respuesta de la API
    key: 'roleId',
  },
  {
    title: 'Acciones',
    key: 'actions',
    scopedSlots: { customRender: 'actions' },
  },
]);

  

const fetchEmpleados = async (token) => {
    return await getEmpleados(token);
  };
  
  const handleDeleteEmpleado = async (id, token) => {
    return await deleteEmpleado(id, token);
  };
  
  const handleUpdateEmpleado = async (id, empleadoData, token) => {
    return await updateEmpleado(id, empleadoData, token);
  };
  
  const handleCreateEmpleado = async (empleadoData, token) => {
    return await createEmpleado(empleadoData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  