import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  CardText,
  Col,
  Row,
  CardTitle,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { Price } from "./ProductComponent";
import { useDispatch } from "react-redux";
import { a } from "../redux/Cart";
export default function ProductDetailComponent({ produit }) {
  const dispatch = useDispatch()
  const params = useParams();
  console.log(produit);
  if (params != null) {
    const { id, title, img, info, price ,promo, inCart,count,total} = produit.find(
      (p) => p.id === parseInt(params.id)
    );
    console.log(inCart)
    console.log(typeof(img));
    return (
      <div className="container">
        <Row>
          <Col sm="12" md="6">
            <Card className="my-4">
              <CardImg src={"/img" + img} top width="75%" alt={title} />
              <CardBody>
                <CardTitle>Description</CardTitle>
                <CardText>{info}</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" md={{ size: 4, offset: 2 }}>
            <Card className="my-4">
              <CardHeader>
                <h2 className="text-center test-yellow">{title}</h2>
              </CardHeader>

              <CardBody>
                <CardText>
                  <h4 className="text-center text-yellow">
                    <strong>Prix: {<Price promo={promo} price={price}/>}</strong>
                  </h4>
                </CardText>
                <div className="d-flex justify-content-center">
                <Button outline className="btn-perso1" onClick={()=>dispatch(a.AddOne({id,title, img, info, price ,promo,inCart,count,total}))}>Acheter</Button>
                <Link to="/home">
                  <Button outline className=" ms-5 btn-perso1">Retourner</Button>
                </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h3>nul from details</h3>
      </div>
    )
  }
}
