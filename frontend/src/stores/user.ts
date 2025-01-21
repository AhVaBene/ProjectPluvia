import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', () => {
    const user = useLocalStorage('user', "")
    const token = useLocalStorage('token', "")

    function login(newUser: string, newToken: string) {
        user.value = newUser
        token.value = newToken
    }

    function logout() {
        user.value = ""
        token.value = ""
    }

  return { user, token, login, logout }
})