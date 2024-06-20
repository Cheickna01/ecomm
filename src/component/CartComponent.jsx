import { useSelector } from "react-redux";
import CartItemComponent from "./CartItemComponent";
import CartColums from "./CartColums";
import TotalCartComponent from "./TotalCartComponent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { a } from "../redux/Cart";

export default function CartComponent({ utoken, userProduct }) {
  const produits = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const total =
    produits.reduce(
      (acc, item) =>
        item.promo === 0
          ? item.price * item.count + acc
          : item.price * item.count -
            (item.price * item.count * item.promo) / 100 +
            acc,
      0
    ) + "$";

  function handleConfirm() {
    if (window.confirm("Voulez-vous vraiment confirmer ce panier?")) {
      fetch("http://localhost:4002/commande/ajouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        },
      });
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
