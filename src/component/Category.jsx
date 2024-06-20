import { Link } from "react-router-dom";
import {a} from "../redux/Cart"
import { useDispatch } from "react-redux";
import { Price } from "./ProductComponent";

export default function Category({ produits }) {
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
                src={"/img/" + produits.img}
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
                <Link to={"/home/"+produits.id}>
                  {" "}
                  <i className="fas fa-search"></i>
                </Link>
              </li>
              <li className="ms-4 text-center" onClick={()=>dispatch(a.AddOne({id,title, img, info, price ,promo,inCart,count}))}>
                {" "}
                <i className="fas fa-shopping-cart"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
