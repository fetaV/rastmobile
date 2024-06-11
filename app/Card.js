import React from "react"

const Card = ({ title, description, style }) => {
  return (
    <div className="text-white shadow-md rounded-lg p-4 mb-4" style={style}>
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  )
}

export default Card
