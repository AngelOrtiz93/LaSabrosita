<template>
    <a-table
      :data-source="data"
      :columns="columns"
      :row-key="record => record.id"
      :loading="loading"
      bordered
    >
      <template #actions="{ record }">
        <a-button @click="editRecord(record)">Editar</a-button>
        <a-button type="danger" @click="deleteRecord(record.id)">Eliminar</a-button>
      </template>
    </a-table>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    apiUrl: String,
    columns: Array,
    token: String,
    fetchDataFn: Function,
    deleteRecordFn: Function,
    updateRecordFn: Function,
    createRecordFn: Function,
  });
  
  const data = ref([]);
  const loading = ref(false);
  
  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await props.fetchDataFn(props.token);
      data.value = response.data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const deleteRecord = async (id) => {
    try {
      await props.deleteRecordFn(id, props.token);
      data.value = data.value.filter(item => item.id !== id);
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };
  
  const editRecord = (record) => {
    // Implementar lógica de edición si es necesario
    // Usar props.updateRecordFn para actualizar el registro
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  /* Añadir estilos específicos si es necesario */
  </style>
  