// api.js
const API_URL = "http://localhost:5000"

export const getBoards = async () => {
  const response = await fetch(`${API_URL}/boards`)
  return response.json()
}

export const createTask = async task => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  return response.json()
}

export const updateTask = async (taskId, task) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  return response.json()
}

export const deleteTask = async (taskId, boardName) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardName }),
  })
  return response.json()
}

export const moveTask = async moveInfo => {
  const response = await fetch(`${API_URL}/tasks/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(moveInfo),
  })
  return response.json()
}
