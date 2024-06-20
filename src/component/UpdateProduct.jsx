import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import Title from "./TitleComponents";
import AdminPrincipal from "./AdminPrincipal";
export default function UpdateProduct({token}) {
    const params = useParams()
    const productID = params.id
    const [id, setId] = useState(productID);
    const [title, setNom] = useState("");
    const [info, setInfo] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategorieId] = useState("");
    const [img, setImg] = useState("");
    const [promo, setPromo] = useState("");
    const [count, setCount] = useState("");
    const [result,setResult] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        if(window.confirm("voulez-vous enregistrer les modifications?")){
            fetch(`http://localhost:4002/produits/update/${productID}`,{
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
                  })
              }).then(req=>req.json()).then(res=>setResult(res))
        }
    }
  return (
    <div className="container">
        <AdminPrincipal/>
        <Title name="modification du" title="produit"/>
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
      {result && <p className="text-green-600 ">{result}</p>}
    </div>
  )
}