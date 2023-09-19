import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Todo() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  const submitFunction = () => {
    if (item && item != null) {
      setTodo((todo) => [...todo, item]);
      console.log(item);
      alert("created ^^");
    }
  };

  return (
    <div>
      <Navbar />
      #Todo
      <div className="row container mt-5 m-auto">
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            placeholder="task"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary w-100" onClick={submitFunction}>
            Create
          </button>
        </div>
        <div className="row m-auto mt-3">
          {todo && todo.map((item, index) => <li key={index}>{item}</li>)}
        </div>
      </div>
    </div>
  );
}

export default Todo;