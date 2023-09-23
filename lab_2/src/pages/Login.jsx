import React, { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

function Login() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  var data = new URLSearchParams();
  data.append("email", email);

  const checkLogin = async () => {
    try {
      const response = await fetch(
        "https://students.trungthanhweb.com/api/checkLoginhtml",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        }
      );
      const result = await response.json();
      localStorage.setItem("token", result.apitoken);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully ^^",
      }).then(() => {
        window.location.replace("/");
      });
    } catch (error) {
      console.error("Fail login", error);
      setError("Fail login");
    }
  };

  error && <p style={{ color: "red" }}>{error}</p>;

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
          <button className="btn btn-secondary w-100" onClick={checkLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
