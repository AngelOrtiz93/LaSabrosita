//main.js

// Importa la función createApp desde Vue para crear una nueva instancia de la aplicación
import { createApp } from 'vue'; 

// Importa el componente principal de la aplicación, App.vue
import App from './App.vue'; 

// Importa el archivo de configuración de rutas que has definido en tu proyecto
import router from './router'; 

// Importa los estilos de Ant Design para que estén disponibles en toda la aplicación
import 'ant-design-vue/dist/antd.esm'; 

// Importa la biblioteca Ant Design Vue para usar sus componentes de interfaz de usuario
import Antd from 'ant-design-vue'; 

// Crea una nueva instancia de la aplicación usando el componente App como raíz
const app = createApp(App); 

// Asocia el enrutador (router) con la aplicación para gestionar la navegación entre páginas
app.use(router); 

// Asocia Ant Design Vue con la aplicación para que los componentes de Ant Design estén disponibles
app.use(Antd); 

// Monta la aplicación en el elemento HTML con el id 'app'
app.mount('#app');
