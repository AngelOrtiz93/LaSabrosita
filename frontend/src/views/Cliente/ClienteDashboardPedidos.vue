<template>
  <a-layout>
    <a-row gutter="16">
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
            <a-popconfirm
              title="¿Estás seguro de que deseas eliminar este pedido?"
              okText="Sí"
              cancelText="No"
              @confirm="eliminarPedido(pedido.id)"
            >
              <a-button type="danger" style="margin-bottom: 10px;">Eliminar Pedido</a-button>
            </a-popconfirm>
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

    <a-button
      type="primary"
      @click="isModalVisible = true"
      class="cart-button"
      shape="circle"
    >
      <ShoppingCartOutlined />
      <span class="cart-count">{{ cartItems.length }}</span>
    </a-button>

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
                <div class="quantity-controls">
                  <a-button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</a-button>
                  <a-button @click="increaseQuantity(item)">+</a-button>
                </div>
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
        <p class="valor-total"><strong>Valor Total:</strong> ${{ selectedPedido.total.toFixed(2) }}</p>
      </template>
    </a-modal>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';

const API_URL_PEDIDOS = 'http://localhost:3001/pedidos';
const API_URL_PRODUCTOS = 'http://localhost:3001/productos';

const products = ref([]);
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);
const pedidos = ref([]);
const isModalVisible = ref(false);
const isDetailsModalVisible = ref(false);
const selectedPedido = ref(null);
const token = localStorage.getItem('token');
const totalPrice = ref(0);

const getUserId = () => localStorage.getItem('userId');

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

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
};

const increaseQuantity = (item) => {
  item.quantity += 1;
  updateCartTotal();
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
    updateCartTotal();
  }
};

const updateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  updateCartTotal();
};

const updateCartTotal = () => {
  totalPrice.value = cartItems.value.reduce((total, item) => total + item.quantity * item.product.precio, 0);
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
};

onMounted(() => {
  updateCartTotal();
});

const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.product.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  }
};

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
      }, { headers: { Authorization: token } });

      notification.success({
        message: 'Éxito',
        description: `Pedido creado. Tu ID de pedido es ${response.data.id}. Estado: ${response.data.estado}.`,
        duration: 5,
      });

      cartItems.value = [];
      localStorage.removeItem('cartItems');
      isModalVisible.value = false;
      await getPedidos();
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

const resetDetailsModal = () => {
  isDetailsModalVisible.value = false;
  selectedPedido.value = null;
};

const detailColumns = [
  {
    title: 'Producto',
    dataIndex: ['Producto', 'nombre'],
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
    render: (value) => `S/. ${value}`,
  },
];

</script>


<style scoped>
.product-card {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  background-color: #fff;
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
}

.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
}

.cart-button:hover {
  background-color: #45a049;
}

.cart-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-info {
  flex-grow: 1;
}

.cart-count {
  margin-left: 5px;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls a-button {
  margin: 0 5px;
}

.total-price {
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
}
.valor-total {
  font-size: 20px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Texto en negrita */
  color: #ff5722; /* Color destacado */
  text-align: right; /* Alinear a la derecha */
  margin-top: 20px; /* Espaciado superior */
  border-top: 2px solid #e0e0e0; /* Línea superior */
  padding-top: 10px; /* Espaciado después de la línea */
}


.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
