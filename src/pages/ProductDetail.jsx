import React, { useEffect } from "react";
import { Container, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetail, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader text="Loading product details..." />;
  }

  if (!productDetail) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        Product not found
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
        <CardMedia
          component="img"
          height="350"
          image={productDetail.image}
          alt={productDetail.title}
        />

        <CardContent>
          <Typography variant="h4">{productDetail.title}</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ₹{productDetail.price}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {productDetail.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
