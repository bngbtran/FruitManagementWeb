<template>
  <div class="form-card">
    <h2>{{ isEdit ? 'Edit' : 'Create' }} Fruit</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="fruit.name" type="text" />
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input v-model.number="fruit.price" type="number" />
      </div>

      <div class="form-group">
        <label>Quantity:</label>
        <input v-model.number="fruit.quantity" type="number" />
      </div>

      <div class="form-actions">
        <router-link to="/" class="btn btn-cancel" style="margin-right: 8px;">Back</router-link>
        <button type="submit" class="btn">{{ isEdit ? 'Update' : 'Create' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    fruitData: Object,
    isEdit: Boolean
  },
  data() {
    return {
      fruit: { name: '', price: 0, quantity: 0 }
    }
  },
  watch: {
    fruitData: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.fruit = { ...newVal }
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.fruit)
    }
  }
}
</script>

<style scoped>
.form-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 0 auto;
}

.form-card h2 {
  color: #166534;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  color: #166534;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
}

input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

input:focus {
  outline: none;
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
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

.btn:hover {
  background-color: #16a34a;
}
</style>
