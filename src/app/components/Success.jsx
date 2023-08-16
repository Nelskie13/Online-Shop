"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import PlaceOrder from "../assets/PlaceOrder.svg";

function Success() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const counters = useSelector((state) => state.counters);

  function getItemText(itemCount) {
    return itemCount === 1 ? "item" : "items";
  }
  return (
    <div className="Succes-container flex justify-center">
      <div className="success mx-20 my-16">
        <div
          className="w-96 h-28 flex-col justify-start items-start gap-5 inline-flex"
          style={{ width: "590px" }}
        >
          <p
            className="text-zinc-900 text-4xl font-bold leading-10"
            style={{ width: "590px" }}
          >
            The order is placed
          </p>
          <p
            className="text-slate-500 text-xl font-normal leading-relaxed"
            style={{ width: "510px" }}
          >
            Thank you for ordering. We will ship it in 1–2 days and send you a
            follow-up email to track the delivery.
          </p>
        </div>
        <div className="container grid gap-2 mt-12">
          {cartItems.map((item) => (
            <div className="cart-item flex">
              <div
                key={item.id}
                className="cart-item flex h-20 p-2.5 bg-slate-50 rounded-md flex-col justify-center items-start gap-2.5 inline-flex"
                style={{ width: "500px" }}
              >
                <div className="item-container flex gap-5">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={84}
                    height={60}
                    className="w-20 h-14 rounded-lg border border-gray-200 object-cover"
                    priority={true}
                  />

                  <div className=" item-details w-80 h-12 flex items-center">
                    <div>
                      <p className="w-80 text-slate-800 text-base font-bold leading-tight">
                        {item.title}
                      </p>
                      <p className="text-slate-500 text-xs font-normal leading-none">
                        {counters[item.id] || 1} {""}
                        {getItemText(counters[item.id] || 1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container mt-10">
          <Link href="/">
            <button className="w-auto h-12 px-5 py-4 text-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white">
              Continue shopping
            </button>
          </Link>
        </div>
      </div>
      <div className="SuccesPic m-20">
        <Image src={PlaceOrder} alt="Logo" width={360} height={360} />
      </div>
    </div>
  );
}

export default Success;