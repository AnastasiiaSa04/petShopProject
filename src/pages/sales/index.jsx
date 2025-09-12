import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleItems } from "../../redux/slices/salesSlice";
import { addToBasket } from "../../redux/slices/basketSlice";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  TextField,
  MenuItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

function SalesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.sale);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({});

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortBy, setSortBy] = useState("default");

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


  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const price = item.discont_price || item.price;
        return (
          (priceFrom === "" || price >= Number(priceFrom)) &&
          (priceTo === "" || price <= Number(priceTo))
        );
      })
      .sort((a, b) => {
        if (sortBy === "priceLow") {
          return (a.discont_price || a.price) - (b.discont_price || b.price);
        } else if (sortBy === "priceHigh") {
          return (b.discont_price || b.price) - (a.discont_price || a.price);
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else {
          return 0;
        }
      });
  }, [items, priceFrom, priceTo, sortBy]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Container sx={{ py: 6 }} maxWidth={false}>

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
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            color: "#8B8B8B",
            border: "1px solid #8B8B8B",
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#f0f0f0" },
            fontWeight: 600,
          }}
        >
          Main
        </MuiLink>

        <Typography
          sx={{
            border: "1px solid #282828",
            px: 1.5,
            py: 0.5,
            borderRadius: "6px",
            color: "#282828",
            fontWeight: 600,
          }}
        >
          Sales
        </Typography>
      </Breadcrumbs>

      <Typography variant="h2" sx={{ mb: 3 }}>
        Discounted items
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Typography sx={{ mt: 0.5 }}>Price</Typography>
        <TextField
          label="from"
          type="number"
          size="small"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        <TextField
          label="to"
          type="number"
          size="small"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
        />
        <Typography sx={{ mt: 0.5 }}>Sorted</Typography>
        <TextField
          select
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ width: "150px" }}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceLow">Price: Low to High</MenuItem>
          <MenuItem value="priceHigh">Price: High to Low</MenuItem>
          <MenuItem value="title">Title (A-Z)</MenuItem>
        </TextField>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {filteredItems.length === 0 && (
          <Typography>No sale items found.</Typography>
        )}

        {filteredItems.map((product) => {
          const isHovered = hoveredCard === product.id;
          const discountPercent =
            product.price && product.discont_price
              ? Math.round(
                ((product.price - product.discont_price) / product.price) *
                100
              )
              : 0;

          return (
            <Grid size={{ xs: 6, md: 3 }}>
              <Card
                key={product.id}
                sx={{
                  position: "relative",
                  height: '100%',
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

                <RouterLink
                  to={`/products/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:3333${product.image}`}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    {product.discont_price && product.price && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography fontWeight="600" color="black">
                          ${product.discont_price}
                        </Typography>
                        <Typography
                          sx={{ textDecoration: "line-through", color: "gray" }}
                        >
                          ${product.price}
                        </Typography>
                      </Box>
                    )}
                    {!product.discont_price && (
                      <Typography>${product.price}</Typography>
                    )}
                  </CardContent>
                </RouterLink>

                {isHovered && (
                  <Box sx={{ px: 1, pb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{quantities[product.id]}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "#0D50FF",
                        color: "#FFF",
                        "&:hover": { bgcolor: "#282828", color: "#FFF" },
                      }}
                      onClick={() => handleAddToBasket(product)}
                    >
                      Add to cart
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default SalesPage;
