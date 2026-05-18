<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
    <span v-if="label" class="spinner-label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({ label: String })
</script>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

.spinner-label {
  color: var(--text-muted);
  font-size: 0.9rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
