import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, isFav, onFavToggle }) => {
  const navigate = useNavigate();

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card
        sx={{
          maxWidth: 320,
          borderRadius: 3,
          boxShadow: 4,
          cursor: "pointer",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.title}
          onClick={() => navigate(`/products/${product._id}`)}
        />

        <IconButton
          onClick={() => onFavToggle(product._id, isFav)}
          sx={{ position: "absolute", top: 8, right: 8 }}
          component={motion.button}
          whileTap={{ scale: 1.4 }}
        >
          {isFav ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <CardContent onClick={() => navigate(`/products/${product._id}`)}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
