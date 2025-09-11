import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addToBasket } from "../../redux/slices/basketSlice";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Button,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      const initial = {};
      items.forEach((p) => (initial[p.id] = 1));
      setQuantities(initial);
    }
  }, [items]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket({ ...product, quantity: quantities[product.id] || 1 }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const breadcrumbStyle = {
    border: "1px solid #8B8B8B",
    px: 1.5,
    py: 0.5,
    borderRadius: "6px",
    "&:hover": { backgroundColor: "#f0f0f0" },
    fontWeight: 600,
    textDecoration: "none",
  };

  return (
    <Container sx={{ py: 6 }}>
      <Breadcrumbs
        sx={{ mb: 3, alignItems: "center" }}
        separator={
          <Box
            sx={{
              display: "inline-block",
              width: "40px",
              height: "1px",
              bgcolor: "#8B8B8B",
              mx: 1,
            }}
          />
        }
      >
        <MuiLink component={RouterLink} to="/" underline="none" sx={{ ...breadcrumbStyle, color: "#8B8B8B" }}>
          Main Page
        </MuiLink>
        <Typography sx={{ ...breadcrumbStyle, borderColor: "#282828", color: "#282828" }}>
          All Products
        </Typography>
      </Breadcrumbs>

      <Typography variant="h2" sx={{ mb: 3 }}>
        All Products
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {items.map((product) => {
          const isHovered = hoveredCard === product.id;
          const quantity = quantities[product.id] || 1;

          return (
            <Card
              key={product.id}
              sx={{
                width: 260,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardMedia
                component="img"
                image={`http://localhost:3333${product.image}`}
                alt={product.title}
                sx={{ height: 150, objectFit: "cover" }}
              />

              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">${product.price}</Typography>
              </CardContent>

              {isHovered && (
                <Box sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#0D50FF",
                      color: "#fff",
                      "&:hover": { bgcolor: "#282828" },
                    }}
                    onClick={() => handleAddToBasket(product)}
                  >
                    Add to cart
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



