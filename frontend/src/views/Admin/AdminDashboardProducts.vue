<template>
    <div>
      <h1>Administrar Productos</h1>
      <CrudTable 
        :apiUrl="apiUrl"
        :columns="columns"
        :token="token"
        :fetchDataFn="fetchProducts"
        :deleteRecordFn="handleDeleteProduct"
        :updateRecordFn="handleUpdateProduct"
        :createRecordFn="handleCreateProduct"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CrudTable from '@/components/Utils/CrudTable.vue';
  import { getProducts, deleteProduct, updateProduct, createProduct } from '@/api/producto';
  
  // URL de la API de productos
  const apiUrl = 'http://localhost:3001/products';
  
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
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'price',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'category',
    },
    {
      title: 'Acciones',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }, // Usar ranura personalizada
    },
  ]);
  
  const fetchProducts = async (token) => {
    return await getProducts(token);
  };
  
  const handleDeleteProduct = async (id, token) => {
    return await deleteProduct(id, token);
  };
  
  const handleUpdateProduct = async (id, productData, token) => {
    return await updateProduct(id, productData, token);
  };
  
  const handleCreateProduct = async (productData, token) => {
    return await createProduct(productData, token);
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  