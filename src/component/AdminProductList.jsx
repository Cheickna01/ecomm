import AdminProductComponent from "./AdminProductComponent";
import axios from "axios";

export default function AdminProductList({ LesProduits, token, setProducts }) {
  const deleteProduct = async (productId) => {
    if (window.confirm("Voulez-vous supprimer ce produit?")) {
      try {
        await axios.delete(`https://ecomm-backend-6vi2.onrender.com/produits/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(LesProduits.filter((product) => product._id !== productId));
      } catch (error) {
        console.error("Erreur de suppression du produit", error);
      }
    }
  };
  function lesProduits() {
    if (LesProduits != null) {
      const products = LesProduits.map((p) => (
        <AdminProductComponent
          produits={p}
          key={p.id}
          deleteProduct={deleteProduct}
        />
      ));

      return <div className="row">{products}</div>;
    } else {
      return <p>Chargement des produits...</p>;
    }
  }

  return <div className="container">{lesProduits()}</div>;
}
