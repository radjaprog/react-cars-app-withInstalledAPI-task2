import React from "react";
import { Switch, Route } from "react-router-dom";
import AppCars from "./pages/AppCars";
import AddCar from "./pages/AddCar";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/cars">
        <AppCars />
      </Route>
      <Route exact path="/add">
        <AddCar />
      </Route>
      <Route path="/edit/:id">
        <AddCar />
      </Route>
    </Switch>
  );
}
