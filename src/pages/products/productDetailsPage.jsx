import { useParams, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  CardMedia,
  Button,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToBasket } from "../../redux/slices/basketSlice";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3333/products/${productId}`);
        const data = await res.json();
        if (data.status === "ERR") {
          setProduct(null);
        } else {
          setProduct(data[0]);

          const resCategories = await fetch("http://localhost:3333/categories/all");
          const categoriesData = await resCategories.json();
          const currentCategory = categoriesData.find(
            (c) => c.id === data[0].categoryId
          );
          setCategoryTitle(currentCategory ? currentCategory.title : "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(prev + delta, 1));
  };

  const handleAddToBasket = () => {
    dispatch(addToBasket({ ...product, quantity }));
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  const hasDiscount = product.discont_price && product.discont_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0;

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

        <MuiLink
          component={RouterLink}
          to="/categories"
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
          Categories
        </MuiLink>

        {categoryTitle && (
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
            {categoryTitle}
          </Typography>
        )}

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
          {product.title}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <CardMedia
          component="img"
          image={`http://localhost:3333${product.image}`}
          alt={product.title}
          sx={{ width: "50%", objectFit: "cover" }}
        />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4">{product.title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ${hasDiscount ? product.discont_price : product.price}
            </Typography>

            {hasDiscount && (
              <Typography
                sx={{ textDecoration: "line-through", color: "gray", fontSize: "1.2rem" }}
              >
                ${product.price}
              </Typography>
            )}

            {hasDiscount && (
              <Box
                sx={{
                  ml: 1,
                  bgcolor: "#0D50FF",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  mb: 5,
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                -{discountPercent}%
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton size="small" onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{ bgcolor: "#0D50FF", color: "#fff", "&:hover": { bgcolor: "#282828" } }}
              onClick={handleAddToBasket}
            >
              Add to cart
            </Button>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}






