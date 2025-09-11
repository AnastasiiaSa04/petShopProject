import { useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

export default function CategoriesPage() {
  const { id } = useParams(); // id категории из URL
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL заглушки, если нет картинки
  const placeholderImage = "https://via.placeholder.com/260x200?text=No+Image";

  useEffect(() => {
    const loadCategoryAndProducts = async () => {
      try {
        // Получаем категорию
        const resCategory = await fetch(`http://localhost:3333/categories/${id}`);
        const categoryData = await resCategory.json();
        setCategory(categoryData);

        // Получаем продукты категории
        const resProducts = await fetch(`http://localhost:3333/products?categoryId=${id}`);
        const productsData = await resProducts.json();
        setProducts(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryAndProducts();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!category) return <Typography>Category not found</Typography>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {category.title}
      </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {products.length === 0 && <Typography>No products found in this category.</Typography>}

        {products.map((product) => {
          const imageUrl = product.image
            ? `http://localhost:3333${product.image}`
            : placeholderImage;

          return (
            <Card
              key={product.id}
              component={RouterLink}
              to={`/products/${product.id}`}
              sx={{ width: 260, textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                component="img"
                image={imageUrl}
                alt={product.title}
                sx={{ height: 200, objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null; // предотвращаем зацикливание
                  e.target.src = placeholderImage;
                }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body1">
                  ${product.discont_price || product.price}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}







