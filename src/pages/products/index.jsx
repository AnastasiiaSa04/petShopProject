import { useEffect, useState, useMemo } from "react";
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
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [quantities, setQuantities] = useState({});

  const [discountOnly, setDiscountOnly] = useState(
    () => JSON.parse(localStorage.getItem("discountOnly")) || false
  );
  const [priceFrom, setPriceFrom] = useState(
    () => localStorage.getItem("priceFrom") || ""
  );
  const [priceTo, setPriceTo] = useState(
    () => localStorage.getItem("priceTo") || ""
  );
  const [sort, setSort] = useState(
    () => localStorage.getItem("sort") || "default"
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      const q = {};
      items.forEach((p) => (q[p.id] = 1));
      setQuantities(q);
    }
  }, [items]);

  useEffect(() => {
    localStorage.setItem("discountOnly", JSON.stringify(discountOnly));
    localStorage.setItem("priceFrom", priceFrom);
    localStorage.setItem("priceTo", priceTo);
    localStorage.setItem("sort", sort);
  }, [discountOnly, priceFrom, priceTo, sort]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToBasket = (product) => {
    dispatch(addToBasket({ ...product, quantity: quantities[product.id] || 1 }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...items];
    if (discountOnly)
      result = result.filter(
        (p) => p.discont_price && p.discont_price < p.price
      );
    if (priceFrom)
      result = result.filter(
        (p) => (p.discont_price || p.price) >= +priceFrom
      );
    if (priceTo)
      result = result.filter(
        (p) => (p.discont_price || p.price) <= +priceTo
      );

    switch (sort) {
      case "priceAsc":
        result.sort(
          (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price)
        );
        break;
      case "priceDesc":
        result.sort(
          (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price)
        );
        break;
      case "titleAsc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return result;
  }, [items, discountOnly, priceFrom, priceTo, sort]);

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
    <Container sx={{ py: 6 }} maxWidth={false}>
      <Breadcrumbs
        sx={{ mb: 3, alignItems: "center" }}
        separator={
          <Box sx={{ width: "40px", height: "1px", bgcolor: "#8B8B8B", mx: 1 }} />
        }
      >
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ ...breadcrumbStyle, color: "#8B8B8B" }}
        >
          Main
        </MuiLink>
        <Typography
          sx={{ ...breadcrumbStyle, borderColor: "#282828", color: "#282828" }}
        >
          All Products
        </Typography>
      </Breadcrumbs>

      <Typography variant="h2" sx={{ mb: 3 }}>
        All Products
      </Typography>

<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    mb: 4,
    alignItems: "center",
  }}
> 
<Typography>Price</Typography>
  <TextField
    label="From"
    size="small"
    type="number"
    value={priceFrom}
    onChange={(e) => setPriceFrom(e.target.value)}
    sx={{
      width: 100,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#8B8B8B" },
        "&:hover fieldset": { borderColor: "#2451C6" },
        "&.Mui-focused fieldset": { borderColor: "#2451C6" },
      },
    }}
  />

  <TextField
    label="To"
    size="small"
    type="number"
    value={priceTo}
    onChange={(e) => setPriceTo(e.target.value)}
    sx={{
      width: 100,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#8B8B8B" },
        "&:hover fieldset": { borderColor: "#2451C6" },
        "&.Mui-focused fieldset": { borderColor: "#2451C6" },
      },
    }}
  />

  <FormControlLabel
    control={
      <Checkbox
        checked={discountOnly}
        onChange={(e) => setDiscountOnly(e.target.checked)}
        sx={{
          color: "#8B8B8B",
          "&.Mui-checked": { color: "#4CAF50" },
        }}
      />
    }
    label="Discounted items"
  />

  <Select
    size="small"
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    sx={{
      minWidth: 180,
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#8B8B8B" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#2451C6" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2451C6" },
    }}
  >
    <MenuItem value="default">Default</MenuItem>
    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
    <MenuItem value="titleAsc">Title: A-Z</MenuItem>
    <MenuItem value="titleDesc">Title: Z-A</MenuItem>
  </Select>
</Box>




      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: 'space-between' }}>
        {filteredProducts.map((product) => {
          const isHovered = hoveredCard === product.id;
          const quantity = quantities[product.id] || 1;

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
              <CardMedia
                component="img"
                image={`http://localhost:3333${product.image}`}
                alt={product.title}
                sx={{ height: 150, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                {product.discont_price ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography fontWeight="600">${product.discont_price}</Typography>
                    <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                      ${product.price}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>${product.price}</Typography>
                )}
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
                    sx={{ bgcolor: "#0D50FF", color: "#fff", "&:hover": { bgcolor: "#282828" } }}
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





