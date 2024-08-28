<template>
  <a-layout>
    <a-row gutter="16">
      <!-- Sección de Pedidos -->
      <a-col :span="8">
        <h2>Mis Pedidos</h2>
        <a-collapse accordion>
          <a-collapse-panel
            v-for="pedido in pedidos"
            :key="pedido.id"
            :header="'Pedido #' + pedido.id"
          >
            <p><strong>Fecha del Pedido:</strong> {{ new Date(pedido.fechaPedido).toLocaleDateString() }}</p>
            <p><strong>Estado:</strong> {{ pedido.estado }}</p>

            <!-- Botón para eliminar pedido con confirmación -->
            <a-popconfirm
              title="¿Estás seguro de que deseas eliminar este pedido?"
              okText="Sí"
              cancelText="No"
              @confirm="eliminarPedido(pedido.id)"
            >
              <a-button type="danger" style="margin-bottom: 10px;">Eliminar Pedido</a-button>
            </a-popconfirm>

            <!-- Botón para abrir modal con detalles del pedido -->
            <a-button type="default" @click="showDetailsModal(pedido)">
              Ver Detalles
            </a-button>
          </a-collapse-panel>
        </a-collapse>
      </a-col>

      <!-- Sección de Productos -->
      <a-col :span="16">
        <h2>Nuestros Productos</h2>
        <a-row :gutter="16">
          <a-col :span="8" v-for="product in products" :key="product.id">
            <a-card :title="product.nombre" class="product-card">
              <img :src="product.imagenUrl" alt="Imagen del Producto" class="product-image" />
              <p>{{ product.descripcion }}</p>
              <p>$ {{ product.precio | currency }}</p>
              <a-button type="primary" @click="addToCart(product)">Agregar al Carrito</a-button>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- Botón para abrir el modal del carrito con ícono -->
    <a-button
      type="primary"
      @click="isModalVisible = true"
      class="cart-button"
      shape="circle"
    >
      <ShoppingCartOutlined />
      <span class="cart-count">{{ cartItems.length }}</span>
    </a-button>

    <!-- Modal para el carrito de compras -->
    <a-modal
      v-model:visible="isModalVisible"
      title="Carrito de Compras"
      @ok="checkout"
      @cancel="isModalVisible = false"
      width="40%"
      :footer="null"
      class="cart-modal"
    >
      <template v-if="cartItems.length > 0">
        <div class="cart-content">
          <ul class="cart-item-list">
            <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
              <img :src="item.product.imagenUrl" alt="Imagen del Artículo en el Carrito" class="cart-item-image" />
              <div class="cart-item-info">
                <p class="cart-item-name">{{ item.product.nombre }}</p>
                <p>Cantidad: {{ item.quantity }}</p>
                <p>Subtotal: $ {{ (item.quantity * item.product.precio).toFixed(2) }}</p>
                <a-button type="danger" @click="removeFromCart(item.product)">Eliminar</a-button>
              </div>
            </li>
          </ul>
          <div class="total-price">
            <p><strong>Total:</strong> $ {{ totalPrice.toFixed(2) }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <p>Tu carrito está vacío. Agrega productos para empezar a comprar.</p>
      </template>
      <div class="modal-footer">
        <a-button @click="isModalVisible = false" class="cancel-button">Cancelar</a-button>
        <a-button @click="checkout" type="primary" class="checkout-button">Comprar</a-button>
      </div>
    </a-modal>

    <!-- Modal para detalles del pedido -->
    <a-modal
      v-model:visible="isDetailsModalVisible"
      title="Detalles del Pedido"
      @ok="resetDetailsModal"
      @cancel="resetDetailsModal"
      width="80%"
    >
      <template v-if="selectedPedido">
        <p><strong>Número de Pedido:</strong> {{ selectedPedido.id }}</p>
        <p><strong>Fecha del Pedido:</strong> {{ new Date(selectedPedido.fechaPedido).toLocaleDateString() }}</p>
        <p><strong>Estado:</strong> {{ selectedPedido.estado }}</p>
        <a-table :columns="detailColumns" :data-source="selectedPedido.DetallePedidos" rowKey="id" />
      </template>
    </a-modal>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';

// API URLs y variables
const API_URL_PEDIDOS = 'http://localhost:3001/pedidos';
const API_URL_PRODUCTOS = 'http://localhost:3001/productos';
const products = ref([]);
const cartItems = ref([]);
const pedidos = ref([]);
const isModalVisible = ref(false);
const isDetailsModalVisible = ref(false);
const selectedPedido = ref(null);
const token = localStorage.getItem('token');

// Cálculos y funciones para manejar datos
const getUserId = () => localStorage.getItem('userId');

// Funciones para manejar productos y pedidos
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL_PRODUCTOS, { headers: { Authorization: `Bearer ${token}` } });
    products.value = response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
};

const getPedidos = async () => {
  try {
    const response = await axios.get(API_URL_PEDIDOS, { headers: { Authorization: `Bearer ${token}` } });
    pedidos.value = response.data.filter(pedido => pedido.usuarioId === getUserId());
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
  }
};

const showDetailsModal = async (pedido) => {
  try {
    const response = await axios.get(`${API_URL_PEDIDOS}/${pedido.id}`, { headers: { Authorization: `Bearer ${token}` } });
    selectedPedido.value = response.data;
    isDetailsModalVisible.value = true;
  } catch (error) {
    console.error('Error al obtener detalles del pedido:', error);
  }
};

onMounted(async () => {
  await getProducts();
  await getPedidos();
});

// Funciones para manejar el carrito
const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
};

const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.product.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
};

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity * item.product.precio, 0);
});

const checkout = async () => {
  if (cartItems.value.length > 0) {
    try {
      const response = await axios.post(API_URL_PEDIDOS, {
        detalles: cartItems.value.map(item => ({
          productoId: item.product.id,
          cantidad: item.quantity,
          precioUnitario: item.product.precio,
        })),
        usuarioId: getUserId(),
      }, { headers: { Authorization: `Bearer ${token}` } });

      notification.success({
        message: 'Éxito',
        description: `Pedido creado. Tu ID de pedido es ${response.data.id}. Estado: ${response.data.estado}.`,
        duration: 5,
      });

      cartItems.value = [];
      isModalVisible.value = false;
      await getPedidos(); // Actualizar la lista de pedidos después del checkout
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Hubo un problema al crear el pedido. Inténtalo nuevamente.',
        duration: 4,
      });
    }
  } else {
    notification.warning({
      message: 'Carrito Vacío',
      description: 'No puedes proceder con el checkout porque tu carrito está vacío.',
      duration: 4,
    });
  }
};

// Función para eliminar un pedido
const eliminarPedido = async (orderId) => {
  try {
    await axios.delete(`${API_URL_PEDIDOS}/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
    notification.success({
      message: 'Éxito',
      description: 'El pedido ha sido eliminado.',
      duration: 5,
    });
    await getPedidos();
  } catch (error) {
    notification.error({
      message: 'Error',
      description: 'Hubo un problema al eliminar el pedido. Inténtalo nuevamente.',
      duration: 4,
    });
  }
};

// Función para resetear el modal de detalles
const resetDetailsModal = () => {
  isDetailsModalVisible.value = false;
  selectedPedido.value = null;
};

// Columnas para los detalles del pedido
const detailColumns = [
  {
    title: 'Producto',
    dataIndex: 'producto.nombre',
    key: 'producto.nombre',
  },
  {
    title: 'Cantidad',
    dataIndex: 'cantidad',
    key: 'cantidad',
  },
  {
    title: 'Precio Unitario',
    dataIndex: 'precioUnitario',
    key: 'precioUnitario',
  },
  {
    title: 'Subtotal',
    key: 'subtotal',
    render: (text, record) => `$ ${(record.cantidad * record.precioUnitario).toFixed(2)}`,
  },
];
</script>

<style scoped>
.cart-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
}

.cart-modal {
  padding: 16px;
}

.cart-item-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.cart-item-image {
  width: 100px;
  margin-right: 16px;
}

.cart-item-info {
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.cancel-button {
  background-color: #f0f0f0;
}

.checkout-button {
  background-color: #1890ff;
  color: white;
}

.product-card {
  text-align: center;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 8px;
}

.total-price {
  text-align: right;
  font-size: 18px;
  margin-top: 16px;
}
</style>
