import { useAuthDataStore } from '@/stores/AuthDataStore'

export async function configRoutesAuth(to, from, next): Promise<void> {
  const authDataStore = useAuthDataStore()

  if (sessionStorage.getItem('ACCESS_TOKEN') && !authDataStore.isAuth) {
    await authDataStore.checkToken()
  }

  if (to.meta.requiresAuth && !authDataStore.isAuth) {
    next({ name: 'auth' })
  } else if (to.meta.isGuest && authDataStore.isAuth) {
    next({ name: 'products' })
  } else {
    next()
  }
}
