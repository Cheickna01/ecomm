import { useParams } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import ProductListComponent from "./ProductListComponent";
import Title from "./TitleComponents";
import AdminProductList from "./AdminProductList";
import AdminPrincipal from "./AdminPrincipal";
export default function AdminSearchComponent({ produits,token,setCloseModal }) {
  const param = useParams();
  const produit = produits.filter((p) =>
    p.title.toUpperCase().includes(param.name.toUpperCase())
  );
  const les_produits = <AdminProductList LesProduits={produit} token={token} setCloseModal={setCloseModal}/>

  return (
    <div className="container">
        <AdminPrincipal name="search result for"  title={`"${param.name}"`}/>
      <div className="row flex justify-center">{les_produits}</div>
    </div>
  );
}
