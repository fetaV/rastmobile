// Board2.js
"use client"
import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Card from "./Card"
import { getBoards, createTask, updateTask, deleteTask, moveTask } from "./api"

const Board = () => {
  const [dashboard, setDashboard] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [editTaskId, setEditTaskId] = useState(null)
  const [editTaskFormData, setEditTaskFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    const fetchBoards = async () => {
      const boards = await getBoards()
      setDashboard(boards)
    }
    fetchBoards()
  }, [])

  const handleEditTask = async () => {
    const boardName = findBoardNameByTaskId(editTaskId)
    await updateTask(editTaskId, { ...editTaskFormData, boardName })
    setDashboard(prevDashboard =>
      prevDashboard.map(board => ({
        ...board,
        tasks: board.tasks.map(task =>
          task._id === editTaskId ? { ...task, ...editTaskFormData } : task
        ),
      }))
    )
    setEditTaskId(null)
  }

  const handleDeleteTask = async (taskId, boardName) => {
    await deleteTask(taskId, boardName)
    setDashboard(prevDashboard =>
      prevDashboard.map(board => ({
        ...board,
        tasks: board.tasks.filter(task => task._id !== taskId),
      }))
    )
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleDragEnd = async result => {
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

    const sourceBoardName = findBoardNameByBoardId(source.droppableId)
    const destinationBoardName = findBoardNameByBoardId(destination.droppableId)
    const moveInfo = {
      sourceBoardName,
      destinationBoardName,
      taskId: draggableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    }

    await moveTask(moveInfo)

    const newDashboard = [...dashboard]
    const sourceColumnIndex = newDashboard.findIndex(
      column => column._id === source.droppableId
    )
    const destinationColumnIndex = newDashboard.findIndex(
      column => column._id === destination.droppableId
    )
    const draggedTask = newDashboard[sourceColumnIndex].tasks.find(
      task => task._id === draggableId
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
    boardName: "Backlog",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAdd = async e => {
    e.preventDefault()
    const newTask = await createTask({
      ...formData,
      flagId: findNextFlagId(),
    })

    setDashboard(prevDashboard =>
      prevDashboard.map(board =>
        board.name === formData.boardName
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    )
    setFormData({
      name: "",
      description: "",
      boardName: "Backlog",
    })
  }

  const findBoardNameByTaskId = taskId => {
    const board = dashboard.find(board =>
      board.tasks.some(task => task._id === taskId)
    )
    return board ? board.name : null
  }

  const findBoardNameByBoardId = boardId => {
    const board = dashboard.find(board => board._id === boardId)
    return board ? board.name : null
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
        <div>
          <label>Board:</label>
          <select
            name="boardName"
            value={formData.boardName}
            onChange={handleChange}
          >
            {dashboard.map(board => (
              <option key={board._id} value={board.name}>
                {board.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {dashboard.map(board => (
            <div key={board._id} className="bg-gray-100 p-4 rounded column">
              <h2 className="text-lg font-bold mb-4">{board.name}</h2>
              <Droppable droppableId={board._id.toString()} key={board._id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-2 rounded"
                  >
                    {board.tasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id.toString()}
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
                              onDelete={() =>
                                handleDeleteTask(task._id, board.name)
                              }
                              onEdit={() => {
                                setEditTaskId(task._id)
                                setEditTaskFormData({
                                  name: task.name,
                                  description: task.description,
                                })
                              }}
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
    </>
  )
}

export default Board
