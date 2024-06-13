"use client"
import React, { useState } from "react"
import { handleButtonClick } from "./api" // api.js dosyasının yolunu doğru ayarlayın

function App() {
  const [id, setId] = useState("")

  const handleInputChange = e => {
    setId(e.target.value)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={handleInputChange}
      />
      <button onClick={() => handleButtonClick(id)}>Submit</button>
    </div>
  )
}

export default App
