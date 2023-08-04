"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../Redux-store/ProductDetailsSlice";
import Image from "next/image";

function ProductDetails({ params }) {
  const { id } = params;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    // Check if the id exists and is not undefined
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching product details</div>;
  }

  // Check if the data exists before accessing its properties
  if (!data) {
    return <div>Product not found</div>;
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = data;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Discount: {discountPercentage}%</p>
      <p>Rating: {rating}</p>
      <p>Stock: {stock}</p>
      <p>Brand: {brand}</p>
      <p>Category: {category}</p>
      <Image src={thumbnail} alt={title} width={300} height={300} />
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          width={200}
          height={200}
        />
      ))}
    </div>
  );
}

export default ProductDetails;
