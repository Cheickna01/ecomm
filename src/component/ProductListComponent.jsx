import ProductComponent from "./ProductComponent";

export default function ProductListComponent({LesProduits,utoken,setCloseModal}) {
  function lesProduits(){
    if (LesProduits != null) {
      const products = LesProduits.map(p => (
        <ProductComponent produits={p} key={p.id} utoken={utoken} setCloseModal={setCloseModal}/>
      ));
  
      return <div className="row">{products}</div>;
    }
    else{
      return <p>Chargement des produits...</p>;
    }
  }
 
  return <>{lesProduits()}</>
}
