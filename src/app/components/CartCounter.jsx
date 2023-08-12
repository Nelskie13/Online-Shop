import React from "react";
import Plus from "../assets/plus.svg";
import Minus from "../assets/remove.svg";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Redux-store/CounterSlice";
import Image from "next/image";

function CartCounter({ product }) {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counters[product.id]) || 1;
  const incrementCounter = () => {
    dispatch(increment({ id: product.id }));
  };
  const decrementCounter = () => {
    dispatch(decrement({ id: product.id }));
  };

  return (
    <>
      <div className="Counter flex items-center gap-3">
        <button className="hover:bg-gray-200 " onClick={incrementCounter}>
          <Image src={Plus} alt="Increment" height={24} width={24} />
        </button>
        <p className="text-center text-zinc-900 text-xl font-normal leading-7">
          {counter}
        </p>
        <button className="hover:bg-gray-200" onClick={decrementCounter}>
          <Image src={Minus} alt="Decrement" height={24} width={24} />
        </button>
      </div>
    </>
  );
}

export default CartCounter;
