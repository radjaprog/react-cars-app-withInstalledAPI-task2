import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CarService from "../services/CarService";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const YEARS = Array(2018 - 1990 + 1)
  .fill(1990)
  .map((el, index) => el + index);

const ENGINES = ["diesel", "petrol", "electric", "hybrid"];

const getDefaultCarValues = () => ({
  brand: "",
  model: "",
  year: YEARS[0],
  maxSpeed: "",
  numberOfDoors: "",
  isAutomatic: false,
  engine: "",
});

function AddCar() {
  const history = useHistory();
  const { id } = useParams();

  const [car, setCar] = useState(getDefaultCarValues());

  const getCar = async (id) => {
    const data = await CarService.get(id);
    setCar(data);
  };

  useEffect(() => {
    if (id) {
      getCar(id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await CarService.edit(car);
    } else {
      await CarService.add(car);
    }
    console.log(e);
    history.push("/cars");
  };

  const handleReset = () => {
    setCar(getDefaultCarValues());
  };

  const handlePreview = () => {
    alert(`
      Brand: ${car.brand} \n
      Model: ${car.model} \n
      Year: ${car.year} \n
      Max speed: ${car.maxSpeed} \n
      Number of doors: ${car.numberOfDoors} \n
      Is Automatic: ${car.isAutomatic ? "Yes" : "No"} \n
      Engine: ${car.engine} \n
    `);
  };

  const getLabel = () => {
    return id ? "Edit" : "Add" + "car";
  };

  return (
    <div>
      <h2> {getLabel()} </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          marginLeft: 15,
        }}
      >
        <input
          required
          type="text"
          value={car.brand}
          minLength="2"
          placeholder="Brand"
          onChange={({ target }) => setCar({ ...car, brand: target.value })}
        />
        <input
          required
          type="text"
          minLength="2"
          value={car.model}
          placeholder="Model"
          onChange={({ target }) => setCar({ ...car, model: target.value })}
        />
        <select
          style={{ width: 200 }}
          onChange={({ target }) =>
            setCar({ ...car, year: Number(target.value) })
          }
          value={car.year}
        >
          {YEARS.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          required
          type="number"
          value={car.maxSpeed}
          placeholder="Max speed"
          onChange={({ target }) => setCar({ ...car, maxSpeed: target.value })}
        />
        <input
          required
          type="number"
          value={car.numberOfDoors}
          placeholder="Number of door"
          onChange={({ target }) =>
            setCar({ ...car, numberOfDoors: target.value })
          }
        />
        <span>
          <label>Is automatic?</label>
          <input
            type="checkbox"
            checked={car.isAutomatic}
            onChange={({ target }) => {
              setCar({ ...car, isAutomatic: target.checked });
            }}
          />
        </span>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4>Pick engine:</h4>
          {ENGINES.map((engine, index) => (
            <span key={index}>
              <input
                type="radio"
                name="engine"
                required
                checked={engine === car.engine}
                value={engine}
                onChange={() => setCar({ ...car, engine })}
              />
              {engine.toUpperCase()}
            </span>
          ))}
        </div>
        <button>{getLabel()}</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
      </form>
    </div>
  );
}

export default AddCar;
