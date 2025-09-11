import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToBasket } from "../../redux/slices/basketSlice";

export default function CategoryDetailsPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({}); 

  useEffect(() => {
    const load = async () => {
      try {
        const resProducts = await fetch("http://localhost:3333/products/all");
        const productsData = await resProducts.json();
        const filteredProducts = productsData.filter(
          (p) => String(p.categoryId) === categoryId
        );
        setProducts(filteredProducts);

        const resCategories = await fetch("http://localhost:3333/categories/all");
        const categoriesData = await resCategories.json();
        const currentCategory = categoriesData.find(
          (c) => String(c.id) === categoryId
        );
        setCategoryTitle(currentCategory ? currentCategory.title : "Unknown category");

        const initialQuantities = {};
        filteredProducts.forEach(p => initialQuantities[p.id] = 1);
        setQuantities(initialQuantities);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryId]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket({ ...product, quantity: quantities[product.id] || 1 }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {categoryTitle}
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {products.map((p) => {
          const isHovered = hoveredCard === p.id;
          const quantity = quantities[p.id] || 1;

          return (
            <Card
              key={p.id}
              sx={{
                width: 250,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
              }}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  sx={{ height: 150, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography>${p.price}</Typography>
                </CardContent>
              </Link>

              {isHovered && (
                <Box sx={{ px: 1, pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <IconButton size="small" onClick={() => handleQuantityChange(p.id, -1)}>-</IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(p.id, 1)}>+</IconButton>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#0D50FF",
                      "&:hover": { bgcolor: "#282828" },
                    }}
                    onClick={() => handleAddToBasket(p)}
                  >
                    Add to basket
                  </Button>
                </Box>
              )}
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}






