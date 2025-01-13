import Title from "./TitleComponents"
import CartComponent from "./CartComponent"
export default function Panier({utoken,userProduct,setUserProduct}) {
  return (
    <>
        <Title name={"Votre"} title={"Panier"}/>
        <CartComponent utoken={utoken} userProduct={userProduct} setUserProduct={setUserProduct}/>
    </>
  )
}