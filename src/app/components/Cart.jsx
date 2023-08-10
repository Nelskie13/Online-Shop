"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { removeFromCart } from "../Redux-store/CartSlice";
import CartCounter from "./CartCounter";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart-container ">
      <div className="mt-14 ml-20">
        <p className="w-96 text-zinc-900 text-4xl font-bold leading-10">
          Shopping Bag
        </p>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="cart-item grid grid-cols-1 flex gap-10 bg-slate-50 rounded-md flex-col justify-center items-start gap-2.5 inline-flex"
          style={{
            width: "1040px",
            height: "300px",
          }}
        >
          <div className="item-details">
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={80}
                height={80}
              />
            )}
            <div className="item-info">
              <p>{item.title}</p>
              <p>Category: {item.category}</p>
              <p>Brand: {item.brand}</p>
              <p>Price: ${item.price}</p>
            </div>
            <CartCounter product={item} />
          </div>
          <div className="item-remove">
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
