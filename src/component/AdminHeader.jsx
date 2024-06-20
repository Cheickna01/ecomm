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
import { useSelector } from "react-redux"
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import BeforeHeader from "./BeforeHeaderComponent";
import Modal from "./Modal";
import NavSmallScreen from "./NavSmallScreen";
import PanierComponent from "./PanierComponent";
import axios from "axios"
import AdminModal from "./AdminModal";
import AdminBeforeHeader from "./AdminBefore";
export default function AdminHeader({token,setToken,closeModal,setCloseModal}) {
  const panier_count = useSelector(state=>state.Cart.cart.length)
  const panier = useSelector((state) => state.Cart.cart);
  const [Datas, setDatas] = useState({
    nom: "",
    email: "",
    password: "",
    achats: "",
    panier: panier,
  });
  const [error,setError] = useState("")

  async function fetching(){
      try {
        const response = await axios.post("http://localhost:4002/login", {
          email: Datas.email,
          mot_de_passe: Datas.password,
        });
        if(response.data.token){
          setToken(response.data.token);
          setCloseModal(false)
        }else{
          setError(response.data)
        }
      } catch (e) {
        console.log(e)
      }
  }
  const [isNavOpen, setIsNavOpen] = useState(false);
 
  const [register, setRegister] = useState(false);
  const modal = createPortal(
    <AdminModal token={token} setCloseModal={setCloseModal} closeModal={closeModal} setRegister={setRegister} register={register} setToken={setToken} Datas={Datas} error={error} fetching={fetching} setDatas={setDatas}/>,
    document.body
  );
  function showModal() {
    setCloseModal(!closeModal);
  }
  function ToggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  const [search,setSearch] = useState("")
  function handleSubmit(e){
    e.preventDefault()
  }

  
  return (
    <div>
      <AdminBeforeHeader/>
      <Navbar
        light
        expand="lg"
        id="mynavbar"
        className="align-items-center sticky-top ms-0 mb-md-0 navb"
      >
        <NavbarBrand>
          <NavLink to="/dashboard">
            <img src="\logo.png" alt="tyshop 237" height="50" width="200" />
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={ToggleNav} />
        <Collapse navbar isOpen={isNavOpen} className="">
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
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <Button className="">
                    <NavLink to={"/dashboard/search/"+search}><i className="fas fa-search"></i></NavLink>
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
      <NavSmallScreen toggleModal={showModal} panier_count={panier_count}/>
      {closeModal && modal}
    </div>
  );
}
