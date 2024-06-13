"use client"
import React, { useEffect, useState } from "react"
import { handleButtonClick, fetchIds } from "./api" // api.js dosyasının yolunu doğru ayarlayın

function App() {
  const [id, setId] = useState("")
  const [ids, setIds] = useState([]) // ID'leri saklamak için bir state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedIds = await fetchIds() // Backend'den ID'leri al
        setIds(fetchedIds) // State'e kaydet
      } catch (error) {
        console.error("Error fetching IDs:", error)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = e => {
    setId(e.target.value)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <h2>Saved IDs:</h2>
        <ul>
          {ids.map((savedId, index) => (
            <li key={index}>{savedId.idValue}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        className="text-black"
        onChange={handleInputChange}
      />
      <button onClick={() => handleButtonClick(id)}>Submit</button>
    </div>
  )
}

export default App
