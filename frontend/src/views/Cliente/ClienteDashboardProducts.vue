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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getProducts } from '@/api/producto';

const products = ref([]);
const cartItems = ref([]);
const isModalVisible = ref(false);

const token = localStorage.getItem('token');

onMounted(async () => {
  try {
    const response = await getProducts(token);
    products.value = response.data;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
});

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

const checkout = () => {
  if (cartItems.value.length > 0) {
    alert('Pago procesado. ¡Gracias por tu compra!');
    cartItems.value = [];
    isModalVisible.value = false;
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
  z-index: 1000; /* Asegura que el botón esté encima de otros elementos */
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
</style>
