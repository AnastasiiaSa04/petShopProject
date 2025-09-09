import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { Box, Typography, Button, Container, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImg from "../../assets/images/mainBanner.svg";
import formBanner from "../../assets/images/formBanner.svg";
import styles from "../main/styles.module.css";
import DiscountForm from "./discountForm";

export default function Main() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box>
      <Box
        className={styles.bannerContainer}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <Container >
          <Typography variant="h2" textTransform="none" sx={{ fontWeight: 700, fontSize: "64px", mb: 3 }}>
            Amazing Discounts on Pets Products!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/products"
            className={styles.bannerButton}
          >
            Check out
          </Button>
        </Container>
      </Box>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="700" fontSize="64px" sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Button variant="outlined" component={Link} to="/categories">
          All categories
        </Button>
        <Box className={styles.lineToButton}>
          {categories.slice(0, 4).map((category) => (
            <Card key={category.id} sx={{ width: 260 }}>
              <CardMedia
                component="img"
                image={`http://localhost:3333${category.image}`}
                alt={category.title}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "linear-gradient(90deg, #0D50FF 0%, #2451C6 100%)",
          py: 8,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Box
            component="img"
            src={formBanner}
            alt="Pets"
            sx={{
              width: "50%",
              maxWidth: "600px",
              display: { xs: "none", md: "block" },
              alignSelf: "flex-end",
            }}
          />
          <Box sx={{ flex: 1, color: "#fff", maxWidth: 600 }}>
            <Typography
              variant="h1"
              flexWrap="no-wrap"
              sx={{ fontWeight: 700, textAlign: { xs: "center", md: "center"  } }}
            >
              5% off on the first order
            </Typography>
            <DiscountForm submitted={submitted} onSubmit={() => setSubmitted(true)} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}



  

 