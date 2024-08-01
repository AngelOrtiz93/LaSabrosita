<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Bienvenidos a La Sabrosita</h1>
        <p>Donde los sabores cobran vida. Disfruta de nuestras deliciosas comidas rápidas en el sitio o a domicilio.</p>
        <button class="explore-button" @click="exploreMenu">Explora Nuestro Menú</button>
      </div>
    </section>

    <section class="about-section">
      <h2>¿Quiénes Somos?</h2>
      <p>La Sabrosita es un restaurante de comida rápida comprometido con ofrecer la mejor experiencia gastronómica a nuestros clientes. Nos especializamos en hamburguesas, papas fritas, pollo frito y más, todo preparado con ingredientes frescos y de alta calidad.</p>
    </section>

    <section class="location-section">
      <h2>Nuestra Ubicación</h2>
      <p>Visítanos en nuestra ubicación principal para disfrutar de una experiencia culinaria inigualable:</p>
      <address>
        Calle 123, Ciudad, País<br>
        Teléfono: (123) 456-7890<br>
        Email: info@lasabrosita.com
      </address>
      <div class="map-container">
        <!-- Ejemplo de mapa integrado (usando un mapa de Google Maps embebido) -->
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4235895773236!2d144.96312331515346!3d-37.81421597975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577dcf1f0b1a7b0!2sFlinders%20St%20Station!5e0!3m2!1sen!2sus!4v1618394576470!5m2!1sen!2sus"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>

    <section class="clients-section">
      <h2>Nuestros Clientes</h2>
      <div class="client-testimonials">
        <div class="testimonial" v-for="client in clients" :key="client.id">
          <img :src="client.image" alt="Cliente" class="client-image" />
          <blockquote>
            "{{ client.testimonial }}"
          </blockquote>
          <p class="client-name">- {{ client.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const clients = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    testimonial: '¡La mejor comida rápida que he probado! La Sabrosita nunca decepciona.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'María López',
    testimonial: 'Servicio rápido y comida deliciosa. ¡Mis hijos adoran las hamburguesas!',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    testimonial: 'Excelente atención al cliente y una experiencia gastronómica inolvidable.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
]);

const router = useRouter();

const exploreMenu = () => {
  router.push('/cliente-dashboard/products');
};
</script>

<style scoped>
.home-container {
  font-family: Arial, sans-serif;
}

.hero-section {
  background-image: url('@/assets/fondo.jpg'); /* Cambia esta ruta por la ubicación de tu imagen */
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  text-align: center;
  color: white;
}


.hero-content {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.explore-button {
  background-color: #ffcc00;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.explore-button:hover {
  background-color: #e6b800;
}

.about-section, .location-section, .clients-section {
  padding: 40px 20px;
  text-align: center;
}

h2 {
  color: #1890ff;
  margin-bottom: 20px;
}

.map-container {
  margin: 20px 0;
}

.client-testimonials {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.testimonial {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.client-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.client-name {
  font-weight: bold;
  color: #333;
}

blockquote {
  font-style: italic;
  color: #555;
}
</style>
