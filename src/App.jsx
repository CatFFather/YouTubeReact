import React from "react";
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";

// CSS
import "./app.css";

// LAYOUT
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainLayout}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
