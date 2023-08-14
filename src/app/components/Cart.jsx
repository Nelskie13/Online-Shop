"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { removeFromCart } from "../Redux-store/CartSlice";
import { reset } from "../Redux-store/CounterSlice";
import Cross from "../assets/cross.svg";
import CrossBlue from "../assets/crossBlue.svg";
import CartCounter from "./CartCounter";
import Link from "next/link";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [hoverStates, setHoverStates] = useState({});
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counters);
  const totalCounter = cartItems.reduce(
    (total, item) => total + (counters[item.id] || 1),
    0
  );
  const isCartEmpty = cartItems.length === 0;

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(reset({ id: productId }));
  };
  const handleMouseEnter = (id) => {
    setHoverStates({ ...hoverStates, [id]: true });
  };

  const handleMouseLeave = (id) => {
    setHoverStates({ ...hoverStates, [id]: false });
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    cartItems.forEach((item) => {
      const counter = counters[item.id] || 1;
      totalAmount += item.price * counter;
    });

    return totalAmount;
  };

  return (
    <>
      <div className="mx-20 my-16">
        <div className="mb-10 flex justify-center">
          <div style={{ width: "1040px" }}>
            <p className="w-96 text-zinc-900 text-4xl font-bold leading-10 mb-5">
              Shopping Bag
            </p>
            <p className="text-slate-500 text-base font-normal leading-tight">
              {totalCounter} items in the shopping bag
            </p>
          </div>
        </div>
        <div className="container mx-auto grid gap-5">
          {cartItems.map((item) => (
            <div className="cart-container flex justify-center">
              <div
                key={item.id}
                className="cart-item p-5 bg-slate-50 rounded-md flex align-center"
                style={{
                  width: "1040px",
                  height: "140px",
                }}
              >
                <div className="item-container flex">
                  <div className="item-remove flex align-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
                    >
                      <Image
                        src={hoverStates[item.id] ? CrossBlue : Cross}
                        alt="Remove"
                        height={24}
                        width={24}
                      />
                    </button>
                  </div>

                  <div className="item-details flex ml-11 flex items-center">
                    {item.thumbnail && (
                      <Image
                        className="w-36 h-24 rounded-lg object-cover border border-gray-200 mr-5 flex"
                        src={item.thumbnail}
                        alt={item.title}
                        width={140}
                        height={100}
                        priority={true}
                      />
                    )}
                    <div className="item-info mr-40">
                      <div className="Title w-72 text-slate-800 text-xl font-bold leading-relaxed mb-2.5">
                        {item.title}
                      </div>
                      <div className="Brand/Category flex gap-2.5">
                        <div className="w-auto h-auto px-2.5 py-1 rounded-3xl border border-neutral-300 justify-center items-center gap-1 inline-flex">
                          <p className="text-center text-gray-400 text-xs font-normal leading-3">
                            {item.brand}
                          </p>
                        </div>
                        <div className="w-auto h-auto px-2.5 py-1 rounded-3xl border border-neutral-300 justify-center items-center gap-1 inline-flex">
                          <p className="text-center text-gray-400 text-xs font-normal leading-3">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CartCounter product={item} />
                    <div className="item-price flex w-60 justify-end">
                      <p className="text-zinc-900 text-xl font-semibold leading-7 flex items-center">
                        ${item.price * (counters[item.id] || 1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="TotalAmount flex justify-center">
            <div className="Total flex " style={{ width: "1040px" }}>
              <div className="Total container flex justify-between">
                <p className="text-zinc-900 text-xl font-semibold leading-7">
                  Total: ${calculateTotalAmount()}
                </p>
                <div className="Buttons flex gap-5">
                  <Link href="/">
                    <button className="w-auto h-12 px-5 py-4 text-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white">
                      Continue shopping
                    </button>
                  </Link>

                  <Link href={"/pages/shopping-cart/place-order"}>
                    <button
                      className={`w-auto h-12 px-5 py-4 ${
                        !isCartEmpty ? "text-blue-600" : "text-white"
                      } rounded-3xl ${
                        isCartEmpty
                          ? "bg-neutral-300"
                          : "border border-blue-600"
                      } justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white`}
                      disabled={isCartEmpty}
                    >
                      Place order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
