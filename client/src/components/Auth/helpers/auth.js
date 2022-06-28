export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('fitness-app')
}

const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < payload.exp
}

export function userIsOwner(userId) {
  const payload = getPayload()
  if (!payload) {
    return false
  }
  if (!userIsAuthenticated()) {
    return false
  }
  return userId === payload.sub
}

export const getUserId = () => {
  const payload = getPayload()
  return payload && payload.sub
}