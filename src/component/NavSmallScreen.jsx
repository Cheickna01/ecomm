import {
  Navbar,
  Row,
  Col,
  Nav,
  Form,
  FormGroup,
  Input,
  Button,
  NavItem
} from "reactstrap";
import {NavLink } from "react-router-dom";
import PanierComponent from "./PanierComponent";
export default function NavSmallScreen({ toggleModal, panier_count }) {
  return (
    <Navbar
      light
      expand="lg"
      className="align-items-center  d-block d-lg-none navb "
      id="navBarSmallScreen"
    >
      <div className="container">
        <Row style={{ width: "100%" }}>
          <Col xs="8" sm="6">
            <Nav className="mynavbar3">
              <NavItem>
                <Form>
                  <FormGroup className="form-group">
                    <Input
                      type="text"
                      id="searchbox"
                      name="searchbox"
                      placeholder="search..."
                    />
                    <Button>
                      <i className="fas fa-search"></i>
                    </Button>
                  </FormGroup>
                </Form>
              </NavItem>
            </Nav>
          </Col>

          <Col xs={{ size: 4 }} sm="6" className="pr-0">
            <Nav
              className="myNavbar2 ml-0 ml-lg-auto flex-row align-items-center justify-content-around"
              navbar
            >
              <NavItem onClick={toggleModal}>
                <i
                  className="fas fa-user fa-lg"
                  style={{ fontSize: "25px" }}
                ></i>
              </NavItem>
              <NavItem>
                <NavLink to="/panier" className="nav-link relative">
                  <PanierComponent panier_count={panier_count} />
                  <i
                    className="fas fa-shopping-cart fa-lg"
                    style={{ fontSize: "25px" }}
                  ></i>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </div>
    </Navbar>
  );
}
