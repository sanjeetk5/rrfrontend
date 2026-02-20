import React, { useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, toggleFavorite } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) {
    return <Loader text="Loading favorites..." />;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Favorites ❤️
      </Typography>

      {favorites.length === 0 ? (
        <Typography>No favorites added yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <ProductCard
                product={p}
                isFav={true}
                onFavToggle={(id, isFav) => dispatch(toggleFavorite(id, isFav))}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
