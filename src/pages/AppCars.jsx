import React, { useState, useEffect } from "react";
import SingleCar from "../components/SingleCar";
import CarService from "../services/CarService";
import { useHistory } from "react-router-dom";

export default function AppCars() {
  const [cars, setCars] = useState([]);
  const history = useHistory();

  const fetchCars = async () => {
    const data = await CarService.getAll();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEdit = (id) => {
    history.push("edit/" + id);
  };

  const handleDelete = async (id) => {
    const deleted = await CarService.delete(id);

    if (deleted.count > 0) {
      const newCars = cars.filter((car) => car.id !== id);
      setCars(newCars);
    } else {
      alert("Doslo je do greske");
    }
  };

  return (
    <div>
      <h2>Cars</h2>
      <ul
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {cars.map((car) => (
          <SingleCar
            key={car.id}
            car={car}
            onEditCallback={handleEdit}
            onDeleteCallback={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
