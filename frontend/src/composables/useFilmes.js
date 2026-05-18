import { ref } from 'vue'
import * as api from '../api/filmes.js'
import { useToast } from './useToast.js'

export function useFilmes() {
  const filmes = ref([])
  const filme = ref(null)
  const loading = ref(false)
  const erro = ref(null)
  const { sucesso, erro: toastErro } = useToast()

  async function listar() {
    loading.value = true
    erro.value = null
    try {
      filmes.value = await api.listarFilmes()
    } catch (e) {
      erro.value = e.message
      toastErro('Não foi possível carregar filmes: ' + e.message)
    } finally {
      loading.value = false
    }
  }

  async function buscar(titulo) {
    loading.value = true
    erro.value = null
    filme.value = null
    try {
      filme.value = await api.buscarFilme(titulo)
    } catch (e) {
      erro.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function criar(dados) {
    loading.value = true
    try {
      const criado = await api.criarFilme(dados)
      sucesso('Filme criado com sucesso!')
      return criado
    } catch (e) {
      toastErro('Erro ao criar filme: ' + e.message)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function atualizar(titulo, dados) {
    loading.value = true
    try {
      const atualizado = await api.atualizarFilme(titulo, dados)
      sucesso('Filme atualizado com sucesso!')
      return atualizado
    } catch (e) {
      toastErro('Erro ao atualizar filme: ' + e.message)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deletar(titulo) {
    loading.value = true
    try {
      await api.deletarFilme(titulo)
      sucesso('Filme removido.')
    } catch (e) {
      toastErro('Erro ao deletar filme: ' + e.message)
      throw e
    } finally {
      loading.value = false
    }
  }

  return { filmes, filme, loading, erro, listar, buscar, criar, atualizar, deletar }
}
