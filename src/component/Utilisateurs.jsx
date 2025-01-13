import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import AdminPrincipal from "./AdminPrincipal";

export default function Utilisateurs({ token }) {
  const [users, setUsers] = useState("");
  useEffect(() => {
    fetch("http://localhost:4002/utilisateurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((req) => req.json())
      .then((res) => setUsers(res));
  }, [token]);

  function handleDelete(email) {
    if (window.confirm("Voulez-vous supprimer cet Utilisateur?")) {
      fetch(`http://localhost:4002/deleteUser/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return (
    <div className="container">
      <AdminPrincipal name={"Les"} title={"utilisateurs"}/>
      <div className="container-fluid text-center d-none d-lg-block py-2">
        <div className="row">
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Noms</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Email</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Actions</p>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center">
        {users &&
          users.map((u) => (
            <div className="row cartItem">
              <p className="col-4">{u.nom}</p>
              <p className="col-4">{u.email}</p>
              <div className="col-4 font-bold">
                <Button className="btn outline buttonCart buttonCuserUpdate">
                  <Link to={"/dashboard/userupdate/"+ u.email} className="mfy">
                    {" "}
                    <span class="fas fa-user-edit"></span>{" "}
                  </Link>
                </Button>
                  <Button
                    className="btn outline buttonCart buttonCartDelete"
                    onClick={() => handleDelete(u.email)}
                  >
                    <span className="fas fa-times m-auto"></span>
                  </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
