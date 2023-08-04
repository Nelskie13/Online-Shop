"use client";
import React from "react";
import ProductDetails from "../../../components/ProductDetails";

function page({ params }) {
  return <ProductDetails params={params} />;
}

export default page;
