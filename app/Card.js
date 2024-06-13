// Card.js
import React from "react"

const Card = ({ title, description, onDelete, onEdit, style }) => {
  return (
    <div className="p-4 rounded" style={style}>
      <h3 className="font-bold">{title}</h3>
      <p>{description}</p>
      <div className="mt-4">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Card
