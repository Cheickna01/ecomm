import { useState } from "react";
import { useParams } from "react-router-dom";
import Pseudo from "./Pseudo";
import Mdp from "./Mdp";
import AdminPrincipal from "../AdminPrincipal";

export default function UpdateUser({ token }) {
  const params = useParams();
  const uemail = params.email;
  const [submited, setSubmited] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mdp, setMdp] = useState("");
  const [cmdp, setCmdp] = useState("");
  const [res, setRes] = useState("");

  function hadndleSubmit(e) {
    e.preventDefault();
    setSubmited(true);

    if (
      pseudo.length >= 3 &&
      mdp.length >= 6 &&
      /\d/.test(mdp) &&
      cmdp === mdp
    ) {
      console.log("Formulaire envoyé!!!");
      if (window.confirm("Voulez-vous enregistrer les modifications?")) {
        fetch(`http://localhost:4002/updateUser/${uemail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nom: pseudo, mot_de_passe: mdp }),
        })
          .then((req) => req.json())
          .then((res) => setRes(res));
      }
    }
  }

  return (
    <div className="container">
      <AdminPrincipal />
      <form
        onSubmit={hadndleSubmit}
        className="border border-slate-100 max-w-xl mx-auto min-h-[400px] p-8"
      >
        <h2 className="px-8">
          Créez votre nom d'utilisateur et votre mot de passe
        </h2>

        <div className="form mt-[70px] mx-auto px-8">
          <Pseudo submited={submited} pseudo={pseudo} setPseudo={setPseudo} />

          <Mdp
            submited={submited}
            mdp={mdp}
            setMdp={setMdp}
            cmdp={cmdp}
            setCmdp={setCmdp}
          />

          <button className="mt-8 bg-slate-200 px-2 py-1 rounded" type="submit">
            Confirmer
          </button>
          {res && <p className="text-green-600">{res}</p>}
        </div>
      </form>
    </div>
  );
}
