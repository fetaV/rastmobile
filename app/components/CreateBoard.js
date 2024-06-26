// components/CreateBoard.js

"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const API_URL = "http://localhost:5000"

export default function App() {
  const router = useRouter()
  const [id, setId] = useState("")
  const [ids, setIds] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const fetchedIds = await fetchIds()
      setIds(fetchedIds)
    } catch (error) {
      console.error("Error fetching IDs:", error)
    }
  }

  const handleInputChange = e => {
    setId(e.target.value)
  }

  const routeBoard = async id => {
    try {
      let routeID = id.idValue
      router.push(`/board/${routeID}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = async () => {
    if (id) {
      try {
        await saveId({ idValue: id })
        setId("")
        fetchData()
        router.push(`/board/${id}`)
      } catch (error) {
        console.error("Error saving ID:", error)
      }
    } else {
      alert("Please enter an ID")
    }
  }

  const saveId = async data => {
    try {
      await axios.post(`${API_URL}/save-id`, data)
    } catch (error) {
      console.error("Error saving ID:", error)
      throw error
    }
  }

  const fetchIds = async () => {
    try {
      const response = await axios.get(`${API_URL}/ids`)
      return response.data
    } catch (error) {
      console.error("Error fetching IDs:", error)
      throw error
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <h2>Saved IDs:</h2>
        <ul>
          {ids.map((savedId, index) => (
            <li key={index}>
              <button onClick={() => routeBoard(savedId)}>
                {savedId.idValue}
              </button>
            </li>
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
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  )
}
