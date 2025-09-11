import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle" || items.length === 0) {
      dispatch(fetchCategories());
    }
  }, [status, items.length, dispatch]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Categories
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {items.map((category) => (
          <Card
            key={category.id}
            sx={{
              width: 260,
              cursor: "pointer",
              textDecoration: "none",
            }}
            component={RouterLink}
            to={`/categories/${category.id}`}
          >
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
        ))}
      </Box>
    </Container>
  );
};

export default CategoriesPage;



