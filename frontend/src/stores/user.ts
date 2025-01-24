import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = useLocalStorage('user', "")
    const token = useLocalStorage('token', "")
    const notifications = ref<number>(0)

    function login(newUser: string, newToken: string) {
        user.value = newUser
        token.value = newToken
    }

    function logout() {
        user.value = ""
        token.value = ""
    }

    function setNotifications(value: number) {
        notifications.value = value
    }

  return { user, token, notifications, login, logout, setNotifications }
})