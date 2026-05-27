const BASE = (import.meta.env.VITE_API_BASE_URL || '') + '/filmes'

async function handleResponse(res) {
  if (res.status === 204) return null
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const msg = data?.message || data?.error || `Erro ${res.status}`
    throw new Error(msg)
  }
  return data
}

export async function listarFilmes() {
  const res = await fetch(BASE)
  return handleResponse(res)
}

export async function buscarFilme(titulo) {
  const res = await fetch(`${BASE}/${encodeURIComponent(titulo)}`)
  return handleResponse(res)
}

export async function criarFilme(filme) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  })
  return handleResponse(res)
}

export async function atualizarFilme(titulo, filme) {
  const res = await fetch(`${BASE}/${encodeURIComponent(titulo)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  })
  return handleResponse(res)
}

export async function deletarFilme(titulo) {
  const res = await fetch(`${BASE}/${encodeURIComponent(titulo)}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
