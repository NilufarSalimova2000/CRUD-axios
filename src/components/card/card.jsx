import React from "react";

export const Card = ({ id, title, description, onDelete, onEdit }) => {
  return (
    <div className="item">
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="delete_btn" onClick={() => onDelete(id)}>Delete</button>
      <button className="edit_btn" onClick={() => onEdit(id)}>Edit</button>
    </div>
  );
};
