<template>
  <div class="container">
    <RouterLink to="/" class="btn btn-ghost back-btn">← Voltar</RouterLink>

    <h1 class="page-title">{{ isEdit ? 'Editar Filme' : 'Novo Filme' }}</h1>
    <p class="page-subtitle">{{ isEdit ? `Editando "${titulo}"` : 'Preencha os dados do filme' }}</p>

    <Spinner v-if="loading && isEdit && !filmeCarregado" label="Carregando..." />

    <FilmeForm
      v-else
      :filme="filmeAtual"
      :modo="isEdit ? 'edit' : 'create'"
      :loading="loading"
      @submit="salvar"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilmes } from '../composables/useFilmes.js'
import FilmeForm from '../components/FilmeForm.vue'
import Spinner from '../components/Spinner.vue'

const route = useRoute()
const router = useRouter()
const { filme, loading, buscar, criar, atualizar } = useFilmes()

const titulo = computed(() => decodeURIComponent(route.params.titulo || ''))
const isEdit = computed(() => route.name === 'editar')
const filmeAtual = ref(null)
const filmeCarregado = ref(false)

onMounted(async () => {
  if (isEdit.value) {
    await buscar(titulo.value)
    filmeAtual.value = filme.value ? { ...filme.value } : null
    filmeCarregado.value = true
  }
})

async function salvar(dados) {
  try {
    if (isEdit.value) {
      await atualizar(titulo.value, dados)
      router.push(`/filme/${encodeURIComponent(titulo.value)}`)
    } else {
      await criar(dados)
      router.push('/')
    }
  } catch {
    // toast já exibido pelo composable
  }
}
</script>

<style scoped>
.back-btn {
  margin-bottom: 1.5rem;
  display: inline-flex;
}
</style>
