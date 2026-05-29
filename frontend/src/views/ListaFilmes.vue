<template>
  <div class="container">
    <div class="header-row">
      <div>
        <h1 class="page-title">🎬 Catálogo de Filmes</h1>
        <p class="page-subtitle">{{ filmes.length }} filme(s) encontrado(s)</p>
      </div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <RouterLink to="/relatorio" class="btn btn-ghost">📊 Relatório</RouterLink>
        <RouterLink to="/novo" class="btn btn-primary">+ Novo Filme</RouterLink>
      </div>
    </div>

    <div class="search-wrap">
      <input
        v-model="busca"
        type="text"
        class="search-input"
        placeholder="Buscar por título ou gênero..."
      />
    </div>

    <Spinner v-if="loading" label="Carregando filmes..." />

    <div v-else-if="erro" class="empty-state">
      <p>{{ erro }}</p>
      <button class="btn btn-ghost" @click="listar">Tentar novamente</button>
    </div>

    <div v-else-if="filtrados.length === 0" class="empty-state">
      <p>Nenhum filme encontrado.</p>
      <RouterLink to="/novo" class="btn btn-primary">Adicionar primeiro filme</RouterLink>
    </div>

    <div v-else class="grid-filmes">
      <FilmeCard v-for="f in filtrados" :key="f.titulo" :filme="f" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFilmes } from '../composables/useFilmes.js'
import FilmeCard from '../components/FilmeCard.vue'
import Spinner from '../components/Spinner.vue'

const { filmes, loading, erro, listar } = useFilmes()
const busca = ref('')

const filtrados = computed(() => {
  if (!busca.value.trim()) return filmes.value
  const q = busca.value.toLowerCase()
  return filmes.value.filter(f =>
    f.titulo?.toLowerCase().includes(q) ||
    f.genero?.toLowerCase().includes(q)
  )
})

onMounted(listar)
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.search-wrap {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.95rem;
  padding: 0.65rem 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.search-input::placeholder {
  color: var(--text-muted);
}
</style>
