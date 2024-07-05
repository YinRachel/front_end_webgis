import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('tokener', () => {
  const token = ref('0')
  const username = ref('')
  const usertype = ref('')
  return { token, username, usertype }
})
