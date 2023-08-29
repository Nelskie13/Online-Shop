import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import PlaceOrder from "@/assets/PlaceOrder.svg";
import { resetCart } from "../Redux-store/CartSlice";
import { resetCounter } from "../Redux-store/CounterSlice";

function Success() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const counters = useSelector((state) => state.counters);
  const dispatch = useDispatch();

  function getItemText(itemCount) {
    return itemCount === 1 ? "item" : "items";
  }
  return (
    <div className="flex justify-center">
      <section className="laptop:flex tablet:w-[1040px] mobile:w-[320px] mobile:inline-block mobile:pt-14 tablet:pt-0">
        <div className="my-16 grid place-content-center laptop:pl-20">
          <div className="laptop:w-[540px] h-28 justify-start items-start inline-block mobile:w-[300px]">
            <p className=" text-zinc-900 laptop:text-4xl mb-5 mobile:text-2xl laptop:font-bold mobile:font-semibold laptop:leading-10 mobile:leading-normal">
              The order is placed
            </p>
            <p className=" text-slate-500 laptop:text-xl font-normal laptop:leading-relaxed mobile:w-[263px] laptop:w-[510px] mobile:text-sm mobile:leading-tight">
              Thank you for ordering. We will ship it in 1–2 days and send you a
              follow-up email to track the delivery.
            </p>
          </div>

          <div className="container grid gap-2 laptop:mt-12 mobile:mb-48 laptop:mb-0 mobile:mt-2">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item flex">
                <div
                  key={item.id}
                  className="cart-item laptop:w-[500px] mobile:w-[300px] flex h-20 p-2.5 bg-slate-50 rounded-md flex-col justify-center items-start gap-2.5"
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

                    <div className=" item-details laptop:w-80 mobile:w-[163px] h-12 flex items-center">
                      <div>
                        <p className=" text-slate-800 text-base font-bold leading-tight">
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

          <div className="button-container mt-5">
            <Link href="/">
              <button
                onClick={() => {
                  dispatch(resetCounter());
                  dispatch(resetCart());
                }}
                className="laptop:w-auto h-12 px-5 py-4 text-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white mobile:w-[302px] mobile:text-sm mobile:font-semibold mobile:leading-tight"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mobile:relative mobile:bottom-32 laptop:bottom-0 laptop:items-start">
          <figure className="SuccesPic laptop:mt-24 laptop:mb-14 mobile:mt-0 laptop:ml-0 mobile:my-0 mobile:ml-0 mobile:w-[176px] laptop:w-[360px] mobile:h-[176px] laptop:h-[360px] mobile:absolute laptop:relative mobile:bottom-0">
            <Image src={PlaceOrder} alt="Logo" width={360} height={360} />
          </figure>
        </div>
      </section>
    </div>
  );
}

export default Success;
