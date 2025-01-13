import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./HeaderComponent";
import AdminHeader from "./AdminHeader";
import ContactUs from "./ContactUs";
import Panier from "./Panier";
import Login from "./Login";
import Home from "./Home";
import ProductDetailComponent from "./ProductDetailComponent";
import CategoryComponent from "./CategoryComponent";
import SearchComponent from "./SearchComponent";
import Dashboard from "./Dashboard";
import { a } from "../redux/Cart";
import { useDispatch } from "react-redux";
import Commandes from "./Commandes";
import Utilisateurs from "./Utilisateurs";
import UpdateProduct from "./UpdateProduct";
import UpdateUser from "./4.Validation/UpdateUser";
import AddProduct from "./AddProducts";
import AdminSearchComponent from "./AdminSearchComponent";
import MonCompte from "./MonCompte";
import UserUpdate from "./UserUpdate";
import Footer from "./Footer";
export default function Main() {
  const [produits, setProduits] = useState();
  const [token, setToken] = useState("");
  const [utoken, setUToken] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [userProduct, setUserProduct] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      fetch("https://ecomm-backend-6vi2.onrender.com/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((req) => req.json())
        .then((res) => setProduits(res));
    }, 2000);
  });

  useEffect(() => {
    if (utoken) {
      fetch("https://ecomm-backend-6vi2.onrender.com/commandelist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${utoken}`,
        },
      })
        .then((req) => req.json())
        .then((res) => {
          setUserProduct(res);
        });
    } else {
      setUserProduct("");
    }
  }, [utoken]);

  useEffect(() => {
    if (userProduct.length > 0) {
      userProduct.map((p) => dispatch(a.RemoveAll(p)));
      userProduct.map((p) => dispatch(a.AddOne(p)));
    } else {
      dispatch(a.RemoveAll());
    }
  }, [utoken, userProduct, dispatch]);

  return (
    <>
      {!token ? (
        <Header
          utoken={utoken}
          setUToken={setUToken}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
        />
      ) : (
        <AdminHeader
          token={token}
          setToken={setToken}
          closeModal={closeModal}
          setCloseModal={setCloseModal}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={!token ?
            <Home
              produits={produits}
              utoken={utoken}
              setCloseModal={setCloseModal}
            />
          : <Dashboard token={token} produits={produits} />}
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/panier"
          element={
            <Panier
              utoken={utoken}
              userProduct={userProduct}
              setUserProduct={setUserProduct}
            />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="*" element={<Home />} />
        <Route
          path="/home/:id"
          element={<ProductDetailComponent produit={produits} />}
        />
        <Route path="/category/:id" element={<CategoryComponent produits={produits}/>} />
        <Route
          path="/search/:name"
          element={
            <SearchComponent
              produits={produits}
              utoken={utoken}
              setCloseModal={setCloseModal}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard token={token} produits={produits} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/dashboard/ajoutProduit"
          element={
            token ? <AddProduct token={token} /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/dashboard/lescommandes"
          element={
            token ? <Commandes token={token} /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/dashboard/utilisateurs"
          element={
            token ? (
              <Utilisateurs token={token} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/dashboard/produitUpdate/:id"
          element={
            token ? (
              <UpdateProduct token={token} produits={produits} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/dashboard/userupdate/:email"
          element={
            token ? <UpdateUser token={token} /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/dashboard/search/:name"
          element={
            token ? (
              <AdminSearchComponent
                produits={produits}
                token={token}
                setCloseModal={setCloseModal}
              />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/monCompte"
          element={
            utoken ? (
              <MonCompte utoken={utoken} setUToken={setUToken} />
            ) : (
              <Home
                produits={produits}
                utoken={utoken}
                setCloseModal={setCloseModal}
              />
            )
          }
        />
        <Route
          path="/userupdate/:email"
          element={
            utoken ? (
              <UserUpdate utoken={utoken} />
            ) : (
              <Home
                produits={produits}
                utoken={utoken}
                setCloseModal={setCloseModal}
              />
            )
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}
