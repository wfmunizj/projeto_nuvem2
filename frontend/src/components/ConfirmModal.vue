<template>
  <Teleport to="body">
    <div v-if="aberto" class="overlay" @click.self="$emit('cancelar')">
      <div class="modal glass">
        <p class="modal-msg">{{ mensagem }}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="$emit('cancelar')">Cancelar</button>
          <button class="btn btn-danger" @click="$emit('confirmar')">Confirmar</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ aberto: Boolean, mensagem: String })
defineEmits(['confirmar', 'cancelar'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900;
  backdrop-filter: blur(4px);
}

.modal {
  padding: 2rem;
  max-width: 400px;
  width: 90%;
}

.modal-msg {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
</style>
