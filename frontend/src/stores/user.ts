import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', () => {
    const user = useLocalStorage('user', "")
    const token = useLocalStorage('token', "")
    const notifications = useLocalStorage('notifs', 0)

    function login(newUser: string, newToken: string) {
        user.value = newUser
        token.value = newToken
    }

    function logout() {
        user.value = ""
        token.value = ""
    }

    function newNotification() {
        notifications.value++
    }

    function notificationsRead() {
        notifications.value = 0
    }

  return { user, token, notifications, login, logout, newNotification, notificationsRead }
})