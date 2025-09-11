import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleItems } from "../../redux/slices/salesSlice";
import { addToBasket } from "../../redux/slices/basketSlice";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

function SalesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.sale);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSaleItems());
    }
  }, [status, dispatch]);

  useEffect(() => {

    const initialQuantities = {};
    items.forEach((item) => (initialQuantities[item.id] = 1));
    setQuantities(initialQuantities);
  }, [items]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket({ ...product, quantity: quantities[product.id] }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Sale Items
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {items.length === 0 && <Typography>No sale items found.</Typography>}

        {items.map((product) => {
          const isHovered = hoveredCard === product.id;
          const discountPercent =
            product.price && product.discont_price
              ? Math.round(((product.price - product.discont_price) / product.price) * 100)
              : 0;

          return (
            <Card
              key={product.id}
              sx={{
                width: 260,
                position: "relative",
                transition: "transform 0.3s",
                transform: isHovered ? "scale(1.03)" : "scale(1)",
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {discountPercent > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "#0D50FF",
                    color: "#fff",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: "bold",
                    zIndex: 10,
                  }}
                >
                  -{discountPercent}%
                </Box>
              )}

              <RouterLink to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:3333${product.image}`}
                  alt={product.title}
                  sx={{ height: 150, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  {product.discont_price && product.price && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography fontWeight="600" color="black">
                        ${product.discont_price}
                      </Typography>
                      <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                        ${product.price}
                      </Typography>
                    </Box>
                  )}
                  {!product.discont_price && <Typography>${product.price}</Typography>}
                </CardContent>
              </RouterLink>

              {isHovered && (
                <Box sx={{ px: 1, pb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{quantities[product.id]}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: "#0D50FF", color:"#FFF", "&:hover": { bgcolor: "#282828", color: "#FFF" } }}
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

export default SalesPage;

