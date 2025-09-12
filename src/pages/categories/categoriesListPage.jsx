import { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Breadcrumbs,
    Link as MuiLink,
} from "@mui/material";
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
                    Categories
                </Typography>
            </Breadcrumbs>

            <Typography variant="h3" sx={{ mb: 4 }}>
                Categories
            </Typography>

            <Grid container spacing={4}>
                {categories.map(category => (
                    <Grid size={{ xs: 6, md: 3 }}>
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
                                sx={{ objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = placeholderImage;
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6">{category.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
