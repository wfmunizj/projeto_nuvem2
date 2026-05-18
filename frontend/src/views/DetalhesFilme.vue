<template>
  <div class="container">
    <RouterLink to="/" class="btn btn-ghost back-btn">← Voltar</RouterLink>

    <Spinner v-if="loading" label="Carregando filme..." />

    <div v-else-if="erro === 'Erro 404' || erro?.includes('404')" class="empty-state">
      <p>Filme não encontrado.</p>
      <RouterLink to="/" class="btn btn-ghost">Voltar ao catálogo</RouterLink>
    </div>

    <div v-else-if="erro" class="empty-state">
      <p>{{ erro }}</p>
      <button class="btn btn-ghost" @click="carregar">Tentar novamente</button>
    </div>

    <div v-else-if="filme" class="detalhe glass">
      <div class="detalhe-header">
        <div>
          <span class="genero-tag">{{ filme.genero }}</span>
          <h1 class="detalhe-titulo">{{ filme.titulo }}</h1>
          <div class="detalhe-meta">
            <span>{{ filme.ano }}</span>
            <span class="sep">·</span>
            <span>{{ filme.duracao }} min</span>
            <span class="sep">·</span>
            <span class="nota-badge">★ {{ filme.notaMedia?.toFixed(1) ?? '—' }}</span>
          </div>
        </div>
        <div class="detalhe-acoes">
          <RouterLink :to="`/editar/${encodeURIComponent(filme.titulo)}`" class="btn btn-ghost">
            Editar
          </RouterLink>
          <button class="btn btn-danger" @click="modalAberto = true">Deletar</button>
        </div>
      </div>

      <p v-if="filme.sinopse" class="detalhe-sinopse">{{ filme.sinopse }}</p>
      <p v-else class="detalhe-sinopse muted">Sem sinopse cadastrada.</p>
    </div>

    <ConfirmModal
      :aberto="modalAberto"
      :mensagem="`Deletar '${filme?.titulo}'? Essa ação não pode ser desfeita.`"
      @confirmar="confirmarDelete"
      @cancelar="modalAberto = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilmes } from '../composables/useFilmes.js'
import Spinner from '../components/Spinner.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const { filme, loading, erro, buscar, deletar } = useFilmes()
const modalAberto = ref(false)

function carregar() {
  buscar(decodeURIComponent(route.params.titulo))
}

async function confirmarDelete() {
  modalAberto.value = false
  await deletar(filme.value.titulo)
  router.push('/')
}

onMounted(carregar)
</script>

<style scoped>
.back-btn {
  margin-bottom: 1.5rem;
  display: inline-flex;
}

.detalhe {
  padding: 2rem;
}

.detalhe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.genero-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.4rem;
}

.detalhe-titulo {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.detalhe-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.sep {
  opacity: 0.4;
}

.detalhe-acoes {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.detalhe-sinopse {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text);
}

.detalhe-sinopse.muted {
  color: var(--text-muted);
  font-style: italic;
}
</style>
