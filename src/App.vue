<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Fruit Management</h1>
    </header>
    <main class="app-main">
      <router-view />
      <Notification />
    </main>
  </div>
</template>

<script>
import Notification from './components/Notification.vue'

export default { components: { Notification } }
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #166534;
  padding: 20px 40px;
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF
}

.app-main {
  flex: 1;
  padding: 30px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
</style>
