<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <div v-else-if="!fruit">Not Found !!!</div>
    <div v-else class="detail-card">
      <h2>{{ fruit.name }}</h2>
      <p><label>Price:</label> {{ formatPrice(fruit.price) }} VNĐ</p>
      <p><label>Quantity:</label> {{ fruit.quantity }}</p>
      <div class="form-actions">
        <router-link to="/" class="btn btn-cancel" style="margin-right: 8px;">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFruitById } from '../api/fruitApi'

export default {
  setup() {
    const fruit = ref(null)
    const loading = ref(true)
    const route = useRoute()

    const loadFruit = async () => {
      fruit.value = await getFruitById(route.params.id)
      loading.value = false
    }

    const formatPrice = (value) => {
      if (!value && value !== 0) return ''
      return value.toLocaleString('vi-VN', { maximumFractionDigits: 0 })
    }

    onMounted(loadFruit)

    return { fruit, loading, formatPrice }
  }
}
</script>

<style scoped>
.detail-card {
  width: 50%;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.detail-card h2 {
  color: #166534;
}

.detail-card label {
  color: #166534;
  font-weight: bold;
}

.btn:hover {
  background-color: #16a34a;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  background-color: #22c55e;
  color: #fff;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.btn-cancel {
  background-color: #9c9c9c;
  color: #fff;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
