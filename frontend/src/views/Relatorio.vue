<script setup>
import { ref, onMounted } from 'vue'

const stats = ref(null)
const loading = ref(true)
const erro = ref(null)

onMounted(async () => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL || ''
    const res = await fetch(`${base}/report`)
    if (!res.ok) throw new Error(`Erro ${res.status}`)
    stats.value = await res.json()
  } catch (e) {
    erro.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="relatorio">
    <h2>Relatório do Catálogo</h2>

    <div v-if="loading" class="loading">Carregando relatório…</div>

    <div v-else-if="erro" class="erro">Erro: {{ erro }}</div>

    <div v-else>
      <div class="cards">
        <div class="card">
          <span class="label">Total de filmes</span>
          <span class="valor">{{ stats.total }}</span>
        </div>
        <div class="card">
          <span class="label">Nota média</span>
          <span class="valor">{{ stats.notaMedia }}</span>
        </div>
        <div class="card">
          <span class="label">Duração média</span>
          <span class="valor">{{ stats.duracaoMedia }} min</span>
        </div>
      </div>

      <div class="secao">
        <h3>Por gênero</h3>
        <ul>
          <li v-for="(qtd, genero) in stats.porGenero" :key="genero">
            <strong>{{ genero }}</strong>: {{ qtd }} filme{{ qtd > 1 ? 's' : '' }}
          </li>
        </ul>
      </div>

      <div class="secao">
        <h3>Por ano</h3>
        <ul>
          <li v-for="(qtd, ano) in stats.porAno" :key="ano">
            <strong>{{ ano }}</strong>: {{ qtd }} filme{{ qtd > 1 ? 's' : '' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relatorio { max-width: 700px; margin: 2rem auto; padding: 0 1rem; }
h2 { margin-bottom: 1.5rem; }
.loading { color: #888; }
.erro { color: #c00; }
.cards { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.card {
  flex: 1; min-width: 140px;
  background: #f5f5f5; border-radius: 8px;
  padding: 1rem; text-align: center;
}
.label { display: block; font-size: 0.85rem; color: #666; margin-bottom: 0.4rem; }
.valor { display: block; font-size: 1.6rem; font-weight: bold; }
.secao { margin-top: 1.5rem; }
.secao h3 { margin-bottom: 0.5rem; }
.secao ul { list-style: none; padding: 0; }
.secao li { padding: 0.3rem 0; border-bottom: 1px solid #eee; }
</style>
