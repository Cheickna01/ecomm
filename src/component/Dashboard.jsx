import React, { useState } from 'react';
import AddProduct from './AddProducts';
import axios from 'axios';
import AdminProductList from './AdminProductList';
import Title from './TitleComponents';
import AdminPrincipal from './AdminPrincipal';
import { Outlet } from 'react-router-dom';
function Dashboard({ token,produits }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecomm-backend-6vi2.onrender.com/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur de récupération des produits", error);
    }
  };

  fetchProducts();
  
  const addProduct = async (product) => {
    try {
      const response = await axios.post('https://ecomm-backend-6vi2.onrender.com/produits', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Erreur d'ajout du produit", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://ecomm-backend-6vi2.onrender.com/produits/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Erreur de suppression du produit", error);
    }
  };

  return (
    <div className='container'>
      <AdminPrincipal name={"Admin"} title={"Dashboard"}/>
      <AdminProductList LesProduits={produits} token={token} setProducts={setProducts}/>
      <Outlet/>
    </div>
  );
}

export default Dashboard;
