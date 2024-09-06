// Importa utilidades de Node.js para manejar rutas de archivos y URLs
import { fileURLToPath, URL } from 'node:url';

// Importa la función defineConfig de Vite para definir la configuración del proyecto
import { defineConfig } from 'vite';

// Importa el plugin Vue para Vite, necesario para procesar archivos .vue
import vue from '@vitejs/plugin-vue';

// Importa el plugin Vue JSX para Vite, que permite escribir JSX en componentes Vue
import vueJsx from '@vitejs/plugin-vue-jsx';

// Exporta la configuración del proyecto utilizando defineConfig para una mejor autocompletación en editores de texto
export default defineConfig({
  // Define los plugins que se utilizarán en el proyecto
  plugins: [
    vue(),     // Agrega soporte para componentes Vue
    vueJsx(),  // Habilita el uso de JSX en Vue
  ],
  // Configuración de resolución de módulos
  resolve: {
    alias: {
      // Crea un alias '@' que apunta al directorio 'src' para facilitar las importaciones
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Configura la URL base de la aplicación, ajusta esta configuración si la aplicación no está en la raíz del servidor
  base: '', 
});
