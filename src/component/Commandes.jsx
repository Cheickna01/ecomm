import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPrincipal from "./AdminPrincipal";
import Title from "./TitleComponents";

export default function Commandes({ token }) {
  const [lescommandes, setCommandes] = useState("");
  console.log(lescommandes);
  useEffect(() => {
    fetch("http://localhost:4002/lescommandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((req) => req.json())
      .then((res) => setCommandes(res));
  }, []);
  return (
    <div className="container">
      <AdminPrincipal name={"Les"} title={"Commandes"}/>
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
                {p.produits.map(pro=>(
                    <p>{pro.count} {pro.title}</p>
                ))}
              </p>
              <p className="col-4 font-bold">{p.prix_total}$</p>
            </div>
          ))}
      </div>

    </div>
  );
}
