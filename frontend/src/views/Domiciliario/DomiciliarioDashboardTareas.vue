<template>
    <div class="tasks-container">
      <header>
        <h2>Tareas Asignadas</h2>
      </header>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-table :data-source="tasks" :columns="columns" row-key="id">
            <template #actions="{ record }">
              <a-button @click="verDetalles(record)" type="link">Ver Detalles</a-button>
              <a-button v-if="!record.completado" @click="marcarComoCompletada(record.id)" type="primary" class="boton-completar">
                Marcar como Completada
              </a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-modal v-model:visible="modalDetallesVisible" title="Detalles de la Tarea" @ok="cerrarModalDetalles">
        <p><strong>Título:</strong> {{ tareaSeleccionada.titulo }}</p>
        <p><strong>Descripción:</strong> {{ tareaSeleccionada.descripcion }}</p>
        <p><strong>Fecha de Creación:</strong> {{ tareaSeleccionada.fechaCreacion }}</p>
        <p><strong>Estado:</strong> {{ tareaSeleccionada.completado ? 'Completada' : 'Pendiente' }}</p>
      </a-modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo para las tareas
  const tasks = ref([
    { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', fechaCreacion: '2024-07-30', completado: false },
    { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', fechaCreacion: '2024-07-29', completado: true },
    { id: 3, titulo: 'Tarea 3', descripcion: 'Descripción de la tarea 3', fechaCreacion: '2024-07-28', completado: false },
  ]);
  
  const tareaSeleccionada = ref({});
  const modalDetallesVisible = ref(false);
  
  // Definición de columnas para la tabla
  const columns = [
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'fechaCreacion',
      key: 'fechaCreacion',
    },
    {
      title: 'Estado',
      dataIndex: 'completado',
      key: 'completado',
      customRender: ({ text }) => (text ? 'Completada' : 'Pendiente'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }
    },
  ];
  
  const verDetalles = (tarea) => {
    tareaSeleccionada.value = tarea;
    modalDetallesVisible.value = true;
  };
  
  const cerrarModalDetalles = () => {
    modalDetallesVisible.value = false;
  };
  
  const marcarComoCompletada = (id) => {
    // Actualiza el estado de la tarea localmente
    const tarea = tasks.value.find(t => t.id === id);
    if (tarea) {
      tarea.completado = true;
    }
  };
  </script>
  
  <style scoped>
  .tasks-container {
    padding: 20px;
  }
  
  header h2 {
    margin-bottom: 20px;
  }
  
  .boton-completar {
    margin-left: 10px;
  }
  </style>
  