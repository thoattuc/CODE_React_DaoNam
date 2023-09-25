//-- App ---//
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Todo from "./pages/Todo";
import Login from "./pages/Login";

function App() {
  const [cates, setCate] = useState([]);
  const [brands, setBrand] = useState([]);

  const getValue = async () => {
    const result = await fetch(
      "https://students.trungthanhweb.com/api/home?apitoken=" +
        localStorage.getItem("token")
    ).then((res) => res.json());

    if (result.categrories) {
      setCate(result.categrories);
    }
    if (result.brands) {
      setBrand(result.brands);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") != null
    ) {
      getValue();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home brands={brands} cates={cates}/>}/>
        <Route path="/products" element={<Products brands={brands} cates={cates}/>}/>
        <Route path="/todo" element={<Todo brands={brands} cates={cates}/>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
