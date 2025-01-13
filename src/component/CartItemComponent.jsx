import { useSelector } from "react-redux";
import { Price } from "./ProductComponent";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { a } from "../redux/Cart";
export default function CartItemComponent({produit,userProduct,utoken}) {
    const lesP = useSelector(state=>state.Cart.cart)
    const dispatch = useDispatch();
    const {id,title,img,promo,price,inCart,count,total} = produit

    function handlerem(){
      fetch(`https://ecomm-backend-6vi2.onrender.com/achats/decrementer/${produit.id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        }
      }).then(req=>req.json()).then(res=>{
        dispatch(a.RemoveQuant(produit))
      })
    }
    function handleAdd(){
      fetch(`https://ecomm-backend-6vi2.onrender.com/achats/augmenter/${produit.id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        }
      }).then(req=>req.json()).then(res=>{
        dispatch(a.AddQuant(produit))
      })
    }

    function handlesup(){
      fetch(`https://ecomm-backend-6vi2.onrender.com/achats/supprimer/${produit.id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        }
      }).then(req=>req.json()).then(res=>{
        dispatch(a.RemoveOne(produit))      
      })
    }
  return (
    <>
        <div className="container-fluid text-center" key={id}>
          <div className="row mx-1 cartItem">
            <div className="col-lg-2 mx-auto my-lg-auto">
              <img
                src={img? "/img/" + img : "/img/img/273800-P5V8J7-289.jpg"}
                alt=""
                width="100"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-lg-2 mx-auto my-lg-auto">
              <p className="text-uppercase">{title}</p>
            </div>
            <div className="col-lg-2 mx-auto my-lg-auto">
              <p className="cartPrice">
                {promo === 0
                  ? price + "$"
                  : price - (price * promo) / 100 + "$"}
              </p>
            </div>

            <div className="col-lg-2 mx-auto my-lg-auto my-3">
              <Button
                className="btn btn-primary outline buttonCart"
                onClick={handleAdd}
              >
                <span className="fas fa-plus"></span>
              </Button>
              <Button className="btn btn-primary outline buttonCart buttonCart-middle">
                <span className="">{count}</span>
              </Button>
              <Button className="btn btn-primary outline buttonCart" onClick={handlerem}>
                <span className="fas fa-minus"></span>
              </Button>
            </div>

            <div className="col-lg-2 mx-auto my-lg-auto my-3">
              <Button className="btn outline buttonCart buttonCartDelete" onClick={handlesup}>
                <span className="fas fa-times m-auto"></span>
              </Button>
            </div>
            <div className="col-lg-2 mx-auto my-lg-auto">
              <p className="cartPrice">
                {promo === 0
                  ? price * count + "$"
                  : (price - (price * promo) / 100) * count + "$"}
              </p>
            </div>
          </div>
        </div>
          </>
  );
}
