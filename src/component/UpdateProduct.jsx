import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Title from "./TitleComponents";
import AdminPrincipal from "./AdminPrincipal";
import { useEffect } from "react";
import { storeCategory } from "../shared/data";
export default function UpdateProduct({ token, produits }) {
  const params = useParams();
  const productID = params.id;
  const prod = produits.filter((p) => p.id == productID)[0];
  const [id, setId] = useState(productID);
  const [title, setNom] = useState(prod.title);
  const [info, setInfo] = useState(prod.info);
  const [price, setPrice] = useState(prod.price);
  const [category_id, setCategorieId] = useState(
    prod.category_id
  );
  const [img, setImg] = useState(prod.img);
  const [promo, setPromo] = useState(prod.promo);
  const [count, setCount] = useState(prod.count);
  const [result, setResult] = useState("");

  const catg = storeCategory
    .filter((e) => e.id == category_id)
  function handleSubmit(e) {
    e.preventDefault();
    if (window.confirm("voulez-vous enregistrer les modifications?")) {
      fetch(`https://ecomm-backend-6vi2.onrender.com/produits/update/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          category_id,
          title,
          img,
          promo,
          price,
          info,
          count,
          total: price * count,
        }),
      })
        .then((req) => req.json())
        .then((res) => setResult(res));
    }
  }
  return (
    <div className="container">
      <AdminPrincipal />
      <Title name="modification du" title="produit" />
      <form onSubmit={handleSubmit} className="text-center">
        Num:{" "}
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Numéro du produit"
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
        />
        NOM DU PRODUIT:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Nom du produit"
          value={title}
          onChange={(e) => setNom(e.target.value)}
        />
        DESCRIPTION:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-4"
          type="text"
          placeholder="Description"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        PRIX:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        CATEGORIE:
        <select
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          onChange={(e) => setCategorieId(parseInt(e.target.value))}
        >
          <option value={catg.map(e=>e.id)}>{catg.map(e=>e.name)}</option>
          <option value="0">chaussure</option>
          <option value="1">chemise</option>
          <option value="2">montre</option>
          <option value="3">telephone</option>
          <option value="4">ordinateur</option>
          <option value="5">electronique</option>
          <option value="6">electromenager</option>
        </select>
        IMAGE:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        PROMO:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="number"
          placeholder="Promo"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        QUANTITE:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="number"
          placeholder="Quantité"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button
          type="submit"
          className="ms-2 border bg-black text-slate-50 rounded p-[5px]"
        >
          <i class="fas fa-plus"></i>
        </button>
      </form>
      {result && <p className="text-green-600 ">{result}</p>}
    </div>
  );
}
