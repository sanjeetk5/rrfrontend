import React, { useEffect, useState } from "react";
import { Grid, TextField, Container, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchFavorites, toggleFavorite } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import PaginationComp from "../components/PaginationComp";

const Products = () => {
  const dispatch = useDispatch();
  const { products, total, limit, favorites, loading } = useSelector((state) => state);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts(page, limit, search));

    if (localStorage.getItem("token")) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, page, search, limit]);

  const totalPages = Math.ceil(total / limit);

  const favIds = favorites.map((f) => f._id);

  const handlePageChange = (value) => {
    setPage(value);
  };

  if (loading) {
    return <Loader text="Fetching products..." />;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>

      <TextField
        fullWidth
        label="Search products..."
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 3 }}
      />

      {products.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      ) : (
        <Box>
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <ProductCard
                  product={p}
                  isFav={favIds.includes(p._id)}
                  onFavToggle={(id, isFav) => dispatch(toggleFavorite(id, isFav))}
                />
              </Grid>
            ))}
          </Grid>

          <PaginationComp
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default Products;
