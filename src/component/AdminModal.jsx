import { Form, FormGroup, Input, Label, Button, NavLink } from "reactstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom"

export default function AdminModal({
  token,
  setCloseModal,
  closeModal,
  setRegister,
  register,
  setToken,
  Datas,setDatas,error,fetching,setUsername
}) {
  const panier = useSelector((state) => state.Cart.cart);
 
  async function handleSubmit(e) {
    setDatas({ ...Datas, panier: panier });
    e.preventDefault();
    fetching()
  }
  function handleLogout(){
    if(window.confirm("voulez-vous vous deconnecter?")){
      setToken("")
      setUsername("")
      setCloseModal(false)
    }
  }
  return (
    <div className={`modale`} onClick={(e) => e.stopPropagation()}>
      <div className="modale-content py-10 px-20 rounded relative mb-[10vh]">
      {!register ? <h1>Connectez-vous</h1> : <h1>Inscrivez-vous</h1>}
        <Form onSubmit={handleSubmit}>
          {/*on use innerRef au lieu de Ref car reacstrap utilise deja ref */}
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setDatas({ ...Datas, nom: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setDatas({ ...Datas, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setDatas({ ...Datas, password: e.target.value })}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="remember" />
              Remember me
            </Label> <br />
            <Link
              onClick={handleLogout}
              className="hover:cursor-pointer"
            >
              {token && " Logout"}
            </Link>
          </FormGroup>
          <Button outline type="submit" value="submit" className="btn-perso1">
            Submit
          </Button>
        </Form>

        <button
          className="bton-close text-slate-100 rounded w-7 h-7 absolute top-1 right-1"
          onClick={() => setCloseModal(!closeModal)}
        >
          x
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
