<template>
  <div class="container">
    <FruitForm :fruitData="fruit" :isEdit="true" @submit="handleUpdate" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FruitForm from '../components/FruitForm.vue'
import { getFruitById, updateFruit } from '../api/fruitApi'
import { notify } from '../components/Notification.vue'

export default {
  components: { FruitForm },
  setup() {
    const fruit = ref({})
    const route = useRoute()
    const router = useRouter()
    const loaded = ref(false)
    const isSubmitting = ref(false)

    const loadFruit = async () => {
      if (loaded.value) return
      fruit.value = await getFruitById(route.params.id)
      loaded.value = true
    }

    const handleUpdate = async (updated) => {
      if (isSubmitting.value) return
      isSubmitting.value = true

      const res = await updateFruit(updated)

      if (res !== null) {
        notify('Successfully !!!', 'success')
        router.push('/')
      } else {
        notify('Failed !!!', 'error')
      }

      isSubmitting.value = false
    }

    onMounted(loadFruit)

    return { fruit, handleUpdate }
  }
}
</script>
