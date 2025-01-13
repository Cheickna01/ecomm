import { useEffect, useState } from "react";
import AdminPrincipal from "./AdminPrincipal";
import { Button } from "reactstrap";

export default function Commandes({ token }) {
  const [lescommandes, setCommandes] = useState("");
  console.log(lescommandes);
  useEffect(() => {
    fetch("https://ecomm-backend-6vi2.onrender.com/lescommandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((req) => req.json())
      .then((res) => setCommandes(res));
  }, []);

  function handledelete(id) {
    if (window.confirm("Voulez-vous supprimer la commande?")) {
      fetch(`https://ecomm-backend-6vi2.onrender.com/deletecommande/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((req) => req.json())
        .then((res) => setCommandes(res));
    }
  }
  return (
    <div className="container">
      <AdminPrincipal name={"Les"} title={"Commandes"} />
      <div className="container-fluid text-center d-none d-lg-block py-2">
        <div className="row">
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Clients</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Produits</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">Total à payer</p>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center">
        {lescommandes &&
          lescommandes.map((p) => (
            <div className="row cartItem">
              <p className="col-4">{p.nom_utilisateur}</p>
              <p className="col-4">
                {p.produits.map((pro) => (
                  <p>
                    {pro.count} {pro.title}
                  </p>
                ))}
              </p>
              <div className="col-4">
                <p className="font-bold inline">{p.prix_total}$</p>
                <Button
                  className="btn outline buttonCart buttonCartDelete"
                  onClick={() => handledelete(p._id)}
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
