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
            <!-- Controles de cantidad -->
            <div class="quantity-controls">
              <a-button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</a-button>
              <a-input-number v-model="item.quantity" @change="updateQuantity(item)" min="1" />
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

    <!-- Tabla de detalles del pedido -->
    <a-table :columns="detailColumns" :data-source="selectedPedido.DetallePedidos" rowKey="id" />

    <!-- Mostrar subtotal y total del pedido -->
    <div class="total-price">
      <p><strong>Subtotal de Productos:</strong> ${{ calcularSubtotalPedido(selectedPedido.DetallePedidos).toFixed(2) }}</p>
      <p><strong>Total del Pedido:</strong> ${{ calcularTotalPedido(selectedPedido.DetallePedidos).toFixed(2) }}</p>
    </div>
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
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []); // Recuperar el carrito del localStorage
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

// Calcula el subtotal de cada producto en el pedido
const calcularSubtotalPedido = (detallePedidos) => {
  return detallePedidos.reduce((subtotal, detalle) => subtotal + detalle.cantidad * detalle.precioUnitario, 0);
};

// Calcula el total del pedido
const calcularTotalPedido = (detallePedidos) => {
  return calcularSubtotalPedido(detallePedidos); // Aquí asumimos que el total es igual al subtotal
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
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value)); // Guardar el carrito en localStorage
};

// Funciones para manejar el carrito
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
    item.quantity = 1; // Prevención de valores negativos o cero
  }
  updateCartTotal();
};

const updateCartTotal = () => {
  totalPrice.value = cartItems.value.reduce((total, item) => total + item.quantity * item.product.precio, 0);
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value)); // Guardar el carrito actualizado en localStorage
};

onMounted(() => {
  updateCartTotal(); // Inicializa el cálculo del total
});

const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.product.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value)); // Actualizar localStorage al eliminar un producto
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
      localStorage.removeItem('cartItems'); // Limpiar el carrito en localStorage
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
/* Estilos para la tarjeta del producto */
.product-card {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Estilos para el botón del carrito */
.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
  background-color: #4caf50; /* Color del botón */
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

.cart-button:hover {
  background-color: #45a049; /* Color al pasar el mouse */
}

/* Estilos para el contenido del carrito */
.cart-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #fff; /* Fondo blanco */
}

/* Estilos para los elementos del carrito */
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item:last-child {
  border-bottom: none; /* Sin borde en el último elemento */
}

.cart-item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-info {
  flex-grow: 1;
}

/* Estilos para los controles de cantidad */
.quantity-controls {
  display: flex;
  align-items: center;
}

.total-price {
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px; /* Tamaño de fuente del total */
}

/* Estilos para el modal */
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button {
  margin-right: 10px;
  background-color: #f44336; /* Color rojo para el botón de cancelar */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
}

.checkout-button {
  background-color: #4caf50; /* Color verde para el botón de checkout */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
}

/* Hover effects for buttons */
.cancel-button:hover {
  background-color: #d32f2f; /* Color más oscuro para el botón de cancelar */
}

.checkout-button:hover {
  background-color: #45a049; /* Color más oscuro para el botón de checkout */
}
</style>

