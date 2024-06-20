import { useParams } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import ProductListComponent from "./ProductListComponent";
import Title from "./TitleComponents";
export default function SearchComponent({ produits,utoken,setCloseModal }) {
  const param = useParams();
  const produit = produits.filter((p) =>
    p.title.toUpperCase().includes(param.name.toUpperCase())
  );
  const les_produits = <ProductListComponent LesProduits={produit} utoken={utoken} setCloseModal={setCloseModal}/>

  return (
    <div className="container">
      <Title name={`search result for`} title={`"${param.name}"`}/>
      <div className="row flex justify-center">{les_produits}</div>
    </div>
  );
}
