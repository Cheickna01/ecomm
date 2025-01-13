import React from "react";
import {
  Navbar,
  Nav,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  NavItem,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import BeforeHeader from "./BeforeHeaderComponent";
import Modal from "./Modal";
import NavSmallScreen from "./NavSmallScreen";
import PanierComponent from "./PanierComponent";
import axios from "axios";
export default function Header({
  utoken,
  setUToken,
  closeModal,
  setCloseModal,
}) {
  const panier_count = useSelector((state) => state.Cart.cart.length);
  const panier = useSelector((state) => state.Cart.cart);
  const [Datas, setDatas] = useState({
    nom: "",
    email: "",
    password: "",
    achats: "",
    panier: panier,
  });
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  async function fetching() {
    if (register) {
      fetch("http://localhost:4002/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: Datas.nom,
          email: Datas.email,
          mot_de_passe: Datas.password,
        }),
      })
        .then((req) => req.json())
        .then((res) => {
          if (res == "Inscription validée") {
            setRegister(false);
            setCloseModal(false);
          } else {
            setError(res);
          }
        });
    } else {
      try {
        const response = await axios.post("http://localhost:4002/login", {
          email: Datas.email,
          mot_de_passe: Datas.password,
        });
        if (response.data.token) {
          setUToken(response.data.token);
          setUsername(response.data.user.nom);
          setError("")
          setCloseModal(false);
        } else {
          setError(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [register, setRegister] = useState(false);
  const modal = createPortal(
    <Modal
      utoken={utoken}
      setCloseModal={setCloseModal}
      closeModal={closeModal}
      setRegister={setRegister}
      register={register}
      setUToken={setUToken}
      Datas={Datas}
      error={error}
      fetching={fetching}
      setDatas={setDatas}
      setUsername={setUsername}
    />,
    document.body
  );
  function showModal() {
    setCloseModal(!closeModal);
  }
  function ToggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  const [search, setSearch] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div id="header">
      <BeforeHeader username={username} utoken={utoken}/>
      <Navbar
        light
        expand="lg"
        id="mynavbar"
        className="align-items-center sticky-top ms-0 mb-md-0 navb"
      >
        <NavbarBrand>
          <NavLink to="/">
            <img src="\logo.png" alt="tyshop 237" height="50" width="200" />
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={ToggleNav} />
        <Collapse navbar isOpen={isNavOpen} className="">
          <Nav navbar className="mynavbar1 me-lg-3 ">
            <NavItem className="me-2">
              <NavLink to="/">Products</NavLink>
            </NavItem>
            <NavItem className="me-2 mt-2 mt-lg-0">
              <NavLink to="/contact">Contact Us</NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="mynavbar3 ms-auto d-none d-lg-block">
            <NavItem>
              <Form onSubmit={handleSubmit} className="">
                <FormGroup className="form-group">
                  <Input
                    type="text"
                    id="searchbox"
                    name="searchbox"
                    placeholder="search..."
                    className=""
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button className="">
                    <NavLink to={"/search/" + search}>
                      <i className="fas fa-search"></i>
                    </NavLink>
                  </Button>
                </FormGroup>
              </Form>
            </NavItem>
          </Nav>
          <Nav
            navbar
            className="mynavbar2 ms-0 ms-lg-auto align-items-center d-none d-lg-flex"
          >
            <NavItem className="me-2">
              <Button outline className="btn-perso1 relative">
                <PanierComponent panier_count={panier_count} />
                <NavLink to="/panier">
                  Mon panier<i className="fas fa-shopping-cart fa-lg"></i>
                </NavLink>
              </Button>
            </NavItem>
            <NavItem className="me-2">
              <Button
                outline
                className=" ml-mr-auto btn-perso1"
                onClick={showModal}
              >
                <NavLink>
                  Login<i className="fas fa-user fa-lg"></i>
                </NavLink>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <NavSmallScreen toggleModal={showModal} panier_count={panier_count} />
      {closeModal && modal}
    </div>
  );
}
