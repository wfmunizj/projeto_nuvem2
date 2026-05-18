import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

function add(mensagem, tipo) {
  const id = ++nextId
  toasts.value.push({ id, mensagem, tipo })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3500)
}

export function useToast() {
  return {
    toasts,
    sucesso: (msg) => add(msg, 'sucesso'),
    erro: (msg) => add(msg, 'erro'),
  }
}
