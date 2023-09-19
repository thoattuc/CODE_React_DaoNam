import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const submitLogin = () => {
    if (email && email != null) {
      var data = new URLSearchParams();
      data.append("email", email);
      fetch("https://students.trungthanhweb.com/api/checkLoginhtml", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };
  // console.log(Login);

  return (
    <div>
      <Navbar />
      #Login
      <div className="row container mt-5 m-auto">
        <div className="col-md-9">
          <input
            type="Email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary w-100" onClick={submitLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
