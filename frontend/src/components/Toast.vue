<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="toast glass"
        :class="t.tipo"
      >
        <span class="toast-icon">{{ t.tipo === 'sucesso' ? '✓' : '✕' }}</span>
        {{ t.mensagem }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast.js'
const { toasts } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 1000;
  max-width: 360px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.toast.sucesso {
  border-color: rgba(74, 222, 128, 0.4);
}

.toast.sucesso .toast-icon {
  color: var(--success);
}

.toast.erro {
  border-color: rgba(255, 51, 102, 0.4);
}

.toast.erro .toast-icon {
  color: var(--danger);
}

.toast-icon {
  font-weight: 800;
  font-size: 1rem;
  flex-shrink: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
