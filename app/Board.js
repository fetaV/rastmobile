//app/Board.js
"use client"
import React from "react"
import Card from "./Card"

const Board = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="bg-gray-100 p-4 rounded column">
        <h2 className="text-lg font-bold mb-4">Backlog</h2>
        <Card
          style={{ backgroundColor: "#C340A1" }}
          title="Twilio integration"
          description="Create new note via SMS. Support text, audio, links, and media."
        />
        <Card
          style={{ backgroundColor: "##6A6DCD" }}
          title="Markdown support"
          description="Markdown shorthand converts to formatting"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded column">
        <h2 className="text-lg font-bold mb-4">To Do</h2>
        <Card
          title="Task 1"
          description="This is the description for Task 1."
        />
        <Card
          title="Task 2"
          description="This is the description for Task 2."
        />
      </div>
      <div className="bg-gray-100 p-4 rounded column">
        <h2 className="text-lg font-bold mb-4">In Progress</h2>
        <Card
          title="Task 1"
          description="This is the description for Task 1."
        />
        <Card
          title="Task 2"
          description="This is the description for Task 2."
        />
      </div>
      <div className="bg-gray-100 p-4 rounded column">
        <h2 className="text-lg font-bold mb-4">Done</h2>
        <Card
          title="Task 1"
          description="This is the description for Task 1."
        />
        <Card
          title="Task 2"
          description="This is the description for Task 2."
        />
      </div>
    </div>
  )
}

export default Board
