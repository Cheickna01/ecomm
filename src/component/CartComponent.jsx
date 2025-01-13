import { useSelector } from "react-redux";
import CartItemComponent from "./CartItemComponent";
import CartColums from "./CartColums";
import TotalCartComponent from "./TotalCartComponent";
import { useDispatch } from "react-redux";
import { a } from "../redux/Cart";

export default function CartComponent({ utoken, userProduct, setUserProduct }) {
  const produits = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const total =
    produits.reduce(
      (acc, item) =>
        item.promo === 0
          ? (item.price * item.count) + acc
          : (item.price * item.count -
            (item.price * item.count * item.promo) / 100) +
            acc,
      0
    );

  function handleConfirm() {
    if (userProduct.length > 0 && window.confirm("Voulez-vous vraiment confirmer ce panier?")) {
      fetch("https://ecomm-backend-6vi2.onrender.com/commande/ajouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        },
      })
      dispatch(a.RemoveAll())
    }
  }

  return (
    <>
      <div className="container">
        <div className="spaceCart">
          <CartColums />
          {produits.length !== 0 ? (
            produits.map((p) => (
              <CartItemComponent
                produit={p}
                userProduct={userProduct}
                utoken={utoken}
              />
            ))
          ) : (
            <h1
              className="text-center font-capitalize"
              style={{ fontWeight: "bold" }}
            >
              VOTRE PANIER EST VIDE POUR LE MOMENT
            </h1>
          )}
        </div>
      </div>
      <TotalCartComponent total={total} handleConfirm={handleConfirm} />
    </>
  );
}
