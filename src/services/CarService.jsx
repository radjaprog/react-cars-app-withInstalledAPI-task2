import axios from "axios";

const handleError = (e) => {
  alert(e.response.data.message);
  console.log(e.response.data);
};

class CarService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api/",
    });
  }

  async getAll() {
    try {
      const { data } = await this.client.get("cars");

      return data;
    } catch (e) {
      handleError(e);
    }
    return [];
  }

  async add(newCar) {
    try {
      const { data } = await this.client.post("cars", newCar);
      return data;
    } catch (e) {
      handleError(e);
    }
    return null;
  }

  async get(id) {
    try {
      const { data } = await this.client.get("cars/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async edit(car) {
    try {
      const { data } = await this.client.put("cars/" + car.id, car);
      return data;
    } catch (e) {
      handleError(e);
    }
  }

  async delete(id) {
    try {
      const { data } = await this.client.delete("cars/" + id);
      return data;
    } catch (e) {
      handleError(e);
    }
  }
}
export default new CarService();
