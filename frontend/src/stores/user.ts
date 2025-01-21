import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', () => {
    const user = useLocalStorage('user', "")
    const token = useLocalStorage('token', "")
    const isAdmin = useLocalStorage('isAdmin', 0)

    function login(newUser: string, newToken: string, newIsAdmin: number) {
        user.value = newUser
        token.value = newToken
        isAdmin.value = newIsAdmin
    }

    function logout() {
        user.value = ""
        token.value = ""
        isAdmin.value = 0
    }

  return { user, token, isAdmin, login, logout }
})