import { useEffect, useState } from "react";
import { Container, Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CategoriesListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const placeholderImage = "https://via.placeholder.com/260x200?text=No+Image";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3333/categories/all");
        const data = await res.json();

        const categoriesWithImages = data.map(cat => ({
          ...cat,
          image: cat.image ? `http://localhost:3333${cat.image}` : placeholderImage,
        }));

        setCategories(categoriesWithImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (categories.length === 0) return <Typography>No categories found.</Typography>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Categories
      </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {categories.map(category => (
          <Card
            key={category.id}
            component={RouterLink}
            to={`/categories/${category.id}`}
            sx={{ width: 260, textDecoration: "none", color: "inherit" }}
          >
            <CardMedia
              component="img"
              image={category.image}
              alt={category.title}
              sx={{ height: 200, objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
            <CardContent>
              <Typography variant="h6">{category.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
