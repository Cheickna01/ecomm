import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function TotalCartComponent({total,handleConfirm}) {
  return (
    <div className="row totalRow mt-lg-5">
      <div className="col-12 col-md-4">
        <p className="text-total text-center">
          total :{" "}
          <strong>
            {" "}
            {total}
          </strong>
        </p>
        <p className="text-center"><span>* </span>Les frais d'expédition sont non inclus pour le moment</p>
      </div>

      <div className="col-12 col-md-8 my-0">
        <div className="row">
            <div className="col-6 d-flex justify-content-center">
                <Link to="/home">
                    <Button className="totalButton mx-auto">Poursuivre mes achats</Button>
                </Link>
            </div>

            <div className="col-6 d-flex justify-content-center">
                <Button className="totalButton mx-auto" onClick={handleConfirm}>Valider ma commande</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
