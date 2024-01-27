import React, { useState, FormEvent, ChangeEvent } from "react";
import "./App.scss";

import FormSent from "./components/FormSent/FormSent";
import FormEmail from "./components/FormEmail/FormEmail";

function App() {
  return (
    <div className="App">
      <FormSent />
      <FormEmail />
    </div>
  );
}

export default App;
