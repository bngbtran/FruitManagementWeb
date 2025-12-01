<template>
    <div class="notification-wrapper">
        <transition-group name="slide-fade" tag="div">
            <div v-for="(note, index) in notifications" :key="note.id" :class="['notification-card', note.type]">
                <div class="card-header">
                    <span>{{ note.message }}</span>
                    <button class="close-btn" @click="remove(index)">×</button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import { reactive } from 'vue'

let idCounter = 0
export const notifications = reactive([])

export function notify(message, type = 'success', duration = 3000) {
    const id = idCounter++
    notifications.push({ id, message, type })
    setTimeout(() => {
        const index = notifications.findIndex(n => n.id === id)
        if (index !== -1) notifications.splice(index, 1)
    }, duration)
}

export default {
    setup() {
        const remove = (index) => notifications.splice(index, 1)
        return { notifications, remove }
    }
}
</script>

<style scoped>
.notification-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification-card {
    min-width: 250px;
    max-width: 300px;
    background: #fff;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    border-left: 4px solid;
}

.notification-card.success {
    border-color: #22c55e;
}

.notification-card.error {
    border-color: #dc2626;
}

.notification-card.info {
    border-color: #3b82f6;
}

.card-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #555;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
