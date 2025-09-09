import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [status, dispatch]);

  if (status === "loading") return <p>Загрузка категорий...</p>;
  if (status === "failed") return <p>Ошибка: {error}</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {items.map((category) => (
        <Link key={category.id} to={`/categories/${category.id}`} style={{ textDecoration: "none" }}>
          <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={category.image} alt={category.title} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
            <h4>{category.title}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesPage;
