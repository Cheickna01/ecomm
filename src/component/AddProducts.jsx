import React, { useState } from "react";
import axios from "axios"
import AdminPrincipal from "./AdminPrincipal";
function AddProduct({ addProduct,products,setProducts,token }) {
  const [id, setId] = useState("");
  const [title, setNom] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategorieId] = useState("");
  const [img, setImg] = useState("");
  const [promo, setPromo] = useState("");
  const [count, setCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const response = await axios.post('http://localhost:4002/produits', {
          id,
          category_id,
          title,
          img,
          promo,
          price,
          info,
          count,
          total: price * count,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Erreur d'ajout du produit", error);
      }
      setNom("");
      setInfo("");
      setPrice("");
      setCategorieId("");
      setImg("");
      setPromo("");
      setCount("");
    
  };

  return (
    <div className="container mb-10">
        <AdminPrincipal name={"Ajout"} title={"Produit"}/>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="ID du produit"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Nom du produit"
          value={title}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-4"
          type="text"
          placeholder="Description"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Catégorie"
          value={category_id}
          onChange={(e) => setCategorieId(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="number"
          placeholder="Promo"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
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
    </div>
  );
}

export default AddProduct;
