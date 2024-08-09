<template>
  <a-table :columns="columns" :dataSource="dataSource">
    <template v-slot:[`roles`]="{ record }">
      {{ record.roles && record.roles.map(role => role.name).join(', ') || 'No roles' }}
    </template>
    <template v-slot:actions="{ record }">
      <!-- Aquí podrías agregar botones para editar, eliminar, etc. -->
      <a-button @click="edit(record)">Editar</a-button>
      <a-button @click="remove(record)">Eliminar</a-button>
    </template>
  </a-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  columns: Array,
  fetchDataFn: Function,
  deleteRecordFn: Function,
  updateRecordFn: Function,
  createRecordFn: Function,
  token: String
});

const dataSource = ref([]);

const fetchData = async () => {
  dataSource.value = await props.fetchDataFn(props.token);
};

onMounted(() => {
  fetchData();
});

const edit = (record) => {
  // Implementa la lógica para editar el registro
  console.log('Editando:', record);
};

const remove = (record) => {
  // Implementa la lógica para eliminar el registro
  console.log('Eliminando:', record);
};
</script>
