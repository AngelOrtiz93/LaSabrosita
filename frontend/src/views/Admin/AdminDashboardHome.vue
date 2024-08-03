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
  .dashboard-container {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
  }
  
  .dashboard-header {
    background-color: #003366;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .dashboard-main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .dashboard-stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .stat-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
    max-width: 300px;
  }
  
  .stat-card h3 {
    margin: 0;
    font-size: 1.2em;
  }
  
  .stat-card p {
    font-size: 2em;
    margin: 0;
  }
  
  .dashboard-news {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-news h2 {
    margin-top: 0;
    font-size: 1.5em;
  }
  
  .news-list {
    list-style-type: none;
    padding: 0;
  }
  
  .news-item {
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }
  
  .news-item:last-child {
    border-bottom: none;
  }
  
  .news-content {
    margin-bottom: 10px;
  }
  
  .news-date {
    display: block;
    font-size: 0.9em;
    color: #666;
  }
  
  .loading, .error {
    text-align: center;
    font-size: 1.2em;
    padding: 10px;
  }
  
  .loading {
    color: #007bff;
  }
  
  .error {
    color: #dc3545;
  }
  </style>
  