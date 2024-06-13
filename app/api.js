// api.js
import axios from "axios"

const API_URL = "http://localhost:5000"

export const getBoards = async () => {
  try {
    const response = await axios.get(`${API_URL}/boards`)
    return response.data
  } catch (error) {
    console.error("Error fetching boards:", error)
    throw error // rethrow or handle as needed
  }
}

export const createTask = async task => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log("response", response)
    return response.data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error // rethrow or handle as needed
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
    throw error // rethrow or handle as needed
  }
}

export const deleteTask = async (taskId, boardName) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { boardName }, // send data in 'data' key for DELETE requests with axios
    })
    return response.data
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error // rethrow or handle as needed
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
    throw error // rethrow or handle as needed
  }
}

// handleButtonClick function
export const handleButtonClick = async id => {
  console.log("123")
  if (id) {
    try {
      await axios.post(`${API_URL}/save-id`, { idValue: id })
    } catch (error) {
      console.error("Error saving ID:", error)
    }
  } else {
    alert("Please enter an ID")
  }
}

export const fetchIds = async () => {
  try {
    const response = await axios.get(`${API_URL}/ids`)
    return response.data
  } catch (error) {
    console.error("Error fetching IDs:", error)
    throw error
  }
}
