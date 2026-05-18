<template>
  <form class="form glass" @submit.prevent="submitForm">
    <div class="field">
      <label for="titulo">Título *</label>
      <input
        id="titulo"
        v-model="form.titulo"
        type="text"
        placeholder="Ex: Clube da Luta"
        :disabled="modo === 'edit'"
      />
      <span v-if="erros.titulo" class="field-error">{{ erros.titulo }}</span>
    </div>

    <div class="row-2">
      <div class="field">
        <label for="ano">Ano *</label>
        <input
          id="ano"
          v-model.number="form.ano"
          type="number"
          placeholder="1999"
          min="1888"
          max="2100"
        />
        <span v-if="erros.ano" class="field-error">{{ erros.ano }}</span>
      </div>

      <div class="field">
        <label for="duracao">Duração (min) *</label>
        <input
          id="duracao"
          v-model.number="form.duracao"
          type="number"
          placeholder="120"
          min="1"
        />
        <span v-if="erros.duracao" class="field-error">{{ erros.duracao }}</span>
      </div>
    </div>

    <div class="row-2">
      <div class="field">
        <label for="genero">Gênero *</label>
        <input
          id="genero"
          v-model="form.genero"
          type="text"
          placeholder="Ex: Drama, Ação, Comédia"
        />
        <span v-if="erros.genero" class="field-error">{{ erros.genero }}</span>
      </div>

      <div class="field">
        <label for="notaMedia">Nota Média (0–10)</label>
        <input
          id="notaMedia"
          v-model.number="form.notaMedia"
          type="number"
          placeholder="7.5"
          min="0"
          max="10"
          step="0.1"
        />
        <span v-if="erros.notaMedia" class="field-error">{{ erros.notaMedia }}</span>
      </div>
    </div>

    <div class="field">
      <label for="sinopse">Sinopse</label>
      <textarea
        id="sinopse"
        v-model="form.sinopse"
        rows="4"
        placeholder="Breve descrição do filme..."
      ></textarea>
    </div>

    <div class="form-actions">
      <RouterLink to="/" class="btn btn-ghost">Cancelar</RouterLink>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Salvando...' : (modo === 'edit' ? 'Salvar alterações' : 'Criar filme') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  filme: Object,
  modo: { type: String, default: 'create' },
  loading: Boolean,
})

const emit = defineEmits(['submit'])

const form = reactive({
  titulo: '',
  ano: '',
  duracao: '',
  genero: '',
  notaMedia: '',
  sinopse: '',
})

const erros = reactive({})

watch(() => props.filme, (f) => {
  if (f) Object.assign(form, f)
}, { immediate: true })

function validar() {
  Object.keys(erros).forEach(k => delete erros[k])
  let ok = true

  if (props.modo === 'create' && !form.titulo?.trim()) {
    erros.titulo = 'Título obrigatório.'
    ok = false
  }
  if (!form.ano || form.ano < 1888 || form.ano > 2100) {
    erros.ano = 'Ano entre 1888 e 2100.'
    ok = false
  }
  if (!form.duracao || form.duracao < 1) {
    erros.duracao = 'Duração deve ser maior que 0.'
    ok = false
  }
  if (!form.genero?.trim()) {
    erros.genero = 'Gênero obrigatório.'
    ok = false
  }
  if (form.notaMedia !== '' && form.notaMedia !== null && (form.notaMedia < 0 || form.notaMedia > 10)) {
    erros.notaMedia = 'Nota entre 0 e 10.'
    ok = false
  }

  return ok
}

function submitForm() {
  if (!validar()) return
  const payload = { ...form }
  if (payload.notaMedia === '') payload.notaMedia = 0
  emit('submit', payload)
}
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 640px;
  width: 100%;
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 0.5rem;
}

@media (max-width: 500px) {
  .row-2 {
    grid-template-columns: 1fr;
  }
}
</style>
