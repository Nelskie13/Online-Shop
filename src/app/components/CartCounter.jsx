import React from "react";
import Plus from "../assets/plus.svg";
import Minus from "../assets/remove.svg";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Redux-store/CounterSlice";
import Image from "next/image";

function CartCounter({ product }) {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counters[product.id]) || 0;
  const incrementCounter = () => {
    dispatch(increment({ id: product.id }));
  };
  const decrementCounter = () => {
    dispatch(decrement({ id: product.id }));
  };

  return (
    <>
      <div className={`Counter flex items-center gap-1 `}>
        <button className="hover:bg-gray-200 " onClick={incrementCounter}>
          <Image src={Plus} alt="Increment" height={18} width={18} />
        </button>
        <p className="text-center text-blue-600 text-xs font-normal leading-none w-3">
          {counter}
        </p>
        <button className="hover:bg-gray-200" onClick={decrementCounter}>
          <Image src={Minus} alt="Decrement" height={18} width={18} />
        </button>
      </div>
    </>
  );
}

export default CartCounter;
