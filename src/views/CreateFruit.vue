<template>
  <div class="container">
    <FruitForm @submit="handleCreate" />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import FruitForm from '../components/FruitForm.vue'
import { addFruit } from '../api/fruitApi'
import { notify } from '../components/Notification.vue'

export default {
  components: { FruitForm },
  setup() {
    const router = useRouter()
    const isSubmitting = ref(false)
    const { emit } = getCurrentInstance()

    const handleCreate = async (fruit) => {
      if (isSubmitting.value) return
      isSubmitting.value = true

      const newFruit = await addFruit(fruit)

      if (newFruit) {
        notify('Successfully !!!', 'success')
        router.push('/')
      } else {
        notify('Failed !!!', 'error')
      }

      isSubmitting.value = false
    }

    return { handleCreate }
  }
}
</script>
