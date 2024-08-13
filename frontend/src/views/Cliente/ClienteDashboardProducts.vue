<template>
  <div>
    <!-- Botón para abrir el modal del carrito -->
    <a-button
      type="primary"
      @click="isModalVisible = true"
      class="cart-button"
    >
      Carrito ({{ cartItems.length }})
    </a-button>
    <a-button
  type="default"
  @click="isOrdersModalVisible = true"
  class="view-orders-button"
>
  Ver Pedidos Realizados
</a-button>

    <h2>Nuestros Productos</h2>
    <a-row :gutter="16">
      <a-col :span="8" v-for="product in products" :key="product.id">
        <a-card :title="product.nombre">
          <img :src="product.imagenUrl" alt="Imagen del Producto" class="product-image"/>
          <p>{{ product.descripcion }}</p>
          <p>$ {{ product.precio | currency }}</p>
          <a-button
            type="primary"
            @click="addToCart(product)"
          >
            Agregar al Carrito
          </a-button>
        </a-card>
      </a-col>
    </a-row>

    <!-- Modal para mostrar los artículos del carrito -->
    <a-modal
      v-model:visible="isModalVisible"
      title="Carrito de Compras"
      @ok="checkout"
      @cancel="isModalVisible = false"
      width="600px"
      :footer="null"
    >
      <template v-if="cartItems.length > 0">
        <ul class="cart-item-list">
          <li v-for="item in cartItems" :key="item.product.id" class="cart-item">
            <img
              :src="item.product.imagenUrl"
              alt="Imagen del Artículo en el Carrito"
              class="cart-item-image"
            />
            <div class="cart-item-info">
              <p>{{ item.product.nombre }}</p>
              <p>Cantidad: {{ item.quantity }}</p>
              <p>Subtotal: $ {{ (item.quantity * item.product.precio).toFixed(2) }}</p>
              <a-button
                type="danger"
                @click="removeFromCart(item.product)"
              >
                Eliminar
              </a-button>
            </div>
          </li>
        </ul>
        <div class="total-price">
          <p>Total: $ {{ totalPrice.toFixed(2) }}</p>
        </div>
      </template>
      <template v-else>
        <p>Tu carrito está vacío. Agrega productos para empezar a comprar.</p>
      </template>
      <div class="modal-footer">
        <a-button @click="isModalVisible = false" class="cancel-button">
          Cancelar
        </a-button>
        <a-button @click="checkout" type="primary" class="checkout-button">
          Comprar
        </a-button>
      </div>
    </a-modal>

    <!-- Modal para mostrar los pedidos realizados -->
    <a-modal
      v-model:visible="isOrdersModalVisible"
      title="Mis Pedidos"
      width="800px"
      :footer="null"
    >
      <div class="search-container">
        <a-input
          v-model="searchOrderId"
          placeholder="Buscar pedido por ID"
          @change="fetchOrderById"
          style="margin-bottom: 20px;"
        />
      </div>

      <template v-if="filteredOrders.length > 0">
        <a-list
          item-layout="vertical"
          :data-source="filteredOrders"
          bordered
        >
          <a-list-item
            v-for="order in filteredOrders"
            :key="order.id"
          >
            <a-list-item-meta
              :title="'Pedido #' + order.id"
              :description="'Fecha: ' + new Date(order.fechaPedido).toLocaleDateString()"
            />
            <a-list-item-content>
              <ul>
                <li v-for="detail in order.detalles" :key="detail.id">
                  Producto: {{ detail.producto.nombre }} - Cantidad: {{ detail.cantidad }} - Precio: $ {{ detail.precioUnitario }}
                </li>
              </ul>
              <p>Estado: {{ order.estado }}</p>
            </a-list-item-content>
          </a-list-item>
        </a-list>
      </template>
      <template v-else>
        <p>No se encontraron pedidos.</p>
      </template>
      <div class="modal-footer">
        <a-button @click="isOrdersModalVisible = false" class="cancel-button">
          Cerrar
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { notification } from 'ant-design-vue';

const API_URL_PEDIDOS = 'http://localhost:3001/pedidos'; // Ajusta la URL según tu configuración
const API_URL_PRODUCTOS = 'http://localhost:3001/productos'; // Ajusta la URL según tu configuración

const products = ref([]);
const cartItems = ref([]);
const isModalVisible = ref(false);
const isOrdersModalVisible = ref(false);
const orders = ref([]);
const searchOrderId = ref('');
const filteredOrders = computed(() => {
  return orders.value.filter(order => order.id.toString().includes(searchOrderId.value));
});

// Función para obtener el ID del usuario desde el local storage
const getUserId = () => {
  return localStorage.getItem('userId');
};

const token = localStorage.getItem('token');

// Funciones de API
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL_PRODUCTOS, {
      headers: { Authorization: token } // Aquí está el token sin 'Bearer'
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

const createPedido = async (pedidoData) => {
  try {
    const response = await axios.post(API_URL_PEDIDOS, pedidoData, {
      headers: { Authorization: token } // Aquí también el token sin 'Bearer'
    });

    // Mostrar notificación de éxito
    notification.success({
      message: 'Éxito',
      description: `Pedido creado. Tu ID de pedido es ${response.data.id}. Estado: ${response.data.estado}.`,
      duration: 5
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    
    // Mostrar notificación de error
    notification.error({
      message: 'Error',
      description: 'Hubo un problema al crear el pedido. Inténtalo nuevamente.',
      duration: 4
    });

    throw error;
  }
};

const getPedidos = async () => {
  try {
    const response = await axios.get(API_URL_PEDIDOS, {
      headers: { Authorization: token } // Incluye el token sin 'Bearer'
    });
    return response.data.filter(pedido => pedido.usuarioId === getUserId()); // Filtra por el usuarioId
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    throw error;
  }
};

// Lifecycle hook
onMounted(async () => {
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
});

// Methods
const addToCart = (product) => {
  const existingItem = cartItems.value.find(
    (item) => item.product.id === product.id
  );
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ product, quantity: 1 });
  }
};

const removeFromCart = (product) => {
  const itemIndex = cartItems.value.findIndex(
    (item) => item.product.id === product.id
  );
  if (itemIndex !== -1) {
    cartItems.value.splice(itemIndex, 1);
  }
};

const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.quantity * item.product.precio,
    0
  );
});

const checkout = async () => {
  if (cartItems.value.length > 0) {
    try {
      await createPedido({
        detalles: cartItems.value.map(item => ({
          productoId: item.product.id,
          cantidad: item.quantity,
          precioUnitario: item.product.precio
        })),
        usuarioId: getUserId() // Asegúrate de usar el ID correcto del usuario
      });
      cartItems.value = [];
      isModalVisible.value = false;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  }
};

const fetchOrderById = async () => {
  try {
    const allOrders = await getPedidos();
    orders.value = allOrders.filter(order => order.id.toString().includes(searchOrderId.value));
  } catch (error) {
    console.error('Error al buscar el pedido:', error);
  }
};
</script>



<style scoped>
h2 {
  color: #1890ff;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 16px;
}

.cart-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}

.cart-item-list {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.cart-item-info {
  flex-grow: 1;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.checkout-button {
  background-color: #52c41a;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.checkout-button:hover {
  background-color: #389e0d;
}

.cancel-button {
  background-color: #d9d9d9;
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #bfbfbf;
}

.view-orders-button {
  margin-top: 20px;
}
</style>