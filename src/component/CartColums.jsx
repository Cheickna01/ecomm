import CartComponent from "./CartComponent";

export default function CartColums() {
  return (
    <>
      <div className="container-fluid text-center d-none d-lg-block py-2">
        <div className="row">
          <div className="col-2 mx-auto">
            <p className="text-uppercase">produits</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">nom du produit</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">p. unitaire</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">quantité</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">supprimer</p>
          </div>
          <div className="col-2 mx-auto">
            <p className="text-uppercase">p. total</p>
          </div>
        </div>
      </div>
    </>
  );
}
