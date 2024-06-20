import Title from "./TitleComponents"
import CartComponent from "./CartComponent"
export default function Panier({utoken,userProduct}) {
  return (
    <>
        <Title name={"Votre"} title={"Panier"}/>
        <CartComponent utoken={utoken} userProduct={userProduct}/>
    </>
  )
}