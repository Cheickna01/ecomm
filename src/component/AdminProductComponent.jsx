import { Link } from "react-router-dom";
import {a} from "../redux/Cart"
import { useDispatch } from "react-redux";

export const Price = ({ promo, price }) => {
  if (promo === 0) {
    return <span className="new-price">{price}$</span>;
  } else {
    return (
      <>
        <span className="new-price me-3">{price - (price * promo) / 100}$</span>
        <span className="old-price">{price}$</span>
      </>
    );
  }
};

export default function AdminProductComponent({ produits,deleteProduct,actions }) {
  const dispatch = useDispatch()
  const {id,title, img, info, price ,promo,inCart,count} = produits

  return (
    <>
      <div key={produits.id} className="col-md-4 col-lg-3 col-12">
        <div className="product-grid mb-4">
          <div className="product-img">
            <Link to={"/home/"+produits.id}>
              <img
                className="pic-1 img-responsive"
                src={produits.img? "/img"+produits.img : "/img/img/273800-P5V8J7-289.jpg"}
                alt="Produit"
              />

              {produits.promo > 0 ? (
                <>
                  <span className="product-new-label">Promo</span>
                  <span className="product-discount-label">
                    {" "}
                    - {produits.promo}%
                  </span>
                </>
              ) : null}
            </Link>
          </div>

          <div className="product-content">
            <h4 className="title text-center">{produits.title}</h4>
            <div className="price text-center">
              <Price promo={produits.promo} price={produits.price} />
            </div>

            <ul className="action-product list-unstyled">
              <li className="text-center">
                <Link to={"/dashboard/produitUpdate/"+produits.id}>
                  {" "}
                  <i class="fas fa-pencil-alt"></i>
                </Link>
              </li>
              <li className="ms-4 text-center" onClick={() => deleteProduct(produits.id)}><i class="fas fa-trash-alt"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
