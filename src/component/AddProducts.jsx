import React, { useState } from "react";
import axios from "axios";
import AdminPrincipal from "./AdminPrincipal";
function AddProduct({ addProduct, products, setProducts, token }) {
  const [id, setId] = useState("");
  const [title, setNom] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategorieId] = useState(0);
  const [img, setImg] = useState("");
  const [promo, setPromo] = useState("");
  const [count, setCount] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  console.log(selectedFile);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Veuillez sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response1 = await axios.post(
        "https://ecomm-backend-6vi2.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Téléchargement réussi : " + response1.data);

      const response2 = await axios.post(
        "https://ecomm-backend-6vi2.onrender.com/produits",
        {
          id,
          category_id,
          title,
          img: "/img/" + response1.data,
          promo,
          price,
          info,
          count,
          total: price * count,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setUploadStatus("Erreur lors du téléchargement.");
      console.error(error);
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
      <AdminPrincipal name={"Ajout"} title={"Produit"} />
      <form
        onSubmit={handleSubmit}
        className="text-center"
        action="https://ecomm-backend-6vi2.onrender.com/upload"
        method="POST"
        encType="multipart/form-data"
      >
        NUM:
        <input
          className="block m-auto w-[400px] rounded h-[35px] mb-3"
          type="text"
          placeholder="Numéro du produit"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        NOM:
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
          value={category_id}
          onChange={(e) => setCategorieId(parseInt(e.target.value))}
        >
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
          type="file"
          name="file"
          accept="image/*"
          placeholder="Image"
          value={img}
          onChange={handleFileChange}
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
    </div>
  );
}

export default AddProduct;
