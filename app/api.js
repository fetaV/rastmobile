// api.js
import axios from "axios"

const API_URL = "http://localhost:5000"

export const getBoards = async () => {
  try {
    const response = await axios.get(`${API_URL}/boards`)
    return response.data
  } catch (error) {
    console.error("Error fetching boards:", error)
    throw error
  }
}

export const createTask = async task => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

export const updateTask = async (taskId, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export const deleteTask = async (taskId, boardName) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { boardName },
    })
    return response.data
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

export const moveTask = async moveInfo => {
  try {
    const response = await axios.post(`${API_URL}/tasks/move`, moveInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error moving task:", error)
    throw error
  }
}

export const handleButtonClick = async id => {
  if (id) {
    try {
      await saveId({ idValue: id })
      setId("")
      fetchData()
      router.push(`/${id}/board`)
    } catch (error) {
      console.error("Error saving ID:", error)
    }
  } else {
    alert("Please enter an ID")
  }
}

export const fetchIds = async () => {
  try {
    const fetchedIds = await fetchIds()
    setIds(fetchedIds)
  } catch (error) {
    console.error("Error fetching IDs:", error)
  }
}
