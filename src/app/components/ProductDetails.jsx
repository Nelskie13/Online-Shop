import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../Redux-store/ProductDetailsSlice";
import Image from "next/image";
import RatingStar from "./RatingStar";
import { ButtonCart } from "./ProductList";

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

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    const originalPrice = Math.floor(
      (discountedPrice * 100) / (100 - discountPercentage)
    );
    return originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      className="container flex"
      style={{
        marginTop: "60px",
        marginBottom: "60px",
        marginLeft: "80px",
      }}
    >
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "500px",
          gridTemplateRows: "320px",
        }}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={320}
          className="rounded-lg object-fill h-80 border border-gray-200"
        />

        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: "repeat(auto-fill, 140px)",
            gridTemplateRows: "140px",
          }}
        >
          {images.slice(0, 3).map((image) => (
            <Image
              src={image}
              alt={title}
              width={140}
              height={140}
              className="rounded-md object-cover border border-gray-200"
              style={{
                height: "140px",
              }}
            />
          ))}
        </div>
      </div>

      <div className="ml-10">
        <div className="text-zinc-900 text-4xl font-bold leading-10 mb-2.5">
          {title}
        </div>
        <div className="w-72 text-slate-500 text-base font-normal leading-normal mb-5">
          {description}
        </div>

        <div className="flex mb-5">
          <RatingStar rating={rating} size={24} />
          <p className="text-center text-gray-400 text-base font-normal leading-normal ml-1">
            {rating}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <p className="text-zinc-900 text-4xl font-bold leading-10">
            ${price}
          </p>
          <p className="text-slate-500 text-xs font-normal line-through leading-none">
            ${calculateOriginalPrice(price, discountPercentage)}
          </p>
          <div className="w-20 h-8 px-2.5 py-1 bg-orange-400 rounded-2xl justify-start items-start gap-2.5 flex justify-center items-center">
            <p className="text-white text-base font-normal leading-normal">
              -{discountPercentage}%
            </p>
          </div>
        </div>

        <div className="w-80 h-24 flex-col gap-2.5 inline-flex text-slate-500 text-base font-normal leading-normal">
          <p>In stock: {stock}</p>
          <p>Brand: {brand}</p>
          <p>Category: {category}</p>
        </div>

        <div className="mt-10">
          <ButtonCart
            addToCartTitle={"Add to bag"}
            addToBagStatus={true}
            className="w-36 h-14"
            textHover="hover:text-blue-600"
            height="18"
            width="18"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
