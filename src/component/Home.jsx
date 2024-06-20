import Title from "./TitleComponents"
import ProductListComponent from "./ProductListComponent"
import Principal from "./PrincipalHomeComponent";


export default function Home({produits,utoken, setCloseModal}) {

  return (
    <div className="container">
        <Principal/>
        <Title name={"Our"} title={"Products"}/>
        <ProductListComponent LesProduits={produits} utoken={utoken} setCloseModal={setCloseModal}/>
    </div>
  )
}