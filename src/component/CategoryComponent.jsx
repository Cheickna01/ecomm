import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Category from "./Category";
import Title from "./TitleComponents";

export default function CategoryComponent() {
  const params = useParams();
  const products = useSelector((state) => state.Products.storeProducts);
  const categ = useSelector((state) => state.Category.storeCategory);
  const a = products.filter((p) => p.category_id === parseInt(params.id));
  let mes_category;
  if (a.length >= 1) {
    mes_category = a.map((p) => <Category produits={p} />);
  } else {
    mes_category = (
      <h1 className="text-center">Pas d'article disponible pour le moment!</h1>
    );
  }
  const cat = categ.filter((p) => p.id === parseInt(params.id));
  console.log(cat);

  return (
    <div className="container">
      <div className="row">
        <Title name={"Nos"} title={cat[0].name + "s"} />
        {mes_category}
      </div>
    </div>
  );
}
