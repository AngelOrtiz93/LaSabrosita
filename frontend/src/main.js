import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.esm'; // Importa los estilos de Ant Design
import Antd from 'ant-design-vue'; // Importa Ant Design Vue

const app = createApp(App);
app.use(router);
app.use(Antd); // Usa Ant Design Vue
app.mount('#app');
