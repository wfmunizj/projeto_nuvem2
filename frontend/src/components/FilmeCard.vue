<template>
  <RouterLink :to="`/filme/${encodeURIComponent(filme.titulo)}`" class="card glass">
    <div class="card-header">
      <span class="genero-tag">{{ filme.genero }}</span>
      <span class="nota-badge">★ {{ filme.notaMedia?.toFixed(1) ?? '—' }}</span>
    </div>
    <h3 class="card-titulo">{{ filme.titulo }}</h3>
    <div class="card-meta">
      <span>{{ filme.ano }}</span>
      <span class="sep">·</span>
      <span>{{ filme.duracao }} min</span>
    </div>
    <p v-if="filme.sinopse" class="card-sinopse">{{ filme.sinopse }}</p>
  </RouterLink>
</template>

<script setup>
defineProps({ filme: Object })
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.4rem;
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.genero-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--text-muted);
}

.card-titulo {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.sep {
  opacity: 0.5;
}

.card-sinopse {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}
</style>
