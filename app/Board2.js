"use client"
import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Card from "./Card"

const Board = () => {
  const initialData = [
    {
      id: 1,
      name: "Backlog",
      tasks: [
        { id: 1, name: "Task 1", description: "Description 1", flagId: 1 },
        { id: 2, name: "Task 2", description: "Description 2", flagId: 2 },
      ],
    },
    {
      id: 2,
      name: "To Do",
      tasks: [
        { id: 3, name: "Task 1", description: "Description 1", flagId: 3 },
        { id: 4, name: "Task 2", description: "Description 2", flagId: 4 },
      ],
    },
    {
      id: 3,
      name: "In Progress",
      tasks: [
        { id: 5, name: "Task 1", description: "Description 1", flagId: 5 },
        { id: 6, name: "Task 2", description: "Description 2", flagId: 6 },
      ],
    },
    {
      id: 4,
      name: "Designed",
      tasks: [
        { id: 7, name: "Task 1", description: "Description 1", flagId: 7 },
        { id: 8, name: "Task 2", description: "Description 2", flagId: 8 },
      ],
    },
  ]

  const [dashboard, setDashboard] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [editTaskId, setEditTaskId] = useState(null)
  const [editTaskFormData, setEditTaskFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    setDashboard(initialData)
  }, [])

  const handleEditTask = () => {
    setDashboard(prevDashboard =>
      prevDashboard.map(board => ({
        ...board,
        tasks: board.tasks.map(task =>
          task.id === editTaskId ? { ...task, ...editTaskFormData } : task
        ),
      }))
    )
    setEditTaskId(null)
  }

  const handleDeleteTask = taskId => {
    setDashboard(prevDashboard =>
      prevDashboard.map(board => ({
        ...board,
        tasks: board.tasks.filter(task => task.id !== taskId),
      }))
    )
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newDashboard = [...dashboard]
    const sourceColumnIndex = newDashboard.findIndex(
      column => column.id.toString() === source.droppableId
    )
    const destinationColumnIndex = newDashboard.findIndex(
      column => column.id.toString() === destination.droppableId
    )
    const draggedTask = newDashboard[sourceColumnIndex].tasks.find(
      task => task.id.toString() === draggableId
    )

    newDashboard[sourceColumnIndex].tasks.splice(source.index, 1)
    newDashboard[destinationColumnIndex].tasks.splice(
      destination.index,
      0,
      draggedTask
    )
    setDashboard(newDashboard)
  }

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    boardId: 1,
    flagId: 0,
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAdd = e => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      ...formData,
      flagId: findNextFlagId(),
    }
    setDashboard(prevDashboard =>
      prevDashboard.map(board =>
        board.id === formData.boardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    )
    setFormData({
      name: "",
      description: "",
      boardId: 1,
      flagId: 0,
    })
  }

  const findNextFlagId = () => {
    const flagIds = dashboard.reduce((acc, board) => {
      return acc.concat(board.tasks.map(task => task.flagId))
    }, [])
    const maxFlagId = Math.max(...flagIds)
    return maxFlagId + 1
  }

  return (
    <>
      <div
        className={`ml-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "ml-64" : ""
        }`}
      >
        <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
          <button onClick={toggleMenu} className="block">
            {menuOpen ? "Close Menu" : "Open Menu"}
          </button>
        </header>
        <form onSubmit={handleAdd}>
          <div>
            <label>Task Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Task</button>
        </form>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {dashboard.map(board => (
              <div key={board.id} className="bg-gray-100 p-4 rounded column">
                <h2 className="text-lg font-bold mb-4">{board.name}</h2>
                <Droppable droppableId={board.id.toString()} key={board.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className=" p-2 rounded"
                    >
                      {board.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="text-white shadow-md rounded-lg mb-4"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                title={task.name}
                                description={task.description}
                                style={{ backgroundColor: "#C340A1" }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
        {editTaskId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
              <form onSubmit={handleEditTask}>
                <div className="mb-4">
                  <label className="block">Task Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editTaskFormData.name}
                    onChange={e =>
                      setEditTaskFormData({
                        ...editTaskFormData,
                        name: e.target.value,
                      })
                    }
                    className="border rounded px-3 py-1 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={editTaskFormData.description}
                    onChange={e =>
                      setEditTaskFormData({
                        ...editTaskFormData,
                        description: e.target.value,
                      })
                    }
                    className="border rounded px-3 py-1 w-full"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Board
