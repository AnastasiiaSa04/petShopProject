import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, Container } from "@mui/material";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Categories</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {(items || []).map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ width: 260, cursor: "pointer" }}>
              <CardMedia
                component="img"
                image={`http://localhost:3333${category.image}`}
                alt={category.title}
                sx={{ height: 150, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" fontSize="15px" fontWeight="300">
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default CategoriesPage;


