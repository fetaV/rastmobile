"use client"
import React, { useState } from "react"
import axios from "axios"

const App = () => {
  const [boardName, setBoardName] = useState("")

  const handleCreateBoard = async () => {
    try {
      const response = await axios.post("http://localhost:5000/boards", {
        name: boardName,
      })
      console.log("Created board:", response.data)
      // Burada yeni board'un bilgilerini state'e veya başka bir yerde tutabilir veya işlemler yapabilirsiniz.
      alert("Board created successfully!")
    } catch (error) {
      console.error("Error creating board:", error)
      alert("Failed to create board.")
    }
  }

  return (
    <div className="App">
      <h1>Create a New Board</h1>
      <label>Board Name:</label>
      <input
        type="text"
        value={boardName}
        className="text-black"
        onChange={e => setBoardName(e.target.value)}
      />
      <button onClick={handleCreateBoard}>Create Board</button>
    </div>
  )
}

export default App
