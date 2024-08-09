<template>
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Panel de Administración</h1>
      </header>
      <main class="dashboard-main">
        <section class="dashboard-stats">
          <div class="stat-card">
            <h3>Total de Noticias</h3>
            <p>{{ noticias.length }}</p>
          </div>
          <!-- Puedes añadir más tarjetas de estadísticas aquí -->
        </section>
        <section class="dashboard-news">
          <h2>Noticias Diarias</h2>
          <div v-if="loading" class="loading">Cargando noticias...</div>
          <div v-if="error" class="error">Error al cargar las noticias: {{ error }}</div>
          <div v-if="!loading && noticias.length === 0">No hay noticias disponibles.</div>
          <div v-if="!loading && noticias.length > 0">
            <ul class="news-list">
              <li v-for="noticia in noticias" :key="noticia.id" class="news-item">
                <div class="news-content">
                  <h3>{{ noticia.titulo }}</h3>
                  <p>{{ noticia.contenido }}</p>
                </div>
                <span class="news-date">{{ noticia.fecha }}</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Datos estáticos para las noticias
  const noticias = ref([
    {
      id: '1',
      titulo: 'Noticia 1',
      contenido: 'Contenido de la noticia 1.',
      fecha: '2024-08-01',
    },
    {
      id: '2',
      titulo: 'Noticia 2',
      contenido: 'Contenido de la noticia 2.',
      fecha: '2024-08-02',
    },
    {
      id: '3',
      titulo: 'Noticia 3',
      contenido: 'Contenido de la noticia 3.',
      fecha: '2024-08-03',
    },
  ]);
  
  const loading = ref(false);
  const error = ref(null);
  
  // Simular la carga de datos
  const fetchNoticias = async () => {
    try {
      loading.value = true;
      // Simular un retraso para la carga
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      error.value = err.message || 'Error desconocido';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchNoticias);
  </script>
  
  <style scoped>
  </style>
  