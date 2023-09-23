import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [item, setItem] = useState("");
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);

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

  //getTodo
  const getTodo = () => {
    fetch(
      "https://students.trungthanhweb.com/api/todo?apitoken=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.check === true) {
          setTodo(res.todo);
        }
      });
  };

  //createTodo
  const submitTodo = async (e) => {
    e.preventDefault();
    if (!item || item === "") {
      Toast.fire({
        icon: "success",
        title: "Empty todo :/",
      });
    } else {
      var data = new URLSearchParams();
      data.append("apitoken", localStorage.getItem("token"));
      data.append("todo", item);
      const response = await fetch(
        "https://students.trungthanhweb.com/api/todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        }
      );
      const res = await response.json();

      if (res.check === true) {
        Toast.fire({
          icon: "success",
          title: "Create success ^^",
        }).then(() => {
          setItem("");
          getTodo();
        });
      }
    }
  };

  //finishTodo
  const finishTodo = (id) => {
    Swal.fire({
      icon: "question",
      text: "Finish task ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = new URLSearchParams();

        data.append("apitoken", localStorage.getItem("token"));
        data.append("id", id);
        console.log(localStorage.getItem("token"));
        fetch("https://students.trungthanhweb.com/api/statusTodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.check === true) {
              Toast.fire({
                icon: "success",
                title: "Finished task ^^",
              }).then(() => {
                setItem("");
                getTodo("");
              });
            } else {
              Toast.fire({
                icon: "info",
                title: "Fail :/",
              });
              console.error();
            }
          });
      } else if (result.isDenied) {
        window.location.reload();
      }
    });
  };

  //submitEditTodo
  const submitEditTodo = async (e) => {
    e.preventDefault();
    var data = new URLSearchParams();
    data.append("apitoken", localStorage.getItem("token"));
    data.append("todo", item);
    data.append("id", id);

    const response = await fetch(
      "https://students.trungthanhweb.com/api/updatetodo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      }
    );
    const res = await response.json();
    if (res.check === true) {
      Toast.fire({
        icon: "success",
        title: "Edited successfully ^^",
      }).then(() => {
        setItem("");
        getTodo();
        setId(0);
        setEdit(false);
      });
    }
  };

  //editTodo
  const editTodo = (id, old) => {
    setId(id);
    setItem(old);
    setEdit(true);
  };

  //deleteTodo
  const deleteTodo = (id) => {
    Swal.fire({
      icon: "question",
      text: "Delete task ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = new URLSearchParams();
        data.append("apitoken", localStorage.getItem("token"));
        data.append("id", id);

        console.log(data);

        fetch("https://students.trungthanhweb.com/api/deletetodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.check);
            if (res.check === true) {
              Toast.fire({
                icon: "success",
                title: "Deleted successfully ^^",
              }).then(() => {
                getTodo();
              });
            }
          });
      } else if (result.isDenied) {
      }
    });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <Navbar />
      #Todo
      <div className="row container mt-3 m-auto">
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
          {edit ? (
            <button className="btn btn-warning w-100 " onClick={submitEditTodo}>
              Edit
            </button>
          ) : (
            <button className="btn btn-primary w-100" onClick={submitTodo}>
              Create
            </button>
          )}
        </div>

        <div className="mt-3">
          {todo && todo.length > 0 && (
            <div className=" rounded table-responsive  rounded-bottom">
              <table className="table table-primary">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Note</th>
                    <th scope="col">Checked</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todo.map((item, index) => (
                    <tr key={item.id} className="">
                      <td>{++index}</td>
                      <td>{item.note}</td>
                      <td>
                        {item.status === "1" ? (
                          <input type="checkbox" checked disabled />
                        ) : (
                          <input
                            type="checkbox"
                            onChange={() => finishTodo(item.id)}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTodo(item.id)}
                        >
                          Del
                        </button>
                        {item.status === "1" ? (
                          <button className="d-none">Edit</button>
                        ) : (
                          <button
                            className=" ms-2 btn btn-warning"
                            onClick={() => editTodo(item.id, item.note)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
