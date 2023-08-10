import React, { useState } from "react";
import ButtonCartWhite from "../assets/emptyCartWhite.svg";
import ButtonCartBlue from "../assets/emptyCartBlue.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/remove.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux-store/CartSlice";
import { increment, decrement, reset } from "../Redux-store/CounterSlice";

function ButtonCart({
  addToCartTitle,
  addToBagStatus,
  className,
  textHover,
  height,
  width,
  product,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const addToBag = addToBagStatus;
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counters[product.id]) || 0;

  const incrementCounter = () => {
    dispatch(increment({ id: product.id }));
  };
  const decrementCounter = () => {
    dispatch(decrement({ id: product.id }));
  };

  const handleHover = () => setIsHovered(true);
  const handleHoverOut = () => !isActive && setIsHovered(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!showCounter) {
      // Add to cart and show counter
      dispatch(addToCart({ ...product, quantity: counter }));
      setShowCounter(true);
      setIsActive(true);
    } else if (e.target.closest(".Counter")) {
      // Counter is clicked, do nothing
      return;
    } else {
      // Reset counter and remove from cart
      dispatch(removeFromCart(product));
      dispatch(reset({ id: product.id }));
      setShowCounter(false);
      setIsActive(false);
    }
  };

  const buttonWidth = showCounter ? "28" : "16";
  const bgColor = isHovered || isActive ? "white" : "blue-600";
  const borderColor = isHovered || isActive ? "blue" : "transparent";
  const counterDisplayStyle = showCounter ? "block" : "none";
  const addToCartTitleDisplayStyle = showCounter ? "none" : "block";

  return (
    <>
      <div className="ButtonContainer">
        <button
          className={`CartButton w-${buttonWidth} bg-${bgColor} ${
            isActive ? "active ButtonCartBlue" : ""
          }  px-4 py-1 rounded-lg justify-center items-center gap-1 inline-flex ${className}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          style={{ border: `1px solid ${borderColor}` }}
          onClick={handleClick}
        >
          {showCounter && (
            <div
              className={`Counter flex items-center gap-1 ${counterDisplayStyle}`}
            >
              <button className="hover:bg-gray-200 " onClick={incrementCounter}>
                <Image
                  src={Plus}
                  alt="Increment"
                  height={height}
                  width={width}
                />
              </button>
              <p className="text-center text-blue-600 text-xs font-normal leading-none w-3">
                {counter}
              </p>
              <button className="hover:bg-gray-200" onClick={decrementCounter}>
                <Image
                  src={Minus}
                  alt="Decrement"
                  height={height}
                  width={width}
                />
              </button>
            </div>
          )}
          {addToBag && (
            <p
              className={`text-white text-base font-normal leading-none ${textHover} `}
              style={{ display: addToCartTitleDisplayStyle }}
            >
              {addToCartTitle}
            </p>
          )}
          <Image
            src={isHovered ? ButtonCartBlue : ButtonCartWhite}
            alt="Logo"
            height={20}
            width={20}
          />
        </button>
      </div>
    </>
  );
}

export default ButtonCart;
