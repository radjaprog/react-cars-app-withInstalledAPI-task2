import React, { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

function SingleCar({ car, onEditCallback, onDeleteCallback }) {
  const {
    id,
    brand,
    model,
    year,
    maxSpeed,
    isAutomatic,
    engine,
    numberOfDoors,
  } = car;

  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => {
    onEditCallback(id);
  };

  const handleDelete = () => {
    onDeleteCallback(id);
  };

  return (
    <>
      <li
        style={{
          border: "1px, solid black",
          marginBottom: "5px",
          padding: "5",
          display: "flex",
          flexDirection: "column",
          maxWidth: 200,
          border: "1px solid black",
          padding: 10,
        }}
      >
        <span>Brand: {brand} </span>
        <span>Model: {model} </span>
        <span>Year: {year} </span>
        <span>Max Speed: {maxSpeed} </span>
        <span>{isAutomatic ? "Is" : "Not"}</span>
        <span>Engine: {engine}</span>
        <span>Number of doors: {numberOfDoors}</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => setShowDialog(true)}>Delete</button>
      </li>

      {showDialog && (
        <ConfirmationDialog
          title="Delete car?"
          message="This action is irreversible"
          onSubmit={() => handleDelete(id)}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
}

export default SingleCar;
