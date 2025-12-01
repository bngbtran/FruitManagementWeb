<template>
  <div class="container">
    <div class="top-bar">
      <h1>Fruit List</h1>
      <router-link to="/create" class="btn">+ Create Fruit</router-link>
    </div>

    <div v-if="loading" class="loading">Loading fruits...</div>
    <div v-else-if="fruits.length === 0" class="no-data">Not Found !!!</div>

    <table v-else class="fruit-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price (VNĐ)</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fruit in fruits" :key="fruit.id">
          <td>{{ fruit.name }}</td>
          <td>{{ formatPrice(fruit.price) }}</td>
          <td>{{ fruit.quantity }}</td>
          <td>
            <router-link :to="`/fruit/${fruit.id}`" class="btn action-btn view">View</router-link>
            <router-link :to="`/edit/${fruit.id}`" class="btn action-btn edit">Edit</router-link>
            <button @click="handleDelete(fruit.id)" class="btn action-btn delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { fetchFruits, deleteFruit } from '../api/fruitApi'
import { notify } from '../components/Notification.vue'

export default {
  setup() {
    const fruits = ref([])
    const loading = ref(true)
    const { emit } = getCurrentInstance()

    const loadFruits = async () => {
      loading.value = true
      fruits.value = await fetchFruits()
      loading.value = false
    }

    const handleDelete = async (id) => {
      if (!confirm('Delete this fruit?')) return

      const success = await deleteFruit(id)
      if (success) {
        fruits.value = fruits.value.filter(f => f.id !== id)
        notify('Successfully !!!', 'success')
      } else {
        notify('Failed !!!', 'error')
      }
    }

    const formatPrice = (value) => {
      if (!value && value !== 0) return ''
      return value.toLocaleString('vi-VN', { maximumFractionDigits: 0 })
    }

    onMounted(loadFruits)

    return { fruits, loading, handleDelete, formatPrice }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.top-bar h1 {
  margin: 0;
  font-size: 1.8rem;
}

.btn {
  background-color: #22c55e;
  color: #fff;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  font-weight: bold;
}

.btn:hover {
  background-color: #16a34a;
}

.action-btn.view {
  margin-right: 8px;
  background-color: #9c9c9c;
}

.action-btn.edit {
  margin-right: 8px;
}

.action-btn.delete {
  background-color: #dc2626;
}

.action-btn.delete:hover {
  background-color: #b91c1c;
}

.fruit-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.fruit-table th {
  background-color: #166534;
  color: #fff;
  padding: 12px;
  text-align: left;
}

.fruit-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.fruit-table tr:hover {
  background-color: #f0fdf4;
}

.loading,
.no-data {
  text-align: center;
  margin-top: 20px;
  font-weight: 500;
  color: #166534;
}
</style>
