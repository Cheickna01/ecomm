import { useEffect, useState } from "react";
import Title from "./TitleComponents";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function MonCompte({ utoken, setUToken }) {
  const [info, setInfo] = useState("");
  const [res, setRes] = useState("");
  useEffect(() => {
    fetch("http://localhost:4002/moncompte", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${utoken}`,
      },
    })
      .then((req) => req.json())
      .then((res) => setInfo(res));
  }, []);

  function handledelete() {
    if (window.confirm("Voulez-vous vraiment supprimer le compte?")) {
      fetch(`http://localhost:4002/deleteCompte/${info.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        },
      })
        .then((req) => req.json())
        .then((res) => {
          setRes(res);
          setTimeout(() => {
            setUToken("");
          }, 3000);
        });
      console.log(res);
    }
  }
  return (
    <div className="container text-center">
      <Title name="Mon" title="Compte" />
      <table className="table">
        <tr>
          <td>Nom </td>
          <td>E-mail </td>
          <td>Mot de passe </td>
        </tr>
        <br />
        <br />
        <br />
        <tr>
          <td>{info.nom}</td>
          <td>{info.email}</td>
          <td>...............................</td>
        </tr>
      </table>
      <div className="moncompte">
        <Button className="mr-4">
          <Link to={"/userupdate/" + info.email} className="mfy">Modifier mon compte</Link>
        </Button>
        <Button className="del" onClick={handledelete}>
          Supprimer mon compte
        </Button>
        {res && <p className="text-green-600 mt-8">{res}</p>}
      </div>
    </div>
  );
}
